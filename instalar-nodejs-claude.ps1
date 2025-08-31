# Script para instalar Node.js y Claude CLI
Write-Host "=== INSTALADOR DE NODE.JS Y CLAUDE CLI ===" -ForegroundColor Green

# Verificar si ya existe Node.js
$nodeExists = Get-Command node -ErrorAction SilentlyContinue
if ($nodeExists) {
    Write-Host "Node.js ya está instalado: $(node --version)" -ForegroundColor Yellow
} else {
    Write-Host "Node.js no encontrado. Instalando..." -ForegroundColor Yellow

    # Verificar si Chocolatey está instalado
    $chocoExists = Get-Command choco -ErrorAction SilentlyContinue
    if ($chocoExists) {
        Write-Host "Instalando Node.js con Chocolatey..." -ForegroundColor Cyan
        choco install nodejs -y
    } else {
        Write-Host "Chocolatey no encontrado. Instalando Chocolatey primero..." -ForegroundColor Yellow
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

        Write-Host "Instalando Node.js con Chocolatey..." -ForegroundColor Cyan
        choco install nodejs -y
    }

    # Refrescar variables de entorno
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    refreshenv
}

# Verificar instalación de Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Cyan
node --version
npm --version

# Limpiar caché de npm
Write-Host "Limpiando caché de npm..." -ForegroundColor Cyan
npm cache clean --force

# Instalar Claude CLI
Write-Host "Instalando Claude CLI..." -ForegroundColor Cyan
npm install -g @anthropic-ai/claude-cli

# Verificar instalación
Write-Host "Verificando instalación de Claude CLI..." -ForegroundColor Cyan
claude --version

Write-Host "=== INSTALACIÓN COMPLETADA ===" -ForegroundColor Green
Write-Host "Para configurar Claude CLI, ejecuta: claude auth" -ForegroundColor Yellow
