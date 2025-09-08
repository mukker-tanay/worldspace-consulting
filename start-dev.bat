
@echo off
echo Starting Worldspace Consulting Development Environment

REM Check if PHP is installed
where php >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] PHP not found. Please install PHP to test the contact form.
    echo See php-server-setup.md for instructions.
    goto start_react
)

echo [INFO] Starting PHP server on port 8000...
start "PHP Server" cmd /c "php -S localhost:8000"
echo [SUCCESS] PHP server started at http://localhost:8000

:start_react
echo [INFO] Starting React development server...
start "React App" cmd /c "npm start"
echo [SUCCESS] React development environment started

echo.
echo [IMPORTANT] Development environment is running:
echo - React app: http://localhost:3000
echo - PHP server: http://localhost:8000
echo.
echo Test your contact form with both servers running.
echo If you see a "Network error: Server responded with status: 404" message,
echo it means your PHP server is not running or not accessible.
echo.
echo Press Ctrl+C in the respective terminal windows to stop the servers.
