@echo off
powershell.exe -NoExit -NoLogo -ExecutionPolicy Bypass -Command "Set-Location '%~dp0'; pnpm exec node scripts/generate-gallery-manifest.js"
