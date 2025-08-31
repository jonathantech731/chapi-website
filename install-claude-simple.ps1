#!/usr/bin/env pwsh

# Instalar Claude CLI
Write-Host "Instalando Claude CLI..." -ForegroundColor Green
Set-Location "d:\chapi-website"

# Ejecutar npm install
& npm install

# Verificar Claude CLI
Write-Host "Verificando Claude CLI..." -ForegroundColor Cyan
& npx claude --version

Write-Host "Instalación completada!" -ForegroundColor Green
