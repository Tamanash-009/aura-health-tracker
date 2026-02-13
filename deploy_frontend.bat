@echo off
echo Starting Deployment to Vercel...
echo.
cd frontend
call npx vercel
echo.
echo Deployment command finished. If successful, your link is above.
pause
