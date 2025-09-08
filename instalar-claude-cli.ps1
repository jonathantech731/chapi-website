# 🤖 INSTALADOR DE CLAUDE CLI
# Script para instalar Claude CLI en Windows

Write-Host "🤖 INSTALANDO CLAUDE CLI..." -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Yellow

# Función para verificar si un comando existe
function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

# Método 1: Verificar si ya está instalado
Write-Host "`n🔍 Verificando instalación existente..." -ForegroundColor Cyan
if (Test-Command "claude") {
    $version = claude --version 2>$null
    if ($version) {
        Write-Host "✅ Claude CLI ya está instalado: $version" -ForegroundColor Green
        Write-Host "`n🚀 Puedes usar: claude --help" -ForegroundColor White
        exit 0
    }
}

# Método 2: Instalar via npm (recomendado)
Write-Host "`n📦 Método 1: Instalación via NPM..." -ForegroundColor Cyan
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "✅ NPM encontrado: v$npmVersion" -ForegroundColor Green

    Write-Host "📥 Instalando @anthropic-ai/claude-cli..." -ForegroundColor Yellow
    try {
        npm install -g @anthropic-ai/claude-cli --verbose

        # Verificar instalación
        if (Test-Command "claude") {
            Write-Host "✅ ¡Claude CLI instalado exitosamente!" -ForegroundColor Green
            $claudeVersion = claude --version
            Write-Host "📱 Versión: $claudeVersion" -ForegroundColor Cyan
            exit 0
        } else {
            Write-Host "⚠️  Instalación completada pero comando no encontrado" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Error en instalación via npm: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "❌ NPM no encontrado" -ForegroundColor Red
}

# Método 3: Instalar Node.js primero si no está disponible
Write-Host "`n📦 Método 2: Verificando Node.js..." -ForegroundColor Cyan
if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js no encontrado" -ForegroundColor Red
    Write-Host "`n📥 Descargando Node.js..." -ForegroundColor Yellow

    # Verificar si tenemos chocolatey
    if (Test-Command "choco") {
        Write-Host "🍫 Usando Chocolatey para instalar Node.js..." -ForegroundColor Green
        choco install nodejs -y

        # Recargar PATH
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

        # Intentar instalar Claude CLI de nuevo
        if (Test-Command "npm") {
            npm install -g @anthropic-ai/claude-cli
        }
    } else {
        Write-Host "💡 Por favor instala Node.js manualmente desde: https://nodejs.org" -ForegroundColor Yellow
        Write-Host "   Luego ejecuta: npm install -g @anthropic-ai/claude-cli" -ForegroundColor White
    }
} else {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
}

# Método 4: Instalación manual con curl (si está disponible)
Write-Host "`n📦 Método 3: Instalación manual..." -ForegroundColor Cyan
if (Test-Command "curl") {
    Write-Host "🌐 Curl disponible, intentando descarga directa..." -ForegroundColor Yellow
    try {
        # URL hipotética - ajustar según la documentación oficial
        # curl -L "https://github.com/anthropic-ai/claude-cli/releases/latest/download/claude-cli-windows.exe" -o "claude.exe"
        Write-Host "ℹ️  Método manual requiere URL específica del repositorio oficial" -ForegroundColor Cyan
    } catch {
        Write-Host "❌ Error en descarga manual" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Curl no disponible" -ForegroundColor Red
}

# Método 5: Verificar instalación en ruta personalizada
Write-Host "`n🔍 Buscando Claude CLI en rutas del sistema..." -ForegroundColor Cyan
$possiblePaths = @(
    "$env:APPDATA\npm\claude.cmd",
    "$env:LOCALAPPDATA\npm\claude.cmd",
    "C:\Program Files\nodejs\claude.cmd",
    "C:\Users\$env:USERNAME\AppData\Roaming\npm\claude.cmd"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        Write-Host "✅ Encontrado en: $path" -ForegroundColor Green
        # Agregar a PATH si no está
        if ($env:PATH -notlike "*$(Split-Path $path)*") {
            Write-Host "📝 Agregando al PATH..." -ForegroundColor Yellow
            $env:PATH += ";$(Split-Path $path)"
        }
        break
    }
}

# Resumen final
Write-Host "`n📊 RESUMEN DE INSTALACIÓN:" -ForegroundColor Cyan
Write-Host "=" * 40

if (Test-Command "claude") {
    Write-Host "🎉 ¡ÉXITO! Claude CLI está instalado" -ForegroundColor Green
    Write-Host "`n🚀 Comandos disponibles:" -ForegroundColor Yellow
    Write-Host "  claude --help        # Ver ayuda" -ForegroundColor White
    Write-Host "  claude auth login    # Iniciar sesión" -ForegroundColor White
    Write-Host "  claude chat          # Iniciar chat" -ForegroundColor White
} else {
    Write-Host "❌ Claude CLI no está disponible" -ForegroundColor Red
    Write-Host "`n💡 SOLUCIONES ALTERNATIVAS:" -ForegroundColor Yellow
    Write-Host "1. Instalar Node.js desde: https://nodejs.org" -ForegroundColor White
    Write-Host "2. Luego ejecutar: npm install -g @anthropic-ai/claude-cli" -ForegroundColor White
    Write-Host "3. O usar la interfaz web: https://claude.ai" -ForegroundColor White
}

Write-Host "`nPresiona cualquier tecla para continuar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
