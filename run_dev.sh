#!/bin/bash

# Function to clean up background processes on exit
cleanup() {
    echo "Stopping development servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Trap SIGINT (Ctrl+C) and SIGTERM signals
trap cleanup SIGINT SIGTERM

echo "Starting main development server..."
(cd main && npm run dev) &

echo "Starting Legal development server..."
(cd Legal && npm run dev) &

echo "Both servers are starting."
echo "Press Ctrl+C to stop both."

# Wait for all background processes to finish
wait
