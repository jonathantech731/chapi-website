# 🔧 CORRECCIÓN RÁPIDA - CLAUDE CLI
# Script corregido para instalar Claude CLI correctamente

Write-Host "🔧 CORRECCIÓN RÁPIDA - CLAUDE CLI" -ForegroundColor Blue
Write-Host "====================================" -ForegroundColor Yellow

Set-Location "d:\chapi-website"
Write-Host "📍 Directorio: $(Get-Location)" -ForegroundColor Cyan

# Verificar que npm funciona
Write-Host "`n✅ Verificando npm..." -ForegroundColor Green
try {
  $npmVersion = npm --version
  Write-Host "npm versión: $npmVersion" -ForegroundColor Green
}
catch {
  Write-Host "❌ Error con npm: $_" -ForegroundColor Red
  exit 1
}

# Instalar Claude CLI localmente (método más confiable)
Write-Host "`n📦 Instalando Claude CLI localmente..." -ForegroundColor Green
try {
  npm install @anthropic-ai/claude-cli --save-dev --force
  Write-Host "✅ Claude CLI instalado localmente" -ForegroundColor Green
}
catch {
  Write-Host "❌ Error instalando Claude CLI: $_" -ForegroundColor Red
}

# Verificar con npx
Write-Host "`n🔍 Verificando Claude CLI con npx..." -ForegroundColor Green
try {
  $claudeVersion = npx claude --version 2>$null
  if ($claudeVersion -and $claudeVersion -notlike "*error*" -and $claudeVersion -notlike "*not found*") {
    Write-Host "✅ Claude CLI funciona: $claudeVersion" -ForegroundColor Green
    $claudeWorking = $true
  }
  else {
    Write-Host "⚠️ Claude CLI con npx no responde correctamente" -ForegroundColor Yellow
  }
}
catch {
  Write-Host "⚠️ Error verificando con npx: $_" -ForegroundColor Yellow
}

# Verificar ejecución directa
Write-Host "`n🔍 Verificando ejecución directa..." -ForegroundColor Green
try {
  $claudeDirect = npx @anthropic-ai/claude-cli --version 2>$null
  if ($claudeDirect -and $claudeDirect -notlike "*error*") {
    Write-Host "✅ Claude CLI ejecución directa: $claudeDirect" -ForegroundColor Green
    $claudeWorking = $true
  }
  else {
    Write-Host "⚠️ Ejecución directa no funciona" -ForegroundColor Yellow
  }
}
catch {
  Write-Host "⚠️ Error en ejecución directa: $_" -ForegroundColor Yellow
}

# Verificar paquetes instalados
Write-Host "`n📋 Verificando paquetes instalados..." -ForegroundColor Green
try {
  $packages = npm list --depth=0 2>$null
  if ($packages -like "*@anthropic-ai/claude-cli*") {
    Write-Host "✅ Claude CLI encontrado en dependencias" -ForegroundColor Green
    $claudeInstalled = $true
  }
  else {
    Write-Host "❌ Claude CLI no encontrado en dependencias" -ForegroundColor Red
  }
}
catch {
  Write-Host "⚠️ Error verificando paquetes: $_" -ForegroundColor Yellow
}

# Resultado final
Write-Host "`n====================================" -ForegroundColor Blue
if ($claudeWorking -or $claudeInstalled) {
  Write-Host "🎉 CLAUDE CLI ESTÁ DISPONIBLE" -ForegroundColor Green
  Write-Host "====================================" -ForegroundColor Blue

  Write-Host "`n🚀 COMANDOS PARA USAR:" -ForegroundColor Cyan
  Write-Host "npx claude --version    # Verificar versión" -ForegroundColor White
  Write-Host "npx claude auth         # Configurar autenticación" -ForegroundColor White
  Write-Host "npx claude --help       # Ver ayuda" -ForegroundColor White
  Write-Host "npx claude chat         # Iniciar chat" -ForegroundColor White

  Write-Host "`n🎯 SIGUIENTE PASO:" -ForegroundColor Blue
  Write-Host "Ejecuta: npx claude auth" -ForegroundColor Yellow

}
else {
  Write-Host "❌ CLAUDE CLI NO FUNCIONA CORRECTAMENTE" -ForegroundColor Red
  Write-Host "====================================" -ForegroundColor Blue

  Write-Host "`n🔧 INTENTA MANUALMENTE:" -ForegroundColor Yellow
  Write-Host "npm cache clean --force" -ForegroundColor White
  Write-Host "npm install @anthropic-ai/claude-cli" -ForegroundColor White
  Write-Host "npx @anthropic-ai/claude-cli --version" -ForegroundColor White
}

Write-Host "`n✅ CORRECCIÓN COMPLETADA" -ForegroundColor Green
