# BookSolo Landing Page

Next.js and Tailwind CSS landing page for BookSolo - AI chatbots for solo entrepreneurs.

## Prerequisites

- Node.js 18 or later
- npm 8 or later

## Build and Run

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Deploy to AWS S3

### Using Makefile (Recommended)

The easiest way to build and deploy is using the Makefile:

```bash
# Show all available commands
make help

# Build and deploy in one command
make deploy

# Or step by step:
make build    # Build the Next.js application
make upload   # Upload to S3 (requires build first)
```

**Other useful Makefile commands:**
- `make install` - Install npm dependencies
- `make clean` - Clean build artifacts
- `make check-aws` - Verify AWS credentials
- `make check-bucket` - Verify S3 bucket exists
- `make info` - Show build and deployment information

### Manual Deployment

Build the static site and deploy to S3 manually:

```bash
# Build the static site
npm run build

# Get the S3 bucket name (format: booksolo-landing-page-production-{account_id})
BUCKET_NAME="booksolo-landing-page-production-$(aws sts get-caller-identity --profile booksolo --query Account --output text)"

# Upload to S3 bucket using the booksolo AWS profile
# For static export (if next.config.mjs has output: 'export'):
aws s3 sync out/ s3://${BUCKET_NAME}/ --profile booksolo --delete

# For standard Next.js build (SSG/SSR):
# Note: This uploads the static assets. For full deployment, you may need to upload .next/ directory
# or configure Next.js for static export
aws s3 sync .next/static s3://${BUCKET_NAME}/_next/static --profile booksolo --delete
```

**Alternative: One-liner with explicit bucket name**

If you know your bucket name, you can use:

```bash
# For static export:
npm run build && aws s3 sync out/ s3://booksolo-landing-page-production-{YOUR_ACCOUNT_ID}/ --profile booksolo --delete

# For standard build:
npm run build && aws s3 sync .next/static s3://booksolo-landing-page-production-{YOUR_ACCOUNT_ID}/_next/static --profile booksolo --delete
```

**Get your AWS Account ID:**

```bash
aws sts get-caller-identity --profile booksolo --query Account --output text
```

**Note:** For S3 static hosting, you typically want to use Next.js static export (`output: 'export'` in `next.config.mjs`). This generates an `out/` directory that can be directly uploaded to S3.
