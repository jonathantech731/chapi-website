# 🛠️ REPARADOR DE CLAUDE CLI
# Script para reparar e instalar Claude CLI con múltiples métodos

Write-Host "🛠️ REPARADOR DE CLAUDE CLI" -ForegroundColor Blue
Write-Host "===========================" -ForegroundColor Yellow

Set-Location "d:\chapi-website"

# Método 1: Limpiar caché y reinstalar
Write-Host "`n1️⃣ LIMPIANDO CACHÉ DE NPM..." -ForegroundColor Green
try {
    & npm cache clean --force
    Write-Host "✅ Caché de npm limpiado" -ForegroundColor Green
} catch {
    Write-Host "⚠️ No se pudo limpiar caché: $_" -ForegroundColor Yellow
}

# Método 2: Instalar globalmente
Write-Host "`n2️⃣ INSTALANDO CLAUDE CLI GLOBALMENTE..." -ForegroundColor Green
try {
    & npm install -g @anthropic-ai/claude-cli --force
    Write-Host "✅ Instalación global completada" -ForegroundColor Green

    # Verificar instalación global
    $claudeVersion = & claude --version 2>$null
    if ($claudeVersion) {
        Write-Host "✅ Verificación exitosa: $claudeVersion" -ForegroundColor Green
        Write-Host "🎉 CLAUDE CLI INSTALADO Y FUNCIONANDO!" -ForegroundColor Green
        Write-Host "`n🚀 Comandos disponibles:" -ForegroundColor Cyan
        Write-Host "   claude --help" -ForegroundColor White
        Write-Host "   claude auth" -ForegroundColor White
        Write-Host "   claude chat" -ForegroundColor White
        exit 0
    }
} catch {
    Write-Host "❌ Error en instalación global: $_" -ForegroundColor Red
}

# Método 3: Instalar localmente
Write-Host "`n3️⃣ INSTALANDO CLAUDE CLI LOCALMENTE..." -ForegroundColor Green
try {
    & npm install @anthropic-ai/claude-cli --save-dev --force
    Write-Host "✅ Instalación local completada" -ForegroundColor Green

    # Verificar instalación local
    $claudeNpx = & npx claude --version 2>$null
    if ($claudeNpx -and $claudeNpx -notlike "*error*") {
        Write-Host "✅ Verificación exitosa: $claudeNpx" -ForegroundColor Green
        Write-Host "🎉 CLAUDE CLI INSTALADO VIA NPX!" -ForegroundColor Green
        Write-Host "`n🚀 Comandos disponibles:" -ForegroundColor Cyan
        Write-Host "   npx claude --help" -ForegroundColor White
        Write-Host "   npx claude auth" -ForegroundColor White
        Write-Host "   npx claude chat" -ForegroundColor White
        exit 0
    }
} catch {
    Write-Host "❌ Error en instalación local: $_" -ForegroundColor Red
}

# Método 4: Usar directamente sin instalar
Write-Host "`n4️⃣ PROBANDO EJECUCIÓN DIRECTA..." -ForegroundColor Green
try {
    $claudeDirect = & npx @anthropic-ai/claude-cli --version 2>$null
    if ($claudeDirect -and $claudeDirect -notlike "*error*") {
        Write-Host "✅ Ejecución directa exitosa: $claudeDirect" -ForegroundColor Green
        Write-Host "🎉 CLAUDE CLI FUNCIONA VIA NPX DIRECTO!" -ForegroundColor Green
        Write-Host "`n🚀 Comandos disponibles:" -ForegroundColor Cyan
        Write-Host "   npx @anthropic-ai/claude-cli --help" -ForegroundColor White
        Write-Host "   npx @anthropic-ai/claude-cli auth" -ForegroundColor White
        Write-Host "   npx @anthropic-ai/claude-cli chat" -ForegroundColor White
        exit 0
    }
} catch {
    Write-Host "❌ Error en ejecución directa: $_" -ForegroundColor Red
}

# Método 5: Verificar y reparar Node.js
Write-Host "`n5️⃣ VERIFICANDO NODE.JS..." -ForegroundColor Green
$nodeVersion = & node --version 2>$null
$npmVersion = & npm --version 2>$null

if (-not $nodeVersion) {
    Write-Host "❌ Node.js no está disponible" -ForegroundColor Red
    Write-Host "🔧 SOLUCIÓN: Instalar Node.js" -ForegroundColor Yellow
    Write-Host "   1. Descarga desde: https://nodejs.org" -ForegroundColor White
    Write-Host "   2. Ejecuta: choco install nodejs (si tienes Chocolatey)" -ForegroundColor White
    Write-Host "   3. Reinicia la terminal después de instalar" -ForegroundColor White
} else {
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
}

# Método 6: Verificar permisos y PATH
Write-Host "`n6️⃣ VERIFICANDO PERMISOS Y PATH..." -ForegroundColor Green
$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object System.Security.Principal.WindowsPrincipal($currentUser)
$isAdmin = $principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)

if ($isAdmin) {
    Write-Host "✅ Ejecutándose como Administrador" -ForegroundColor Green
} else {
    Write-Host "⚠️ No se está ejecutando como Administrador" -ForegroundColor Yellow
    Write-Host "   Para instalación global, ejecuta como Administrador" -ForegroundColor White
}

# Verificar npm config
Write-Host "`n7️⃣ VERIFICANDO CONFIGURACIÓN DE NPM..." -ForegroundColor Green
try {
    $npmConfig = & npm config list 2>$null
    if ($npmConfig) {
        Write-Host "✅ Configuración de npm obtenida" -ForegroundColor Green
    }

    # Configurar registro de npm
    & npm config set registry https://registry.npmjs.org/
    Write-Host "✅ Registro de npm configurado" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al configurar npm: $_" -ForegroundColor Red
}

Write-Host "`n❌ TODOS LOS MÉTODOS FALLARON" -ForegroundColor Red
Write-Host "🔧 PASOS MANUALES RECOMENDADOS:" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Write-Host "1. Reinicia la terminal/PowerShell" -ForegroundColor White
Write-Host "2. Ejecuta como Administrador" -ForegroundColor White
Write-Host "3. npm cache clean --force" -ForegroundColor White
Write-Host "4. npm install -g @anthropic-ai/claude-cli" -ForegroundColor White
Write-Host "5. Si falla, usa: npx @anthropic-ai/claude-cli" -ForegroundColor White
