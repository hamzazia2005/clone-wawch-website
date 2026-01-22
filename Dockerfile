FROM node:20-alpine

WORKDIR /app

# Build arguments
ARG DISABLE_REDIS=true

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variable for build process
ENV DISABLE_REDIS=${DISABLE_REDIS}

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
