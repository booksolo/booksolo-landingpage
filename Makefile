# Makefile for BookSolo Landing Page
# Build and deploy Next.js landing page to AWS S3

# Configuration
AWS_PROFILE ?= booksolo
AWS_REGION ?= eu-central-1
NODE_ENV ?= production

# Get AWS account ID and construct bucket name
AWS_ACCOUNT_ID := $(shell aws sts get-caller-identity --profile $(AWS_PROFILE) --query Account --output text 2>/dev/null)
BUCKET_NAME := booksolo-landing-page-$(AWS_ACCOUNT_ID)

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

.PHONY: help install build clean deploy upload check-aws check-bucket fix-content-type invalidate-cache

help: ## Show this help message
	@echo "$(BLUE)BookSolo Landing Page - Makefile Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)Configuration:$(NC)"
	@echo "  AWS_PROFILE: $(AWS_PROFILE)"
	@echo "  AWS_REGION:  $(AWS_REGION)"
	@echo "  BUCKET_NAME: $(BUCKET_NAME)"
	@echo ""

install: ## Install npm dependencies
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install

build: ## Build the Next.js application
	@echo "$(BLUE)Building Next.js application...$(NC)"
	NODE_ENV=$(NODE_ENV) npm run build
	@echo "$(GREEN)Build completed!$(NC)"

clean: ## Clean build artifacts and node_modules
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	rm -rf .next
	rm -rf out
	rm -rf node_modules
	rm -rf .turbo
	@echo "$(GREEN)Clean completed!$(NC)"

check-aws: ## Check AWS credentials and profile
	@echo "$(BLUE)Checking AWS credentials...$(NC)"
	@if ! aws sts get-caller-identity --profile $(AWS_PROFILE) > /dev/null 2>&1; then \
		echo "$(RED)Error: AWS profile '$(AWS_PROFILE)' not configured or invalid$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)AWS profile '$(AWS_PROFILE)' is valid$(NC)"
	@echo "  Account ID: $(AWS_ACCOUNT_ID)"
	@echo "  Region: $(AWS_REGION)"

check-bucket: check-aws ## Check if S3 bucket exists
	@echo "$(BLUE)Checking S3 bucket...$(NC)"
	@if ! aws s3 ls s3://$(BUCKET_NAME) --profile $(AWS_PROFILE) > /dev/null 2>&1; then \
		echo "$(RED)Error: S3 bucket '$(BUCKET_NAME)' does not exist$(NC)"; \
		echo "$(YELLOW)Please create it first using Terraform$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)S3 bucket '$(BUCKET_NAME)' exists$(NC)"

