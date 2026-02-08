# Deployment Checklist - Bilingual Landing Page

## ✅ Pre-Deployment Verification

### Build & Code Quality
- [x] Build completes successfully (`npm run build`)
- [x] No TypeScript errors
- [x] No ESLint errors
- [x] All translations properly typed
- [x] Build output contains both `/en/` and `/pl/` directories

### Content Verification
- [x] English homepage renders correctly
- [x] Polish homepage renders correctly
- [x] All sections translated:
  - [x] Hero
  - [x] Benefits (3 sections)
  - [x] Gallery
  - [x] Pricing
  - [x] Newsletter
  - [x] Footer
  - [x] Cookie consent
- [x] Privacy policy exists in both languages
- [x] Language switcher present in header
- [x] Language switcher present in mobile menu

### Technical Checks
- [x] Static HTML generated for all routes
- [x] Proper HTML lang attribute (`lang="en"` / `lang="pl"`)
- [x] Meta titles in correct language
- [x] Meta descriptions in correct language
- [x] Date formatting uses correct locale

## 🚀 Deployment Steps

### Step 1: Final Build
```bash
cd /Users/michalsm/Projects/smola81/booksolo/booksolo-landingpage
npm run build
```

Expected output:
- ✓ Compiled successfully
- ✓ Generating static pages (11/11)
- Build folder: `out/`

### Step 2: Deploy to S3

**Option A: Using Makefile (Recommended)**
```bash
make deploy
```

**Option B: Manual AWS CLI**
```bash
# Get bucket name
BUCKET_NAME="booksolo-landing-page-$(aws sts get-caller-identity --profile booksolo --query Account --output text)"

# Sync to S3
aws s3 sync out/ s3://${BUCKET_NAME}/ --profile booksolo --delete

# Verify upload
aws s3 ls s3://${BUCKET_NAME}/ --profile booksolo --recursive | grep -E "(en|pl)/index.html"
```

### Step 3: CloudFront Cache Invalidation

```bash
# Get CloudFront distribution ID
DISTRIBUTION_ID="YOUR_CLOUDFRONT_DISTRIBUTION_ID"

# Invalidate all paths
aws cloudfront create-invalidation \
  --distribution-id ${DISTRIBUTION_ID} \
  --paths "/*" \
  --profile booksolo
```

**Alternative: Specific paths only**
```bash
aws cloudfront create-invalidation \
  --distribution-id ${DISTRIBUTION_ID} \
  --paths "/en/*" "/pl/*" "/index.html" \
  --profile booksolo
```

### Step 4: Verify Deployment

#### Test URLs
```bash
# Test English version
curl -I https://booksolo.eu/en/ | grep "HTTP"

# Test Polish version
curl -I https://booksolo.eu/pl/ | grep "HTTP"

# Test root redirect
curl -I https://booksolo.eu/ | grep -E "HTTP|Location"
```

Expected responses:
- `/en/` → HTTP 200
- `/pl/` → HTTP 200
- `/` → HTTP 307 or redirect to `/en/`

#### Browser Tests
- [ ] Visit `https://booksolo.eu/` - should redirect to `/en/`
- [ ] Visit `https://booksolo.eu/en/` - English content
- [ ] Visit `https://booksolo.eu/pl/` - Polish content
- [ ] Click language switcher - switches between languages
- [ ] Check mobile menu - language switcher visible
- [ ] Test privacy policy links in both languages
- [ ] Verify cookie banner shows in correct language

## 🧪 Post-Deployment Testing

### SEO Verification
```bash
# Check English page
curl -s https://booksolo.eu/en/ | grep -o '<html lang="en">'
curl -s https://booksolo.eu/en/ | grep -o '<title>.*</title>'

# Check Polish page
curl -s https://booksolo.eu/pl/ | grep -o '<html lang="pl">'
curl -s https://booksolo.eu/pl/ | grep -o '<title>.*</title>'
```

### Browser DevTools Checks
1. Open `https://booksolo.eu/en/` in Chrome DevTools
2. Check Elements:
   - [ ] `<html lang="en">` is set
   - [ ] Meta tags have correct language
   - [ ] Hreflang links present
3. Check Network:
   - [ ] Static files loading correctly
   - [ ] Images loading from `/images/`
4. Check Console:
   - [ ] No JavaScript errors
   - [ ] Google Analytics loading (after cookie consent)

### Mobile Testing
- [ ] Test on iPhone/Safari
- [ ] Test on Android/Chrome
- [ ] Mobile menu opens correctly
- [ ] Language switcher works on mobile
- [ ] All content readable and properly formatted

### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## 📊 Analytics Setup

### Verify Google Analytics
1. Accept cookies on the site
2. Check if GA script loads:
   ```javascript
   // In browser console
   window.dataLayer
   ```
3. Verify in Google Analytics Real-Time reports

### Track Language Usage
Set up custom dimensions in GA to track:
- Current language (en/pl)
- Language switches
- Most visited language version

## 🔧 CloudFront Configuration (if not set)

### Error Pages
Configure custom error responses:

| HTTP Code | Response Page Path | HTTP Response Code |
|-----------|-------------------|-------------------|
| 404       | /en/index.html    | 200               |
| 403       | /en/index.html    | 200               |

### Behaviors
- Path pattern: `/*`
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Allowed HTTP Methods: GET, HEAD, OPTIONS
- Cache Policy: CachingOptimized
- Compress Objects: Yes

## 🐛 Troubleshooting

### Issue: Root doesn't redirect
**Solution**: Check CloudFront behavior or update root index.html to use JavaScript redirect:
```html
<meta http-equiv="refresh" content="0; url=/en/" />
```

### Issue: Language switcher doesn't change content
**Solution**: Clear browser cache and CloudFront cache

### Issue: 404 on language routes
**Solution**: 
1. Check S3 structure: `en/index.html` and `pl/index.html` must exist
2. Invalidate CloudFront cache
3. Check CloudFront error page settings

### Issue: Wrong language in content
**Solution**: 
1. Verify build output: `cat out/en/index.html | grep "Social media"`
2. Rebuild: `npm run build`
3. Redeploy: `make deploy`

## 📝 Monitoring

### Set up CloudWatch Alarms (optional)
- 4xx error rate
- 5xx error rate
- Cache hit ratio

### Check Logs Regularly
```bash
# CloudFront logs (if enabled)
aws s3 ls s3://your-cloudfront-logs-bucket/ --profile booksolo

# S3 access logs (if enabled)
aws s3 ls s3://your-s3-logs-bucket/ --profile booksolo
```

## ✅ Sign-Off Checklist

Before marking as complete:
- [ ] English version deployed and accessible
- [ ] Polish version deployed and accessible
- [ ] Root redirects correctly
- [ ] Language switcher works
- [ ] Mobile version tested
- [ ] SEO tags verified
- [ ] Analytics working
- [ ] CloudFront cache invalidated
- [ ] Team notified
- [ ] Documentation updated

## 🎉 Deployment Complete!

- **English**: https://booksolo.eu/en/
- **Polish**: https://booksolo.eu/pl/
- **Status**: ✅ Ready for production

---

**Deployed by**: _________________  
**Date**: _________________  
**Build Version**: 0.2.0  
**Verified by**: _________________
