#!/bin/bash

# Script to start the Task Master AI server
echo "Starting Task Master AI server..."

# Navigate to the project root
cd "$(dirname "$0")/.."

# Check if npx is installed
if ! command -v npx &> /dev/null; then
    echo "Error: npx is not installed. Please install Node.js and npm."
    exit 1
fi

# Set environment variables from .env file if it exists
if [ -f .env ]; then
    echo "Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
fi

# Start the Task Master AI server
echo "Launching Task Master AI with Claude 3.7 Sonnet model..."
npx -y --package=task-master-ai task-master-ai

echo "Task Master AI server started. You can now use it in your project."