upload: check-bucket ## Upload build artifacts to S3 (requires build first)
	@echo "$(BLUE)Uploading to S3...$(NC)"
	@if [ ! -d ".next" ] && [ ! -d "out" ]; then \
		echo "$(RED)Error: No build artifacts found. Run 'make build' first$(NC)"; \
		exit 1; \
	fi
	@if [ -d "out" ]; then \
		echo "$(BLUE)Uploading static export (out/) to S3 with cache headers...$(NC)"; \
		echo "$(BLUE)Uploading HTML files (short cache)...$(NC)"; \
		aws s3 sync out/ s3://$(BUCKET_NAME)/ --profile $(AWS_PROFILE) --delete \
			--exclude "*" \
			--include "*.html" \
			--cache-control "public, max-age=3600, must-revalidate" \
			--content-type "text/html"; \
		echo "$(BLUE)Uploading CSS files (long cache)...$(NC)"; \
		aws s3 sync out/ s3://$(BUCKET_NAME)/ --profile $(AWS_PROFILE) --delete \
			--exclude "*" \
			--include "*.css" \
			--cache-control "public, max-age=31536000, immutable" \
			--content-type "text/css"; \
		echo "$(BLUE)Uploading JS files (long cache)...$(NC)"; \
		find out -type f -name "*.js" | while read -r file; do \
			rel_path=$${file#out/}; \
			aws s3 cp "$$file" "s3://$(BUCKET_NAME)/$$rel_path" \
				--profile $(AWS_PROFILE) \
				--cache-control "public, max-age=31536000, immutable" \
				--content-type "application/javascript"; \
		done; \
		aws s3 sync out/ s3://$(BUCKET_NAME)/ --profile $(AWS_PROFILE) --delete \
			--exclude "gallery/*" \
			--exclude "*.js" \
			--exclude "_next/**/*.js"; \
		echo "$(BLUE)Uploading images (long cache)...$(NC)"; \
		aws s3 sync out/ s3://$(BUCKET_NAME)/ --profile $(AWS_PROFILE) --delete \
			--exclude "*" \
			--include "*.jpg" \
			--include "*.jpeg" \
			--include "*.png" \
			--include "*.gif" \
			--include "*.webp" \
			--include "*.svg" \
			--include "*.ico" \
			--exclude "gallery/*" \
			--cache-control "public, max-age=31536000, immutable"; \
		echo "$(BLUE)Uploading fonts (long cache)...$(NC)"; \
		aws s3 sync out/ s3://$(BUCKET_NAME)/ --profile $(AWS_PROFILE) --delete \
			--exclude "*" \
			--include "*.woff" \
			--include "*.woff2" \
			--include "*.ttf" \
			--include "*.eot" \
			--cache-control "public, max-age=31536000, immutable"; \
		echo "$(BLUE)Uploading other files...$(NC)"; \
		aws s3 sync out/ s3://$(BUCKET_NAME)/ --profile $(AWS_PROFILE) --delete \
			--exclude "gallery/*" \
			--exclude "*.html" \
			--exclude "*.css" \
			--exclude "*.js" \
			--exclude "_next/static/**/*.js" \
			--exclude "*.jpg" \
			--exclude "*.jpeg" \
			--exclude "*.png" \
			--exclude "*.gif" \
			--exclude "*.webp" \
			--exclude "*.svg" \
			--exclude "*.ico" \
			--exclude "*.woff" \
			--exclude "*.woff2" \
			--exclude "*.ttf" \
			--exclude "*.eot" \
			--exclude "*.map" \
			--cache-control "public, max-age=86400"; \
	else \
		echo "$(YELLOW)Warning: Static export not found. Using standard Next.js build.$(NC)"; \
		echo "$(YELLOW)Note: For S3 static hosting, configure 'output: export' in next.config.mjs$(NC)"; \
		echo "$(BLUE)Uploading .next/static to S3 with cache headers...$(NC)"; \
		aws s3 sync .next/static s3://$(BUCKET_NAME)/_next/static --profile $(AWS_PROFILE) --delete \
			--exclude "*.map" \
			--cache-control "public, max-age=31536000, immutable"; \
	fi
	@echo "$(GREEN)Upload completed!$(NC)"
	@echo "$(BLUE)CloudFront distribution may take a few minutes to update$(NC)"

deploy: build upload ## Build and deploy to S3 (full deployment)

dev: ## Run development server
	@echo "$(BLUE)Starting development server...$(NC)"
	npm run dev

lint: ## Run ESLint
	@echo "$(BLUE)Running ESLint...$(NC)"
	npm run lint

test: ## Run tests (if configured)
	@echo "$(YELLOW)Tests not configured$(NC)"

fix-content-type: check-bucket ## Fix Content-Type for existing JS files in S3
	@echo "$(BLUE)Fixing Content-Type for JS files in S3...$(NC)"
	@aws s3api list-objects-v2 \
		--bucket $(BUCKET_NAME) \
		--profile $(AWS_PROFILE) \
		--query "Contents[?ends_with(Key, '.js')].Key" \
		--output text | \
		tr '\t' '\n' | \
		while read -r key; do \
			echo "$(BLUE)Fixing: $$key$(NC)"; \
			aws s3api copy-object \
				--bucket $(BUCKET_NAME) \
				--copy-source "$(BUCKET_NAME)/$$key" \
				--key "$$key" \
				--profile $(AWS_PROFILE) \
				--metadata-directive REPLACE \
				--content-type "application/javascript" \
				--cache-control "public, max-age=31536000, immutable" \
				> /dev/null 2>&1; \
		done
	@echo "$(GREEN)Content-Type fixed!$(NC)"
	@echo "$(YELLOW)Run 'make invalidate-cache' to clear CloudFront cache$(NC)"

invalidate-cache: check-aws ## Invalidate CloudFront cache (requires distribution ID)
	@echo "$(BLUE)Invalidating CloudFront cache...$(NC)"
	@if [ -z "$(DIST_ID)" ]; then \
		echo "$(YELLOW)Getting CloudFront distribution ID from Terraform...$(NC)"; \
		DIST_ID=$$(cd ../booksolo-infrastructure && terraform output -raw landing_page_cloudfront_distribution_id 2>/dev/null); \
		if [ -z "$$DIST_ID" ]; then \
			echo "$(RED)Error: Could not get distribution ID. Set DIST_ID manually:$(NC)"; \
			echo "  make invalidate-cache DIST_ID=YOUR_DIST_ID"; \
			exit 1; \
		fi; \
	fi; \
	echo "$(BLUE)Invalidating cache for distribution: $$DIST_ID$(NC)"; \
	aws cloudfront create-invalidation \
		--distribution-id $$DIST_ID \
		--paths "/*" \
		--profile $(AWS_PROFILE) \
		--output json | jq -r '.Invalidation.Id' | xargs -I {} echo "$(GREEN)Invalidation created: {}$(NC)"

info: ## Show build and deployment information
	@echo "$(BLUE)Build Information:$(NC)"
	@echo "  AWS Profile:    $(AWS_PROFILE)"
	@echo "  AWS Region:     $(AWS_REGION)"
	@echo "  AWS Account ID: $(AWS_ACCOUNT_ID)"
	@echo "  S3 Bucket:      $(BUCKET_NAME)"
	@echo "  Node Env:       $(NODE_ENV)"
	@echo ""
	@if [ -d ".next" ]; then \
		echo "$(GREEN)Build artifacts found (.next/)$(NC)"; \
	else \
		echo "$(YELLOW)No build artifacts found$(NC)"; \
	fi
	@if [ -d "out" ]; then \
		echo "$(GREEN)Static export found (out/)$(NC)"; \
	fi
