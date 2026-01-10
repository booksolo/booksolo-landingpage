#!/bin/bash
# Fix Content-Type for JS files in S3
# This script fixes existing JS files that may have incorrect Content-Type

AWS_PROFILE=${AWS_PROFILE:-booksolo}
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --profile $AWS_PROFILE --query Account --output text)
BUCKET_NAME="booksolo-landing-page-production-${AWS_ACCOUNT_ID}"

echo "Fixing Content-Type for JS files in S3 bucket: ${BUCKET_NAME}"

# List all JS files and fix their Content-Type
aws s3api list-objects-v2 \
  --bucket "${BUCKET_NAME}" \
  --profile "${AWS_PROFILE}" \
  --query "Contents[?ends_with(Key, '.js')].Key" \
  --output text | \
  tr '\t' '\n' | \
  while read -r key; do
    echo "Fixing Content-Type for: ${key}"
    aws s3api copy-object \
      --bucket "${BUCKET_NAME}" \
      --copy-source "${BUCKET_NAME}/${key}" \
      --key "${key}" \
      --profile "${AWS_PROFILE}" \
      --metadata-directive REPLACE \
      --content-type "application/javascript" \
      --cache-control "public, max-age=31536000, immutable" \
      > /dev/null 2>&1
  done

echo "Done! You may need to invalidate CloudFront cache for changes to take effect."
echo "Run: aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths '/*' --profile ${AWS_PROFILE}"
