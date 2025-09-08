#!/bin/bash
echo "Starting Worldspace Consulting Development Environment"

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "PHP not found. Please install PHP to test the contact form."
    echo "See php-server-setup.md for instructions."
else
    echo "Starting PHP server on port 80..."
    php -S localhost:80 &
    PHP_PID=$!
    echo "PHP server started at http://localhost:80"
fi

echo "Starting React development server..."
npm start &
REACT_PID=$!

echo ""
echo "Development environment is running:"
echo "- React app: http://localhost:3000"
echo "- PHP server: http://localhost:80"
echo ""
echo "Press Ctrl+C to stop the servers."

# Trap Ctrl+C and kill both processes
trap "kill $PHP_PID $REACT_PID 2>/dev/null" INT

# Wait for Ctrl+C
wait