# 🔧 DIAGNÓSTICO COMPLETO - CHAPI ULTRA COMERCIAL
# Script para verificar que todos los componentes estén funcionando

Write-Host "🚀 INICIANDO DIAGNÓSTICO COMPLETO..." -ForegroundColor Green
Write-Host "=" * 50

# 1. Verificar estructura de archivos
Write-Host "`n📁 VERIFICANDO ESTRUCTURA DE ARCHIVOS..." -ForegroundColor Yellow

$requiredFiles = @(
  "index.html",
  "test-chapi-ultra-comercial.html",
  "assets\js\chapi-assistant.js",
  "assets\js\chapi-config-ultra-comercial.js",
  "assets\js\chapi-assistant-ultra-comercial.js",
  "assets\css\chapi-assistant-pro.css",
  "package.json"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
  if (Test-Path $file) {
    Write-Host "✅ $file" -ForegroundColor Green
  }
  else {
    Write-Host "❌ $file" -ForegroundColor Red
    $missingFiles += $file
  }
}

# 2. Verificar package.json y scripts
Write-Host "`n📦 VERIFICANDO PACKAGE.JSON..." -ForegroundColor Yellow

if (Test-Path "package.json") {
  $packageJson = Get-Content "package.json" | ConvertFrom-Json

  # Verificar scripts
  $requiredScripts = @("comercial", "test-comercial", "start")
  foreach ($script in $requiredScripts) {
    if ($packageJson.scripts.$script) {
      Write-Host "✅ Script '$script': $($packageJson.scripts.$script)" -ForegroundColor Green
    }
    else {
      Write-Host "❌ Script '$script' no encontrado" -ForegroundColor Red
    }
  }
}
else {
  Write-Host "❌ package.json no encontrado" -ForegroundColor Red
}

# 3. Verificar dependencias de Node.js
Write-Host "`n📚 VERIFICANDO DEPENDENCIAS..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
  Write-Host "✅ node_modules encontrado" -ForegroundColor Green

  # Verificar live-server específicamente
  if (Test-Path "node_modules\.bin\live-server.cmd") {
    Write-Host "✅ live-server instalado" -ForegroundColor Green
  }
  else {
    Write-Host "⚠️  live-server no encontrado, instalando..." -ForegroundColor Yellow
    npm install live-server --save-dev
  }
}
else {
  Write-Host "⚠️  node_modules no encontrado, ejecutando npm install..." -ForegroundColor Yellow
  npm install
}

# 4. Verificar configuración del asistente comercial
Write-Host "`n🤖 VERIFICANDO CONFIGURACIÓN DEL ASISTENTE..." -ForegroundColor Yellow

$configFile = "assets\js\chapi-config-ultra-comercial.js"
if (Test-Path $configFile) {
  $configContent = Get-Content $configFile -Raw

  # Verificar elementos clave
  $checks = @{
    "comercialMode"    = $configContent -match "comercialMode.*true"
    "salesPersonality" = $configContent -match "salesPersonality"
    "packages"         = $configContent -match "packages.*\{"
    "quickActions"     = $configContent -match "quickActions.*\["
    "customResponses"  = $configContent -match "customResponses.*\{"
  }

  foreach ($check in $checks.GetEnumerator()) {
    if ($check.Value) {
      Write-Host "✅ $($check.Key) configurado" -ForegroundColor Green
    }
    else {
      Write-Host "❌ $($check.Key) no encontrado" -ForegroundColor Red
    }
  }
}
else {
  Write-Host "❌ Archivo de configuración no encontrado" -ForegroundColor Red
}

# 5. Verificar asistente ultra comercial
Write-Host "`n💼 VERIFICANDO ASISTENTE ULTRA COMERCIAL..." -ForegroundColor Yellow

$assistantFile = "assets\js\chapi-assistant-ultra-comercial.js"
if (Test-Path $assistantFile) {
  $assistantContent = Get-Content $assistantFile -Raw

  $features = @{
    "CommercialChatbotAssistant" = $assistantContent -match "class CommercialChatbotAssistant"
    "handleUserInput"            = $assistantContent -match "handleUserInput"
    "generateCommercialResponse" = $assistantContent -match "generateCommercialResponse"
    "handleObjections"           = $assistantContent -match "handleObjections"
    "presentPackages"            = $assistantContent -match "presentPackages"
  }

  foreach ($feature in $features.GetEnumerator()) {
    if ($feature.Value) {
      Write-Host "✅ $($feature.Key) implementado" -ForegroundColor Green
    }
    else {
      Write-Host "❌ $($feature.Key) no encontrado" -ForegroundColor Red
    }
  }
}
else {
  Write-Host "❌ Asistente ultra comercial no encontrado" -ForegroundColor Red
}

# 6. Test de conectividad de puertos
Write-Host "`n🌐 VERIFICANDO PUERTOS DISPONIBLES..." -ForegroundColor Yellow

$ports = @(3000, 8000, 8080, 5000)
foreach ($port in $ports) {
  try {
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    $tcpClient.ConnectAsync("localhost", $port).Wait(1000)
    if ($tcpClient.Connected) {
      Write-Host "⚠️  Puerto $port en uso" -ForegroundColor Yellow
      $tcpClient.Close()
    }
    else {
      Write-Host "✅ Puerto $port disponible" -ForegroundColor Green
    }
  }
  catch {
    Write-Host "✅ Puerto $port disponible" -ForegroundColor Green
  }
}

# 7. Resumen y recomendaciones
Write-Host "`n📊 RESUMEN DEL DIAGNÓSTICO" -ForegroundColor Cyan
Write-Host "=" * 50

if ($missingFiles.Count -eq 0) {
  Write-Host "✅ Todos los archivos principales están presentes" -ForegroundColor Green
}
else {
  Write-Host "❌ Archivos faltantes: $($missingFiles -join ', ')" -ForegroundColor Red
}

# 8. Comandos de inicio recomendados
Write-Host "`n🚀 COMANDOS PARA INICIAR:" -ForegroundColor Cyan
Write-Host "1. Inicio rápido:     npm run comercial" -ForegroundColor White
Write-Host "2. Solo testing:      npm run test-comercial" -ForegroundColor White
Write-Host "3. Servidor manual:   npx live-server --port=3000 --open=/test-chapi-ultra-comercial.html" -ForegroundColor White
Write-Host "4. Python fallback:   python -m http.server 8000" -ForegroundColor White

Write-Host "`n🎯 PÁGINAS DE PRUEBA:" -ForegroundColor Cyan
Write-Host "• Principal:          http://localhost:3000" -ForegroundColor White
Write-Host "• Assistant Normal:   http://localhost:3000/test-assistant.html" -ForegroundColor White
Write-Host "• Assistant Pro:      http://localhost:3000/test-chapi-pro.html" -ForegroundColor White
Write-Host "• ULTRA COMERCIAL:    http://localhost:3000/test-chapi-ultra-comercial.html" -ForegroundColor White

Write-Host "`n💡 RECOMENDACIONES:" -ForegroundColor Cyan
Write-Host "1. Usar 'test-chapi-ultra-comercial.html' para probar el vendedor agresivo" -ForegroundColor White
Write-Host "2. Monitorear métricas de conversión en tiempo real" -ForegroundColor White
Write-Host "3. Ajustar agresividad en chapi-config-ultra-comercial.js según resultados" -ForegroundColor White

Write-Host "`n✅ DIAGNÓSTICO COMPLETADO" -ForegroundColor Green
Write-Host "🚀 Todo listo para empezar a vender!" -ForegroundColor Yellow
