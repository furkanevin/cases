#!/bin/bash

# Microfrontend E-commerce Development Startup Script

echo "🚀 Starting Microfrontend E-commerce System..."

# Check if node_modules exist, if not install dependencies
if [ ! -d "home/node_modules" ]; then
    echo "📦 Installing Home app dependencies..."
    cd home && npm install && cd ..
fi

if [ ! -d "cart/node_modules" ]; then
    echo "📦 Installing Cart app dependencies..."
    cd cart && npm install && cd ..
fi

echo "🏠 Starting Home application on port 3000..."
cd home && npm run dev &
HOME_PID=$!
cd ..

echo "🛒 Starting Cart application on port 3001..."
cd cart && npm run dev &
CART_PID=$!
cd ..

echo "✅ Both applications are starting..."
echo "🏠 Home: http://localhost:3000"
echo "🛒 Cart: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt signal
trap "echo '🛑 Stopping services...'; kill $HOME_PID $CART_PID; exit" INT

# Wait for background processes
wait

