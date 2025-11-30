# Pricing Page Error Fix

## Issue
The pricing page was throwing an error: `Cannot read properties of null (reading 'prices')`

## Root Cause
The Strapi API was returning `null` instead of pricing data, and the code was trying to access `pricing.prices` without checking if `pricing` exists first.

## What Was Fixed

### 1. Added Null Safety Checks
Changed from:
```javascript
prices: pricing.prices.filter(...)
```

To:
```javascript
prices: pricing?.prices?.filter(...) || []
```

This uses optional chaining (`?.`) and provides a fallback empty array if the data is missing.

### 2. Added Error Handling UI
Added a user-friendly error message that displays when pricing data fails to load, showing:
- Clear error message
- Checklist of things to verify
- Console logging for debugging

## Files Modified
- `/website/src/app/pricing/page.jsx`
- `/website/src/app/[lang]/pricing/page.jsx`

## Why Is Pricing Data Null?

The API is returning `null` because of one of these reasons:

### 1. Strapi Backend Not Running
**Check:** Is your Strapi CMS running?
```bash
# If running Strapi locally:
cd your-strapi-directory
npm run develop
```

### 2. Environment Variables Not Configured
**Check:** Do you have these environment variables set?

Create or update `/website/.env.local`:
```env
STRAPI_BE_URL=http://localhost:1337
STRAPI_ACCESS_TOKEN=your_strapi_access_token_here
```

Or for production:
```env
STRAPI_BE_URL=https://strapi.wawcd.com
STRAPI_ACCESS_TOKEN=your_production_strapi_token
```

**How to get Strapi Access Token:**
1. Go to Strapi Admin Panel → Settings → API Tokens
2. Create a new token with "Read" permissions
3. Copy the token and add it to your `.env.local`

### 3. Pricing Data Doesn't Exist in Strapi
**Check:** Log into your Strapi CMS admin panel and verify:
- Collection Type "Price" exists
- At least one pricing plan is published
- The API endpoint `api/price` is accessible

### 4. CORS or Network Issues
**Check:** Look at the browser console or terminal for API errors:
- CORS errors → Configure Strapi CORS settings
- Network timeout → Check Strapi server is accessible
- 401/403 errors → Check access token is valid

## Testing the Fix

### 1. With Strapi Running:
```bash
# Terminal 1 - Start Strapi
cd strapi-directory
npm run develop

# Terminal 2 - Start Website
cd website
npm run dev
```

Visit `http://localhost:3000/pricing` - You should see pricing plans.

### 2. Without Strapi (Testing Error Handling):
Stop Strapi and visit the pricing page. You should see the friendly error message instead of a crash.

## Quick Debug Steps

1. **Check Strapi Connection:**
   ```bash
   # Test if Strapi is accessible
   curl http://localhost:1337/api/price
   ```

2. **Check Environment Variables:**
   ```bash
   # In website directory
   npm run dev
   # Look for logs showing STRAPI_BE_URL value
   ```

3. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for network errors
   - Check for "Failed to load pricing data" message

4. **Check Server Logs:**
   - Look at website terminal for API errors
   - Look at Strapi terminal for request logs

## Next Steps

1. **Set up environment variables** (if not already done)
2. **Start Strapi backend** 
3. **Verify pricing data exists** in Strapi CMS
4. **Restart the Next.js website** after adding environment variables
5. **Test the pricing page** - it should work now!

## Additional Resources

- Strapi API Documentation: https://docs.strapi.io/dev-docs/api/rest
- Next.js Environment Variables: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

---

**Issue Fixed:** November 30, 2025
**Status:** ✅ Error handling added, null safety implemented

