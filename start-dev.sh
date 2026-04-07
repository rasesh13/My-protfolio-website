#!/bin/bash

echo ""
echo "🚀 Starting Rasesh's Portfolio Website..."
echo ""
echo "Frontend will run on: http://localhost:3000"
echo "Backend will run on: http://localhost:5000"
echo ""
echo "Make sure to set up your .env files first!"
echo ""

# Start backend in background
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Start frontend in background
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers have been started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both servers..."
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
