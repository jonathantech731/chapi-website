# CHAPI Assistant - Script de Diagnóstico y Arranque Automático
# Versión mejorada que resuelve problemas comunes

param(
    [switch]$StartServer,
    [int]$Port = 3000
)

function Write-StatusMessage {
    param([string]$Message, [string]$Status = "INFO")
    $color = switch ($Status) {
        "SUCCESS" { "Green" }
        "ERROR" { "Red" }
        "WARNING" { "Yellow" }
        "INFO" { "Cyan" }
        default { "White" }
    }
    Write-Host "[$Status] $Message" -ForegroundColor $color
}

function Test-Port {
    param([int]$Port)
    try {
        $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
        $listener.Start()
        $listener.Stop()
        return $true
    } catch {
        return $false
    }
}

Clear-Host
Write-Host "=" * 70 -ForegroundColor Green
Write-Host "        CHAPI ASSISTANT - DIAGNÓSTICO Y CONFIGURACIÓN" -ForegroundColor Green
Write-Host "=" * 70 -ForegroundColor Green
Write-Host ""

# 1. Verificar directorio
Write-StatusMessage "Verificando directorio de trabajo..." "INFO"
$currentDir = Get-Location
Write-Host "   📁 Directorio: $currentDir" -ForegroundColor White

if (!(Test-Path "package.json")) {
    Write-StatusMessage "ERROR: No estás en el directorio correcto del proyecto" "ERROR"
    Write-Host "   💡 Navega a: D:\chapi-website" -ForegroundColor Yellow
    exit 1
}

# 2. Verificar Node.js y npm
Write-StatusMessage "Verificando Node.js y npm..." "INFO"
try {
    $nodeVersion = & node --version 2>$null
    $npmVersion = & npm --version 2>$null

    if ($nodeVersion -and $npmVersion) {
        Write-Host "   ✅ Node.js: $nodeVersion" -ForegroundColor Green
        Write-Host "   ✅ npm: $npmVersion" -ForegroundColor Green
    } else {
        throw "Node.js o npm no encontrados"
    }
} catch {
    Write-StatusMessage "ERROR: Node.js no está instalado o no está en PATH" "ERROR"
    Write-Host "   💡 Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "   📌 Necesitas Node.js v14 o superior" -ForegroundColor Yellow
    exit 1
}

# 3. Verificar archivos principales
Write-StatusMessage "Verificando archivos del proyecto..." "INFO"
$requiredFiles = @("package.json", "index.html", "assets\js\chapi-assistant.js")
$allFilesExist = $true

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (!$allFilesExist) {
    Write-StatusMessage "WARNING: Algunos archivos faltan, pero continuando..." "WARNING"
}

# 4. Instalar/verificar dependencias
Write-StatusMessage "Verificando dependencias..." "INFO"
if (!(Test-Path "node_modules")) {
    Write-Host "   📦 Instalando dependencias..." -ForegroundColor Yellow
    & npm install
    if ($LASTEXITCODE -ne 0) {
        Write-StatusMessage "ERROR: No se pudieron instalar las dependencias" "ERROR"
        Write-Host "   💡 Intentando limpiar cache..." -ForegroundColor Yellow
        & npm cache clean --force
        & npm install
    }
}

# Verificar live-server específicamente
try {
    $liveServerCheck = & npm list live-server 2>$null
    if ($liveServerCheck -match "live-server") {
        Write-Host "   ✅ live-server instalado" -ForegroundColor Green
    } else {
        Write-Host "   📦 Instalando live-server..." -ForegroundColor Yellow
        & npm install live-server --save-dev
    }
} catch {
    Write-Host "   ⚠️ No se pudo verificar live-server" -ForegroundColor Yellow
}

# 5. Verificar puertos
Write-StatusMessage "Verificando puertos disponibles..." "INFO"
$testPorts = @(3000, 3001, 3002)
$availablePort = $null

foreach ($testPort in $testPorts) {
    if (Test-Port $testPort) {
        Write-Host "   ✅ Puerto $testPort disponible" -ForegroundColor Green
        if (!$availablePort) { $availablePort = $testPort }
    } else {
        Write-Host "   ⚠️ Puerto $testPort en uso" -ForegroundColor Yellow
    }
}

if (!$availablePort) {
    Write-StatusMessage "WARNING: Todos los puertos comunes están en uso" "WARNING"
    $availablePort = 3000
}

# 6. Mostrar resumen
Write-Host ""
Write-Host "=" * 70 -ForegroundColor Green
Write-Host "                           RESUMEN" -ForegroundColor Green
Write-Host "=" * 70 -ForegroundColor Green

Write-StatusMessage "✅ Diagnóstico completado exitosamente" "SUCCESS"
Write-Host "   🚀 Proyecto listo para desarrollo" -ForegroundColor Green
Write-Host "   🌐 Puerto recomendado: $availablePort" -ForegroundColor Green
Write-Host ""

# 7. Comandos disponibles
Write-Host "COMANDOS DISPONIBLES:" -ForegroundColor Cyan
Write-Host "   npm run dev          - Servidor con live-server" -ForegroundColor White
Write-Host "   npm run dev-alt      - Servidor Python alternativo" -ForegroundColor White
Write-Host "   python simple-server.py - Servidor directo" -ForegroundColor White
Write-Host ""

# 8. Iniciar servidor si se solicita
if ($StartServer) {
    Write-StatusMessage "Iniciando servidor de desarrollo..." "INFO"
    Write-Host "   🚀 URL: http://localhost:$availablePort" -ForegroundColor Green
    Write-Host "   🛑 Para detener: Ctrl+C" -ForegroundColor Yellow
    Write-Host ""

    # Abrir navegador
    Start-Sleep 2
    Start-Process "http://localhost:$availablePort"

    # Intentar live-server primero
    try {
        & npx live-server --port=$availablePort --host=localhost --open=/index.html --cors
    } catch {
        Write-StatusMessage "live-server falló, usando Python..." "WARNING"
        & python simple-server.py
    }
} else {
    Write-Host "💡 Para iniciar el servidor ejecuta:" -ForegroundColor Yellow
    Write-Host "   .\debug-environment.ps1 -StartServer" -ForegroundColor Cyan
    Write-Host "   O usa: npm run dev" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Green
