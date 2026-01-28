#!/bin/sh
set -e

echo "Preparing build environment..."

# Check if environment variables are set (from build args)
if [ -z "$STRAPI_ACCESS_TOKEN" ]; then
    # Variables not set via build args, try loading from .env file
    if [ -f .env ]; then
        echo "Loading environment variables from .env file..."
        # Read .env file and export variables
        set -a
        . ./.env
        set +a
        echo "✅ Environment variables loaded from .env file"
    else
        echo "⚠️  Warning: No .env file found and no build args provided"
    fi
else
    echo "✅ Using environment variables from build arguments"
fi

# Show some build info (without exposing sensitive data)
echo "Build configuration:"
echo "  - NODE_ENV: $NODE_ENV"
echo "  - WAWCD_URL: $WAWCD_URL"
echo "  - STRAPI_BE_URL_SERVER: $STRAPI_BE_URL_SERVER"
echo "  - STRAPI_ACCESS_TOKEN: ${STRAPI_ACCESS_TOKEN:+[SET]} ${STRAPI_ACCESS_TOKEN:-[NOT SET]}"

# Run the Next.js build
echo ""
echo "Starting Next.js build..."
npm run build
