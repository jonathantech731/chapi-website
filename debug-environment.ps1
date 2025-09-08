# Script de diagnóstico del entorno de desarrollo
# Ejecuta este script para verificar tu configuración

Write-Host "=== DIAGNÓSTICO DEL ENTORNO CHAPI ===" -ForegroundColor Green

# Verificar Node.js y npm
Write-Host "`n1. Verificando Node.js y npm..." -ForegroundColor Cyan
try {
  $nodeVersion = node --version
  $npmVersion = npm --version
  Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
  Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
}
catch {
  Write-Host "❌ Error: Node.js no está instalado o no está en PATH" -ForegroundColor Red
  Write-Host "Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
}

# Verificar directorio actual
Write-Host "`n2. Verificando directorio actual..." -ForegroundColor Cyan
$currentDir = Get-Location
Write-Host "📁 Directorio actual: $currentDir" -ForegroundColor White

# Verificar archivos principales
Write-Host "`n3. Verificando archivos principales..." -ForegroundColor Cyan
$files = @("package.json", "index.html", "assets\js\chapi-assistant.js")
foreach ($file in $files) {
  if (Test-Path $file) {
    Write-Host "✅ $file encontrado" -ForegroundColor Green
  }
  else {
    Write-Host "❌ $file NO encontrado" -ForegroundColor Red
  }
}

# Verificar node_modules
Write-Host "`n4. Verificando dependencias..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
  Write-Host "✅ node_modules existe" -ForegroundColor Green
  try {
    $liveServer = npm list live-server 2>$null
    if ($liveServer -match "live-server") {
      Write-Host "✅ live-server está instalado" -ForegroundColor Green
    }
    else {
      Write-Host "❌ live-server NO está instalado" -ForegroundColor Red
    }
  }
  catch {
    Write-Host "⚠️ No se pudo verificar live-server" -ForegroundColor Yellow
  }
}
else {
  Write-Host "❌ node_modules NO existe - ejecuta 'npm install'" -ForegroundColor Red
}

# Verificar puertos disponibles
Write-Host "`n5. Verificando puertos..." -ForegroundColor Cyan
$ports = @(3000, 3001, 3002)
foreach ($port in $ports) {
  try {
    $connection = Test-NetConnection -ComputerName localhost -Port $port -WarningAction SilentlyContinue
    if ($connection.TcpTestSucceeded) {
      Write-Host "⚠️ Puerto $port está en uso" -ForegroundColor Yellow
    }
    else {
      Write-Host "✅ Puerto $port está disponible" -ForegroundColor Green
    }
  }
  catch {
    Write-Host "✅ Puerto $port está disponible" -ForegroundColor Green
  }
}

Write-Host "`n=== COMANDOS SUGERIDOS ===" -ForegroundColor Green
Write-Host "Si todo está bien, ejecuta:" -ForegroundColor White
Write-Host "npm run dev" -ForegroundColor Cyan
Write-Host "`nSi hay problemas, ejecuta:" -ForegroundColor White
Write-Host "npm install" -ForegroundColor Cyan
Write-Host "npm run dev" -ForegroundColor Cyan
Write-Host "`nComando alternativo:" -ForegroundColor White
Write-Host "npx live-server --port=3000 --host=localhost --open=index.html" -ForegroundColor Cyan

Write-Host "`n=== FIN DEL DIAGNÓSTICO ===" -ForegroundColor Green
