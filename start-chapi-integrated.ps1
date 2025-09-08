# 🚀 CHAPI Assistant - Servidor de Desarrollo Integrado
# Inicia el backend FastAPI y servidor web para desarrollo

Write-Host "🤖 INICIANDO CHAPI ASSISTANT INTEGRADO" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Verificar dependencias
Write-Host "🔍 Verificando dependencias..." -ForegroundColor Cyan

# Verificar Python
try {
  $pythonVersion = python --version 2>&1
  if ($pythonVersion -match "Python") {
    Write-Host "✅ Python: $pythonVersion" -ForegroundColor Green
  }
  else {
    throw "Python no encontrado"
  }
}
catch {
  Write-Host "❌ Python no instalado o no en PATH" -ForegroundColor Red
  Write-Host "   Instala Python desde: https://python.org" -ForegroundColor Yellow
  pause
  exit 1
}

# Verificar archivo .env
if (-not (Test-Path ".env")) {
  Write-Host "⚠️  Archivo .env no encontrado" -ForegroundColor Yellow
  Write-Host ""
  Write-Host "📋 CONFIGURACIÓN REQUERIDA:" -ForegroundColor Cyan
  Write-Host "1. ¿Ya configuraste tu clave de OpenAI?" -ForegroundColor White
  Write-Host "2. ¿Quieres ejecutar el configurador automático?" -ForegroundColor White
  Write-Host ""

  $configurar = Read-Host "¿Ejecutar configurador automático? (S/N)"
  if ($configurar -eq "S" -or $configurar -eq "s") {
    Write-Host "🔧 Ejecutando configurador..." -ForegroundColor Cyan
    .\configurar-seguridad.ps1
    if ($LASTEXITCODE -ne 0) {
      Write-Host "❌ Error en configuración" -ForegroundColor Red
      pause
      exit 1
    }
  }
  else {
    Write-Host "❌ Configuración requerida para continuar" -ForegroundColor Red
    Write-Host "   Ejecuta: .\configurar-seguridad.ps1" -ForegroundColor Yellow
    pause
    exit 1
  }
}

# Verificar archivo flows.yaml
if (-not (Test-Path "flows.yaml")) {
  Write-Host "⚠️  Archivo flows.yaml no encontrado" -ForegroundColor Yellow
  Write-Host "   Los flujos conversacionales podrían no funcionar correctamente" -ForegroundColor Yellow
}

