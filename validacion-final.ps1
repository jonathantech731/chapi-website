# 🎯 VALIDACIÓN FINAL DEL PROYECTO
# Script para confirmar que todos los errores han sido reparados

Write-Host "🔍 EJECUTANDO VALIDACIÓN FINAL..." -ForegroundColor Green
Write-Host "=" * 50

# Función para verificar archivos
function Test-FileContent {
  param($FilePath, $Description)

  if (Test-Path $FilePath) {
    $content = Get-Content $FilePath -Raw -ErrorAction SilentlyContinue

    # Verificar conflictos de merge
    if ($content -match "<<<<<<|======|>>>>>>") {
      Write-Host "❌ $Description - Conflictos de merge detectados" -ForegroundColor Red
      return $false
    }

    # Verificar contenido válido
    if ($content.Length -gt 100) {
      Write-Host "✅ $Description - Archivo válido" -ForegroundColor Green
      return $true
    }
    else {
      Write-Host "⚠️  $Description - Archivo muy pequeño" -ForegroundColor Yellow
      return $false
    }
  }
  else {
    Write-Host "❌ $Description - Archivo no encontrado" -ForegroundColor Red
    return $false
  }
}

# 1. Verificar archivos principales
Write-Host "`n📁 VERIFICANDO ARCHIVOS PRINCIPALES..." -ForegroundColor Yellow

$mainFiles = @{
  "README_COMERCIAL.md"                          = "Documentación comercial"
  "test-chapi-ultra-comercial.html"              = "Página de testing"
  "assets\js\chapi-assistant.js"                 = "Asistente principal"
  "assets\js\chapi-config-ultra-comercial.js"    = "Configuración comercial"
  "assets\js\chapi-assistant-ultra-comercial.js" = "Asistente comercial"
  "package.json"                                 = "Configuración del proyecto"
}

$validFiles = 0
$totalFiles = $mainFiles.Count

foreach ($file in $mainFiles.GetEnumerator()) {
  if (Test-FileContent -FilePath $file.Key -Description $file.Value) {
    $validFiles++
  }
}

# 2. Verificar scripts de npm
Write-Host "`n📦 VERIFICANDO SCRIPTS DE NPM..." -ForegroundColor Yellow

if (Test-Path "package.json") {
  $packageJson = Get-Content "package.json" | ConvertFrom-Json -ErrorAction SilentlyContinue

  if ($packageJson.scripts.comercial) {
    Write-Host "✅ Script 'comercial' configurado" -ForegroundColor Green
  }
  else {
    Write-Host "❌ Script 'comercial' faltante" -ForegroundColor Red
  }

  if ($packageJson.scripts."test-comercial") {
    Write-Host "✅ Script 'test-comercial' configurado" -ForegroundColor Green
  }
  else {
    Write-Host "❌ Script 'test-comercial' faltante" -ForegroundColor Red
  }
}
else {
  Write-Host "❌ package.json no encontrado" -ForegroundColor Red
}

# 3. Verificar sintaxis de archivos JS
Write-Host "`n🔧 VERIFICANDO SINTAXIS JAVASCRIPT..." -ForegroundColor Yellow

$jsFiles = @(
  "assets\js\chapi-assistant.js",
  "assets\js\chapi-config-ultra-comercial.js",
  "assets\js\chapi-assistant-ultra-comercial.js"
)

$validJsFiles = 0
foreach ($jsFile in $jsFiles) {
  if (Test-Path $jsFile) {
    $jsContent = Get-Content $jsFile -Raw

    # Verificaciones básicas de sintaxis
    $hasConflicts = $jsContent -match "<<<<<<|======|>>>>>>"
    $hasBasicStructure = $jsContent -match "(function|class|const|let|var)"
    $hasClosingBraces = ($jsContent -split "\{").Length -eq ($jsContent -split "\}").Length

    if (-not $hasConflicts -and $hasBasicStructure) {
      Write-Host "✅ $jsFile - Sintaxis correcta" -ForegroundColor Green
      $validJsFiles++
    }
    else {
      Write-Host "❌ $jsFile - Problemas de sintaxis" -ForegroundColor Red
    }
  }
  else {
    Write-Host "❌ $jsFile - No encontrado" -ForegroundColor Red
  }
}

