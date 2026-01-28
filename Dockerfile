# Multi-stage build for optimized production image
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with clean install for production
RUN npm ci --only=production && \
    npm cache clean --force

# Development dependencies stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci && \
    npm cache clean --force

# Copy application source (including .env for local builds)
COPY . .

# Build arguments - will be used in CI/CD (GitHub Actions)
# For local builds, values will be read from .env file by the build script
ARG DISABLE_REDIS
ARG STRAPI_ACCESS_TOKEN
ARG WAWCD_URL
ARG STRAPI_BE_URL_SERVER
ARG NEXT_PUBLIC_STRAPI_BE_URL_CLIENT
ARG NEXT_PUBLIC_STRAPI_POST_TOKEN
ARG NEXT_PUBLIC_DASHBOARD_URL
ARG REDIS_URL
ARG SERVER_SECURITY_KEY
ARG SERVER_REQUEST_SIGNATURE
ARG CLIENT_SECURITY_KEY
ARG CLIENT_REQUEST_SIGNATURE
ARG NEXT_PUBLIC_IPINFO_TOKEN

# Set base environment
ENV NODE_ENV=production

# Set environment variables from build args (used in CI/CD)
# These will be empty for local builds, and the build script will load from .env
ENV DISABLE_REDIS=${DISABLE_REDIS} \
    STRAPI_ACCESS_TOKEN=${STRAPI_ACCESS_TOKEN} \
    WAWCD_URL=${WAWCD_URL} \
    STRAPI_BE_URL_SERVER=${STRAPI_BE_URL_SERVER} \
    NEXT_PUBLIC_STRAPI_BE_URL_CLIENT=${NEXT_PUBLIC_STRAPI_BE_URL_CLIENT} \
    NEXT_PUBLIC_STRAPI_POST_TOKEN=${NEXT_PUBLIC_STRAPI_POST_TOKEN} \
    NEXT_PUBLIC_DASHBOARD_URL=${NEXT_PUBLIC_DASHBOARD_URL} \
    REDIS_URL=${REDIS_URL} \
    SERVER_SECURITY_KEY=${SERVER_SECURITY_KEY} \
    SERVER_REQUEST_SIGNATURE=${SERVER_REQUEST_SIGNATURE} \
    CLIENT_SECURITY_KEY=${CLIENT_SECURITY_KEY} \
    CLIENT_REQUEST_SIGNATURE=${CLIENT_REQUEST_SIGNATURE} \
    NEXT_PUBLIC_IPINFO_TOKEN=${NEXT_PUBLIC_IPINFO_TOKEN}

# Build the Next.js application
# The build script loads .env if environment variables are not set
RUN chmod +x docker-build.sh && ./docker-build.sh

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only production dependencies from deps stage
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs

# Runtime environment variables (no sensitive data in ENV, will be passed at runtime)
ENV PORT=3000 \
    HOSTNAME="0.0.0.0"

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["npm", "start"]
