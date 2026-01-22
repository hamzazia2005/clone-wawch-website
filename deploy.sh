#!/bin/bash

# Check if environment argument is provided
if [ "$1" != "dev" ] && [ "$1" != "prod" ]; then
    echo "Usage: ./deploy.sh [dev|prod] [DISABLE_REDIS=true|false]"
    echo "Example: ./deploy.sh dev DISABLE_REDIS=true"
    exit 1
fi

# Parse DISABLE_REDIS argument
DISABLE_REDIS_ARG=""
if [ "$2" = "DISABLE_REDIS=true" ]; then
    DISABLE_REDIS_ARG="--build-arg DISABLE_REDIS=true"
    echo "Building with Redis disabled"
elif [ "$2" = "DISABLE_REDIS=false" ] || [ -z "$2" ]; then
    DISABLE_REDIS_ARG="--build-arg DISABLE_REDIS=false"
    echo "Building with Redis enabled"
fi

# Build and start the appropriate service
if [ "$1" = "dev" ]; then
    # Stop any running containers
    docker rm -f wawcd-website 2>/dev/null && \
    docker build -t wawcd-website . --network=host $DISABLE_REDIS_ARG && \
    docker run -d --name wawcd-website -p 3000:3000 wawcd-website
else
    echo "Starting WAWCD Website Container"
    sudo docker rm -f wawcd-website 2>/dev/null && \
    sudo docker build -t wawcd-website . --network=host $DISABLE_REDIS_ARG && \
    sudo docker run -d --name wawcd-website -p 3000:3000 wawcd-website
fi