@echo off
REM 🚀 Automated Vercel Deployment Script for Windows
REM This script handles the complete deployment process

setlocal enabledelayedexpansion

echo.
echo =========================================
echo 🚀 Starting Automated Deployment
echo =========================================
echo.

REM Colors using findstr (simulated)
REM Check if backend\.env exists
if not exist "backend\.env" (
    echo Error: backend\.env not found
    echo Please create backend\.env with required variables
    exit /b 1
)

echo ✓ Environment files found
echo.

REM Step 1: Build Frontend
echo 📦 Building Frontend...
cd frontend
call npm install
if errorlevel 1 goto error_frontend_install
call npm run build
if errorlevel 1 goto error_frontend_build
cd ..
echo ✓ Frontend build successful
echo.

REM Step 2: Install Backend dependencies
echo 🔧 Installing Backend dependencies...
cd backend
call npm install
if errorlevel 1 goto error_backend_install
cd ..
echo ✓ Backend dependencies installed
echo.

REM Step 3: Check Vercel CLI
echo 🔍 Checking Vercel CLI...
where vercel >nul 2>nul
if errorlevel 1 (
    echo 📦 Installing Vercel CLI...
    call npm install -g vercel
    if errorlevel 1 goto error_vercel_install
)
echo ✓ Vercel CLI ready
echo.

REM Step 4: Deploy Frontend
echo 🚀 Deploying Frontend to Vercel...
cd frontend
call vercel --prod
if errorlevel 1 goto error_frontend_deploy
cd ..
echo ✓ Frontend deployed successfully
echo.

REM Step 5: Deploy Backend
echo 🚀 Deploying Backend to Vercel...
cd backend
call vercel --prod
if errorlevel 1 goto error_backend_deploy
cd ..
echo ✓ Backend deployed successfully
echo.

REM Success
echo.
echo =========================================
echo ✅ Deployment Complete!
echo =========================================
echo.
echo 📊 Deployment Summary:
echo   ✓ Frontend built and deployed
echo   ✓ Backend built and deployed
echo.
echo 🔗 Next Steps:
echo   1. Check https://vercel.com/dashboard
echo   2. Verify frontend loads
echo   3. Test contact form
echo   4. Monitor logs in Vercel dashboard
echo.
pause
exit /b 0

:error_frontend_install
echo ❌ Frontend install failed
exit /b 1

:error_frontend_build
echo ❌ Frontend build failed
exit /b 1

:error_backend_install
echo ❌ Backend install failed
exit /b 1

:error_vercel_install
echo ❌ Vercel CLI installation failed
exit /b 1

:error_frontend_deploy
echo ❌ Frontend deployment failed
exit /b 1

:error_backend_deploy
echo ❌ Backend deployment failed
exit /b 1
