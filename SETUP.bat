@echo off
echo ================================================
echo Queue Algorithm Calculator - Setup Script
echo ================================================
echo.

echo Step 1: Checking prerequisites...
echo.

where dotnet >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] .NET SDK not found!
    echo Please download and install .NET 8.0 SDK from:
    echo https://dotnet.microsoft.com/download
    pause
    exit /b 1
)

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found!
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] .NET SDK found
echo [OK] Node.js found
echo.

echo Step 2: Setting up Backend...
cd Backend
echo Installing backend dependencies...
dotnet restore
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to restore backend packages
    pause
    exit /b 1
)
echo [OK] Backend ready
cd ..
echo.

echo Step 3: Setting up Frontend...
cd Frontend
echo Installing frontend dependencies (this may take a few minutes)...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend packages
    pause
    exit /b 1
)
echo [OK] Frontend ready
cd ..
echo.

echo ================================================
echo Setup Complete!
echo ================================================
echo.
echo Next Steps:
echo.
echo 1. Open TWO command prompts
echo.
echo 2. In the FIRST terminal, run:
echo    cd Backend
echo    dotnet run
echo.
echo 3. In the SECOND terminal, run:
echo    cd Frontend
echo    npm run dev
echo.
echo 4. Open your browser to: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul
