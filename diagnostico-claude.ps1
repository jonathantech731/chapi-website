# 🔍 DIAGNÓSTICO DE CLAUDE CLI
# Script para diagnosticar problemas con Claude CLI

Write-Host "🔍 DIAGNÓSTICO DE CLAUDE CLI" -ForegroundColor Blue
Write-Host "=============================" -ForegroundColor Yellow

# Cambiar al directorio del proyecto
Set-Location "d:\chapi-website"
Write-Host "📁 Directorio actual: $(Get-Location)" -ForegroundColor Cyan

# 1. Verificar Node.js y npm
Write-Host "`n1️⃣ VERIFICANDO NODE.JS Y NPM..." -ForegroundColor Green
try {
    $nodeVersion = & node --version 2>&1
    $npmVersion = & npm --version 2>&1
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green

    # Verificar ubicación de Node.js
    $nodePath = Get-Command node -ErrorAction SilentlyContinue
    if ($nodePath) {
        Write-Host "📍 Node.js ubicado en: $($nodePath.Source)" -ForegroundColor Yellow
    }

    $npmPath = Get-Command npm -ErrorAction SilentlyContinue
    if ($npmPath) {
        Write-Host "📍 npm ubicado en: $($npmPath.Source)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error: Node.js o npm no están disponibles" -ForegroundColor Red
    Write-Host "   Instala Node.js desde: https://nodejs.org" -ForegroundColor Yellow
    Write-Host "   Error: $_" -ForegroundColor Red
}

# 2. Verificar npx
Write-Host "`n2️⃣ VERIFICANDO NPX..." -ForegroundColor Green
try {
    $npxVersion = & npx --version 2>&1
    Write-Host "✅ npx: $npxVersion" -ForegroundColor Green

    $npxPath = Get-Command npx -ErrorAction SilentlyContinue
    if ($npxPath) {
        Write-Host "📍 npx ubicado en: $($npxPath.Source)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error: npx no está disponible" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

# 3. Verificar Claude CLI global
Write-Host "`n3️⃣ VERIFICANDO CLAUDE CLI GLOBAL..." -ForegroundColor Green
try {
    $claudeGlobal = Get-Command claude -ErrorAction SilentlyContinue
    if ($claudeGlobal) {
        $claudeVersion = & claude --version 2>&1
        Write-Host "✅ Claude CLI global encontrado: $claudeVersion" -ForegroundColor Green
        Write-Host "📍 Ubicado en: $($claudeGlobal.Source)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Claude CLI no está instalado globalmente" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error al verificar Claude CLI global: $_" -ForegroundColor Red
}

# 4. Verificar Claude CLI via npx
Write-Host "`n4️⃣ VERIFICANDO CLAUDE CLI VIA NPX..." -ForegroundColor Green
try {
    $claudeNpx = & npx claude --version 2>&1
    if ($claudeNpx -and $claudeNpx -notlike "*npm ERR*" -and $claudeNpx -notlike "*error*") {
        Write-Host "✅ Claude CLI via npx: $claudeNpx" -ForegroundColor Green
    } else {
        Write-Host "❌ Claude CLI no disponible via npx" -ForegroundColor Red
        Write-Host "   Respuesta: $claudeNpx" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error al verificar Claude CLI via npx: $_" -ForegroundColor Red
}

# 5. Verificar paquetes instalados
Write-Host "`n5️⃣ VERIFICANDO PAQUETES INSTALADOS..." -ForegroundColor Green
try {
    $packages = & npm list --depth=0 2>&1
    if ($packages -like "*@anthropic-ai/claude-cli*") {
        Write-Host "✅ Claude CLI encontrado en dependencias locales" -ForegroundColor Green
        $claudeLocal = $packages | Select-String "@anthropic-ai/claude-cli"
        Write-Host "   $claudeLocal" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Claude CLI no encontrado en dependencias locales" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error al verificar paquetes: $_" -ForegroundColor Red
}

# 6. Verificar paquetes globales
Write-Host "`n6️⃣ VERIFICANDO PAQUETES GLOBALES..." -ForegroundColor Green
try {
    $globalPackages = & npm list -g --depth=0 2>&1
    if ($globalPackages -like "*@anthropic-ai/claude-cli*") {
        Write-Host "✅ Claude CLI encontrado en paquetes globales" -ForegroundColor Green
        $claudeGlobalPkg = $globalPackages | Select-String "@anthropic-ai/claude-cli"
        Write-Host "   $claudeGlobalPkg" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Claude CLI no encontrado en paquetes globales" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error al verificar paquetes globales: $_" -ForegroundColor Red
}

# 7. Verificar directorio .claude
Write-Host "`n7️⃣ VERIFICANDO CONFIGURACIÓN..." -ForegroundColor Green
if (Test-Path ".claude") {
    Write-Host "✅ Directorio .claude encontrado" -ForegroundColor Green
    $claudeFiles = Get-ChildItem ".claude" -ErrorAction SilentlyContinue
    foreach ($file in $claudeFiles) {
        Write-Host "   📄 $($file.Name)" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Directorio .claude no encontrado" -ForegroundColor Red
}

# 8. Verificar PATH
Write-Host "`n8️⃣ VERIFICANDO PATH..." -ForegroundColor Green
$pathEntries = $env:PATH -split ";"
$nodeInPath = $pathEntries | Where-Object { $_ -like "*nodejs*" -or $_ -like "*node*" }
if ($nodeInPath) {
    Write-Host "✅ Node.js encontrado en PATH:" -ForegroundColor Green
    foreach ($path in $nodeInPath) {
        Write-Host "   📍 $path" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Node.js no encontrado en PATH" -ForegroundColor Red
}

# 9. Recomendaciones
Write-Host "`n9️⃣ RECOMENDACIONES:" -ForegroundColor Blue
Write-Host "===============================" -ForegroundColor Yellow

if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host "🔧 PROBLEMA: Claude CLI no está instalado" -ForegroundColor Red
    Write-Host "   Solución 1: npm install -g @anthropic-ai/claude-cli" -ForegroundColor Green
    Write-Host "   Solución 2: npm install @anthropic-ai/claude-cli" -ForegroundColor Green
    Write-Host "   Solución 3: npx @anthropic-ai/claude-cli" -ForegroundColor Green
}

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "🔧 PROBLEMA: npx no está disponible" -ForegroundColor Red
    Write-Host "   Solución: Reinstalar Node.js desde https://nodejs.org" -ForegroundColor Green
}

Write-Host "`n✅ DIAGNÓSTICO COMPLETADO" -ForegroundColor Green
