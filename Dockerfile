FROM node:20-alpine

WORKDIR /app

# Build arguments
ARG DISABLE_REDIS=true
ARG STRAPI_ACCESS_TOKEN
ARG WAWCD_URL
ARG STRAPI_BE_URL_SERVER
ARG NEXT_PUBLIC_STRAPI_BE_URL_CLIENT
ARG REDIS_URL

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables for build process and runtime
ENV DISABLE_REDIS=${DISABLE_REDIS}
ENV STRAPI_ACCESS_TOKEN=${STRAPI_ACCESS_TOKEN}
ENV WAWCD_URL=${WAWCD_URL}
ENV STRAPI_BE_URL_SERVER=${STRAPI_BE_URL_SERVER}
ENV NEXT_PUBLIC_STRAPI_BE_URL_CLIENT=${NEXT_PUBLIC_STRAPI_BE_URL_CLIENT}
ENV REDIS_URL=${REDIS_URL}

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
