#!/bin/bash
# Sync existing gallery images by invoking Lambda for each image

AWS_PROFILE=booksolo
FUNCTION_NAME="booksolo-solo-social-gallery-sync"
BUCKET="booksolo-marketing-media-850317193963"

# Get last 10 images
IMAGES=$(aws s3 ls s3://${BUCKET}/gallery/ --profile ${AWS_PROFILE} --recursive | tail -10 | awk '{print $1" "$2" "$4}')

echo "Syncing gallery images..."
echo ""

while IFS= read -r line; do
    DATE=$(echo "$line" | awk '{print $1}')
    TIME=$(echo "$line" | awk '{print $2}')
    KEY=$(echo "$line" | awk '{print $3}')
    
    # Convert to ISO8601 format
    EVENT_TIME="${DATE}T${TIME}Z"
    
    echo "Syncing: $KEY (created: $EVENT_TIME)"
    
    # Create S3 event payload
    EVENT_JSON=$(cat <<EOF
{
  "Records": [
    {
      "eventName": "ObjectCreated:Put",
      "eventTime": "${EVENT_TIME}",
      "s3": {
        "bucket": {
          "name": "${BUCKET}"
        },
        "object": {
          "key": "${KEY}"
        }
      }
    }
  ]
}
EOF
)
    
    # Invoke Lambda
    aws lambda invoke \
        --function-name ${FUNCTION_NAME} \
        --profile ${AWS_PROFILE} \
        --payload "$EVENT_JSON" \
        --cli-binary-format raw-in-base64-out \
        /tmp/lambda-response.json > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "  ✓ Synced successfully"
    else
        echo "  ✗ Failed to sync"
    fi
    
done <<< "$IMAGES"

echo ""
echo "Gallery sync completed!"
echo "Invalidating CloudFront cache..."

aws cloudfront create-invalidation \
    --distribution-id EYVAR5YJ9EO8H \
    --paths "/gallery/*" \
    --profile ${AWS_PROFILE} \
    --output json > /dev/null 2>&1

echo "Done!"