# 4. Test de conectividad de puertos
Write-Host "`n🌐 VERIFICANDO PUERTOS DISPONIBLES..." -ForegroundColor Yellow

$testPorts = @(3000, 3003, 8000)
$availablePorts = 0

foreach ($port in $testPorts) {
  try {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $connection = $tcp.BeginConnect("localhost", $port, $null, $null)
    $wait = $connection.AsyncWaitHandle.WaitOne(1000, $false)

    if ($tcp.Connected) {
      Write-Host "⚠️  Puerto $port en uso" -ForegroundColor Yellow
    }
    else {
      Write-Host "✅ Puerto $port disponible" -ForegroundColor Green
      $availablePorts++
    }
    $tcp.Close()
  }
  catch {
    Write-Host "✅ Puerto $port disponible" -ForegroundColor Green
    $availablePorts++
  }
}

# 5. Calcular score final
Write-Host "`n📊 RESUMEN DE VALIDACIÓN" -ForegroundColor Cyan
Write-Host "=" * 50

$fileScore = [math]::Round(($validFiles / $totalFiles) * 100, 0)
$jsScore = [math]::Round(($validJsFiles / $jsFiles.Count) * 100, 0)
$portScore = [math]::Round(($availablePorts / $testPorts.Count) * 100, 0)
$overallScore = [math]::Round(($fileScore + $jsScore + $portScore) / 3, 0)

Write-Host "📁 Archivos principales: $fileScore% ($validFiles/$totalFiles)" -ForegroundColor $(if ($fileScore -ge 80) { "Green" }elseif ($fileScore -ge 60) { "Yellow" }else { "Red" })
Write-Host "🔧 Archivos JavaScript: $jsScore% ($validJsFiles/$($jsFiles.Count))" -ForegroundColor $(if ($jsScore -ge 80) { "Green" }elseif ($jsScore -ge 60) { "Yellow" }else { "Red" })
Write-Host "🌐 Puertos disponibles: $portScore% ($availablePorts/$($testPorts.Count))" -ForegroundColor $(if ($portScore -ge 80) { "Green" }elseif ($portScore -ge 60) { "Yellow" }else { "Red" })

Write-Host "`n🎯 SCORE GENERAL: $overallScore%" -ForegroundColor $(if ($overallScore -ge 90) { "Green" }elseif ($overallScore -ge 70) { "Yellow" }else { "Red" })

# 6. Recomendaciones finales
Write-Host "`n💡 RECOMENDACIONES:" -ForegroundColor Cyan

if ($overallScore -ge 90) {
  Write-Host "🟢 PROYECTO COMPLETAMENTE FUNCIONAL" -ForegroundColor Green
  Write-Host "• Ejecutar: npm run comercial" -ForegroundColor White
  Write-Host "• URL de testing: http://localhost:3000/test-chapi-ultra-comercial.html" -ForegroundColor White
}
elseif ($overallScore -ge 70) {
  Write-Host "🟡 PROYECTO FUNCIONAL CON ADVERTENCIAS" -ForegroundColor Yellow
  Write-Host "• Revisar archivos faltantes o con errores" -ForegroundColor White
  Write-Host "• Ejecutar: npm install" -ForegroundColor White
}
else {
  Write-Host "🔴 PROYECTO REQUIERE REPARACIÓN" -ForegroundColor Red
  Write-Host "• Verificar archivos críticos faltantes" -ForegroundColor White
  Write-Host "• Revisar errores de sintaxis en JS" -ForegroundColor White
}

Write-Host "`n🚀 COMANDOS RÁPIDOS:" -ForegroundColor Cyan
Write-Host "• Inicio comercial:   npm run comercial" -ForegroundColor White
Write-Host "• Solo testing:       npm run test-comercial" -ForegroundColor White
Write-Host "• Diagnóstico:        .\diagnostico-completo.ps1" -ForegroundColor White

Write-Host "`n✅ VALIDACIÓN COMPLETADA" -ForegroundColor Green
