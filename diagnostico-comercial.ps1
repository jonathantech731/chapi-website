#!/usr/bin/env powershell

# 🔧 CHAPI Ultra Comercial - Diagnóstico y Reparación
# Verifica y corrige problemas comunes del sistema

Write-Host "🔧 DIAGNÓSTICO CHAPI ULTRA COMERCIAL" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Yellow

$errores = 0
$warnings = 0

# Función para mostrar estado
function Show-Status($message, $status) {
    if ($status -eq "OK") {
        Write-Host "✅ $message" -ForegroundColor Green
    } elseif ($status -eq "WARNING") {
        Write-Host "⚠️  $message" -ForegroundColor Yellow
        $script:warnings++
    } else {
        Write-Host "❌ $message" -ForegroundColor Red
        $script:errores++
    }
}

Write-Host "`n🔍 VERIFICANDO ARCHIVOS PRINCIPALES..." -ForegroundColor Cyan

# Verificar archivos JavaScript principales
$jsFiles = @(
    "assets/js/chapi-config-ultra-comercial.js",
    "assets/js/chapi-assistant-ultra-comercial.js",
    "assets/js/chapi-assistant.js"
)

foreach ($file in $jsFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match "<<<<<<< HEAD|>>>>>>> |=======") {
            Show-Status "$file - CONFLICTOS DE MERGE DETECTADOS" "ERROR"
        } else {
            Show-Status "$file" "OK"
        }
    } else {
        Show-Status "$file - ARCHIVO FALTANTE" "ERROR"
    }
}

# Verificar archivos HTML
$htmlFiles = @(
    "test-chapi-ultra-comercial.html",
    "index.html"
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Show-Status "$file" "OK"
    } else {
        Show-Status "$file - ARCHIVO FALTANTE" "WARNING"
    }
}

# Verificar CSS
if (Test-Path "assets/css/chapi-assistant-pro.css") {
    Show-Status "assets/css/chapi-assistant-pro.css" "OK"
} else {
    Show-Status "CSS principal faltante - CREANDO..." "WARNING"

    # Crear directorio si no existe
    if (!(Test-Path "assets/css")) {
        New-Item -ItemType Directory -Path "assets/css" -Force | Out-Null
    }

    # Crear CSS básico
    $cssContent = @"
/* CHAPI Ultra Comercial CSS */
#chapiWidget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    font-family: 'Segoe UI', Arial, sans-serif;
}

.chapi-chat-button {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 15px 20px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(238, 90, 36, 0.3);
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.chapi-chat-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(238, 90, 36, 0.4);
}

.chapi-chat-window {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 400px;
    height: 600px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: none;
    flex-direction: column;
    overflow: hidden;
}

.chapi-chat-window.active {
    display: flex;
}

.chapi-header {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chapi-chat-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.chapi-message {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
}

.chapi-message.user {
    flex-direction: row-reverse;
}

.chapi-message-content {
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 18px;
    position: relative;
}

.chapi-message.bot .chapi-message-content {
    background: #f0f0f0;
    color: #333;
}

.chapi-message.user .chapi-message-content {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
}
"@

    $cssContent | Out-File -FilePath "assets/css/chapi-assistant-pro.css" -Encoding UTF8
    Show-Status "CSS creado exitosamente" "OK"
}

Write-Host "`n🔧 VERIFICANDO DEPENDENCIAS..." -ForegroundColor Cyan

# Verificar Node.js
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Show-Status "Node.js $nodeVersion" "OK"
    } else {
        Show-Status "Node.js no encontrado" "ERROR"
    }
} catch {
    Show-Status "Node.js no disponible" "ERROR"
}

# Verificar npm
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Show-Status "npm $npmVersion" "OK"
    } else {
        Show-Status "npm no encontrado" "WARNING"
    }
} catch {
    Show-Status "npm no disponible" "WARNING"
}

Write-Host "`n📊 REPARANDO PROBLEMAS AUTOMÁTICAMENTE..." -ForegroundColor Cyan

# Limpiar conflictos de merge en archivos JS
foreach ($file in $jsFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match "<<<<<<< HEAD|>>>>>>> |=======") {
            Write-Host "🔧 Limpiando conflictos en $file..." -ForegroundColor Yellow

            # Backup
            Copy-Item $file "$file.backup" -Force

            # Limpiar conflictos (mantener solo la parte HEAD)
            $cleanContent = $content -replace "<<<<<<< HEAD[\s\S]*?=======[\s\S]*?>>>>>>> [^\r\n]*", ""
            $cleanContent | Out-File -FilePath $file -Encoding UTF8

            Show-Status "Conflictos limpiados en $file" "OK"
        }
    }
}

Write-Host "`n📋 RESUMEN DEL DIAGNÓSTICO:" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Yellow

if ($errores -eq 0 -and $warnings -eq 0) {
    Write-Host "🎉 SISTEMA PERFECTO - Todo funcionando correctamente" -ForegroundColor Green
} elseif ($errores -eq 0) {
    Write-Host "✅ SISTEMA FUNCIONAL - $warnings advertencias menores" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  PROBLEMAS DETECTADOS - $errores errores, $warnings advertencias" -ForegroundColor Red
}

Write-Host "`n🚀 COMANDOS DISPONIBLES:" -ForegroundColor Cyan
Write-Host "npm run test-comercial  - Iniciar servidor de prueba" -ForegroundColor White
Write-Host "start-comercial.bat     - Inicio rápido Windows" -ForegroundColor White
Write-Host ".\test-ultra-comercial.ps1 - Script PowerShell completo" -ForegroundColor White

Write-Host "`n✅ DIAGNÓSTICO COMPLETADO" -ForegroundColor Green