# Instalar dependencias Python si es necesario
Write-Host "📦 Verificando dependencias Python..." -ForegroundColor Cyan
if (Test-Path "requirements.txt") {
  try {
    pip install -r requirements.txt --quiet
    Write-Host "✅ Dependencias Python verificadas" -ForegroundColor Green
  }
  catch {
    Write-Host "⚠️  Error instalando dependencias Python" -ForegroundColor Yellow
    Write-Host "   Ejecuta manualmente: pip install -r requirements.txt" -ForegroundColor Yellow
  }
}
else {
  Write-Host "⚠️  requirements.txt no encontrado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 INICIANDO SERVICIOS..." -ForegroundColor Green
Write-Host ""

# Función para detener procesos al cerrar
$Global:BackgroundJobs = @()

function Stop-AllServices {
  Write-Host ""
  Write-Host "🛑 Deteniendo servicios..." -ForegroundColor Yellow

  # Detener jobs de PowerShell
  foreach ($job in $Global:BackgroundJobs) {
    if ($job -and $job.State -eq "Running") {
      Stop-Job $job -Force
      Remove-Job $job -Force
    }
  }

  # Buscar y detener procesos Python del proxy
  try {
    $pythonProcesses = Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object {
      $_.CommandLine -and $_.CommandLine.Contains("chapi_proxy")
    }
    foreach ($proc in $pythonProcesses) {
      Stop-Process -Id $proc.Id -Force
      Write-Host "✅ Proceso Python detenido: $($proc.Id)" -ForegroundColor Green
    }
  }
  catch {
    # Proceso ya detenido
  }

  Write-Host "✅ Servicios detenidos" -ForegroundColor Green
}

# Configurar el manejador de cierre
Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action {
  Stop-AllServices
}

# Capturar Ctrl+C
[Console]::TreatControlCAsInput = $false
[Console]::CancelKeyPress += {
  param($sender, $e)
  $e.Cancel = $true
  Stop-AllServices
  exit 0
}

try {
  # 1. Iniciar Backend FastAPI
  Write-Host "🔧 Iniciando Backend FastAPI..." -ForegroundColor Cyan
  Write-Host "   Puerto: 8001" -ForegroundColor White
  Write-Host "   Endpoint: http://localhost:8001" -ForegroundColor White

  $backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    python chapi_proxy.py
  }
  $Global:BackgroundJobs += $backendJob

  # Esperar un momento para que el backend inicie
  Start-Sleep -Seconds 3

  # Verificar que el backend esté corriendo
  try {
    $response = Invoke-WebRequest -Uri "http://localhost:8001/" -TimeoutSec 5 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
      Write-Host "✅ Backend FastAPI iniciado correctamente" -ForegroundColor Green
    }
    else {
      throw "Backend no responde correctamente"
    }
  }
  catch {
    Write-Host "⚠️  Backend podría tener problemas. Continuando..." -ForegroundColor Yellow
    Write-Host "   Error: $_" -ForegroundColor Red
  }

  Write-Host ""

  # 2. Iniciar Servidor Web
  Write-Host "🌐 Iniciando Servidor Web..." -ForegroundColor Cyan
  Write-Host "   Puerto: 8000" -ForegroundColor White
  Write-Host "   URL: http://localhost:8000" -ForegroundColor White

  $webJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    python -m http.server 8000
  }
  $Global:BackgroundJobs += $webJob

  # Esperar un momento para que el servidor web inicie
  Start-Sleep -Seconds 2

  Write-Host "✅ Servidor Web iniciado" -ForegroundColor Green
  Write-Host ""

  # 3. Mostrar información del sistema
  Write-Host "📊 SISTEMA CHAPI ASSISTANT ACTIVO" -ForegroundColor Green
  Write-Host "=================================" -ForegroundColor Green
  Write-Host ""
  Write-Host "🌐 Frontend (Landing Page):" -ForegroundColor Cyan
  Write-Host "   http://localhost:8000" -ForegroundColor White
  Write-Host ""
  Write-Host "🔧 Backend API:" -ForegroundColor Cyan
  Write-Host "   http://localhost:8001" -ForegroundColor White
  Write-Host "   Health Check: http://localhost:8001/api/health" -ForegroundColor White
  Write-Host "   Stats: http://localhost:8001/api/stats" -ForegroundColor White
  Write-Host ""
  Write-Host "🤖 Características Activas:" -ForegroundColor Cyan
  Write-Host "   ✅ Widget de chat integrado" -ForegroundColor Green
  Write-Host "   ✅ Flujos conversacionales programados" -ForegroundColor Green
  Write-Host "   ✅ Integración OpenAI/Azure OpenAI" -ForegroundColor Green
  Write-Host "   ✅ Captura y gestión de leads" -ForegroundColor Green
  Write-Host "   ✅ Base de datos SQLite" -ForegroundColor Green
  Write-Host "   ✅ Rate limiting y seguridad" -ForegroundColor Green
  Write-Host ""
  Write-Host "📱 Canales Disponibles:" -ForegroundColor Cyan
  Write-Host "   ✅ Widget web integrado" -ForegroundColor Green
  Write-Host "   🔧 Bot de Telegram (configurable)" -ForegroundColor Yellow
  Write-Host "   🔧 API REST para integraciones" -ForegroundColor Yellow
  Write-Host ""

  # 4. Abrir navegador automáticamente
  $abrirNav = Read-Host "¿Abrir http://localhost:8000 en el navegador? (S/N)"
  if ($abrirNav -eq "S" -or $abrirNav -eq "s") {
    Start-Process "http://localhost:8000"
    Write-Host "🌐 Navegador abierto" -ForegroundColor Green
  }

  Write-Host ""
  Write-Host "⌨️  COMANDOS DISPONIBLES:" -ForegroundColor Yellow
  Write-Host "   'q' + Enter = Salir" -ForegroundColor White
  Write-Host "   'r' + Enter = Reiniciar servicios" -ForegroundColor White
  Write-Host "   's' + Enter = Ver estadísticas" -ForegroundColor White
  Write-Host "   'h' + Enter = Health check" -ForegroundColor White
  Write-Host "   'l' + Enter = Ver logs del backend" -ForegroundColor White
  Write-Host ""
  Write-Host "💡 El asistente CHAPI está listo para interactuar en la web." -ForegroundColor Cyan
  Write-Host "   Prueba haciendo clic en el botón flotante de chat." -ForegroundColor White
  Write-Host ""

  # 5. Loop principal
  while ($true) {
    $input = Read-Host "Comando"

    switch ($input.ToLower()) {
      'q' {
        Write-Host "👋 Cerrando CHAPI Assistant..." -ForegroundColor Yellow
        Stop-AllServices
        exit 0
      }
      'r' {
        Write-Host "🔄 Reiniciando servicios..." -ForegroundColor Cyan
        Stop-AllServices
        Start-Sleep -Seconds 2

        # Reiniciar backend
        $backendJob = Start-Job -ScriptBlock {
          Set-Location $using:PWD
          python chapi_proxy.py
        }
        $Global:BackgroundJobs += $backendJob

        Write-Host "✅ Servicios reiniciados" -ForegroundColor Green
      }
      's' {
        Write-Host "📊 Obteniendo estadísticas..." -ForegroundColor Cyan
        try {
          $stats = Invoke-RestMethod -Uri "http://localhost:8001/api/stats" -TimeoutSec 5
          Write-Host "📈 Leads totales: $($stats.total_leads)" -ForegroundColor Green
          Write-Host "💬 Conversaciones hoy: $($stats.conversations_today)" -ForegroundColor Green
          if ($stats.top_sectors) {
            Write-Host "🏢 Sectores populares:" -ForegroundColor Green
            foreach ($sector in $stats.top_sectors) {
              Write-Host "   • $($sector.sector): $($sector.count)" -ForegroundColor White
            }
          }
        }
        catch {
          Write-Host "❌ Error obteniendo estadísticas: $_" -ForegroundColor Red
        }
      }
      'h' {
        Write-Host "🏥 Verificando estado del sistema..." -ForegroundColor Cyan
        try {
          $health = Invoke-RestMethod -Uri "http://localhost:8001/api/health" -TimeoutSec 5
          Write-Host "✅ Estado: $($health.status)" -ForegroundColor Green
          Write-Host "🗄️  Base de datos: $($health.database)" -ForegroundColor Green
          Write-Host "⚙️  Flujos: $($health.flows) ($($health.flows_count) flujos)" -ForegroundColor Green
        }
        catch {
          Write-Host "❌ Error en health check: $_" -ForegroundColor Red
        }
      }
      'l' {
        Write-Host "📋 Logs del backend (últimos):" -ForegroundColor Cyan
        try {
          $jobOutput = Receive-Job $backendJob -Keep | Select-Object -Last 10
          foreach ($line in $jobOutput) {
            Write-Host "   $line" -ForegroundColor White
          }
        }
        catch {
          Write-Host "❌ Error obteniendo logs" -ForegroundColor Red
        }
      }
      default {
        Write-Host "❓ Comando no reconocido. Usa: q, r, s, h, l" -ForegroundColor Yellow
      }
    }
  }

}
catch {
  Write-Host "❌ Error crítico: $_" -ForegroundColor Red
  Write-Host ""
  Write-Host "🔧 SOLUCIONES SUGERIDAS:" -ForegroundColor Yellow
  Write-Host "1. Verifica que el puerto 8000 y 8001 no estén en uso" -ForegroundColor White
  Write-Host "2. Ejecuta: .\configurar-seguridad.ps1" -ForegroundColor White
  Write-Host "3. Verifica la configuración en .env" -ForegroundColor White
  Write-Host "4. Instala dependencias: pip install -r requirements.txt" -ForegroundColor White
  Write-Host ""

  Stop-AllServices
  pause
}
finally {
  Stop-AllServices
}
