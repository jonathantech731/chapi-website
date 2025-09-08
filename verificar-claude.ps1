# Script simple para verificar e instalar Claude CLI
Write-Host "=== VERIFICACIÓN E INSTALACIÓN DE CLAUDE CLI ===" -ForegroundColor Green

# Cambiar al directorio del proyecto
Set-Location "d:\chapi-website"

# Verificar si Claude CLI ya está disponible
Write-Host "Verificando Claude CLI existente..." -ForegroundColor Cyan

try {
    $claudeVersion = npx claude --version 2>$null
    if ($claudeVersion) {
        Write-Host "Claude CLI ya está instalado: $claudeVersion" -ForegroundColor Green
        Write-Host "Ubicación: $(Get-Command npx -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source)" -ForegroundColor Yellow
        exit 0
    }
} catch {
    Write-Host "Claude CLI no encontrado. Procediendo con la instalación..." -ForegroundColor Yellow
}

# Verificar Node.js y npm
Write-Host "`nVerificando Node.js y npm..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js o npm no están disponibles" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Instalar Claude CLI globalmente
Write-Host "`nInstalando Claude CLI..." -ForegroundColor Cyan
try {
    npm install -g @anthropic-ai/claude-cli
    Write-Host "Claude CLI instalado exitosamente!" -ForegroundColor Green
} catch {
    Write-Host "Error al instalar Claude CLI globalmente. Intentando instalación local..." -ForegroundColor Yellow

    # Instalar localmente como dependencia de desarrollo
    npm install --save-dev @anthropic-ai/claude-cli
}

# Verificar instalación
Write-Host "`nVerificando instalación..." -ForegroundColor Cyan
try {
    $claudeVersion = npx claude --version
    Write-Host "Claude CLI instalado correctamente: $claudeVersion" -ForegroundColor Green

    # Mostrar comandos útiles
    Write-Host "`n=== COMANDOS ÚTILES ===" -ForegroundColor Blue
    Write-Host "Configurar autenticación: npx claude auth" -ForegroundColor Yellow
    Write-Host "Ayuda: npx claude --help" -ForegroundColor Yellow
    Write-Host "Chat: npx claude chat" -ForegroundColor Yellow

} catch {
    Write-Host "Error: No se pudo verificar la instalación de Claude CLI" -ForegroundColor Red
    Write-Host "Intenta ejecutar manualmente: npm install -g @anthropic-ai/claude-cli" -ForegroundColor Yellow
}

Write-Host "`n=== VERIFICACIÓN COMPLETADA ===" -ForegroundColor Green
