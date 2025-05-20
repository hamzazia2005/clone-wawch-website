#!/bin/bash

# Check if environment argument is provided
if [ "$1" != "dev" ] && [ "$1" != "prod" ]; then
    echo "Usage: ./deploy.sh [dev|prod]"
    exit 1
fi

# Build and start the appropriate service
if [ "$1" = "dev" ]; then
    # Stop any running containers
    docker rm -f wawcd-website 2>/dev/null && \
    docker build -t wawcd-website . --network=host && \
    docker run -d --name wawcd-website -p 3000:3000 wawcd-website
else
    echo "Starting WAWCD Website Container"
    sudo docker rm -f wawcd-website 2>/dev/null && \
    sudo docker build -t wawcd-website . --network=host && \
    sudo docker run -d --name wawcd-website -p 3000:3000 wawcd-website
fi