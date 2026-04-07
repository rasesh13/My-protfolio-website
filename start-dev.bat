@echo off
echo.
echo 🚀 Starting Rasesh's Portfolio Website...
echo.
echo Frontend will run on: http://localhost:3000
echo Backend will run on: http://localhost:5000
echo.
echo Make sure to set up your .env files first!
echo.
start cmd /k "cd backend && npm run dev"
timeout /t 2
start cmd /k "cd frontend && npm run dev"
echo.
echo ✅ Both servers have been started!
echo Press any key to close this window...
pause
