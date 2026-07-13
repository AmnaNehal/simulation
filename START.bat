@echo off
echo Starting Queue Algorithm Calculator...
echo.
echo Starting Backend API on http://localhost:5000
start "Backend API" cmd /k "cd Backend && dotnet run"
timeout /t 5 /nobreak >nul
echo.
echo Starting Frontend on http://localhost:5173
start "Frontend" cmd /k "cd Frontend && npm run dev"
timeout /t 5 /nobreak >nul
echo.
echo ================================================
echo Both servers are starting!
echo ================================================
echo.
echo Backend API: http://localhost:5000/swagger
echo Frontend App: http://localhost:5173
echo.
echo Press any key to stop all servers...
pause >nul
taskkill /FI "WINDOWTITLE eq Backend API*" /T /F
taskkill /FI "WINDOWTITLE eq Frontend*" /T /F
