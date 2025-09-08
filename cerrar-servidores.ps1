# 🛑 CERRAR TODOS LOS SERVIDORES
# Script para cerrar todos los procesos de live-server y node

Write-Host "🛑 CERRANDO TODOS LOS SERVIDORES..." -ForegroundColor Red
Write-Host "=====================================" -ForegroundColor Yellow

# Buscar y cerrar procesos de Node.js
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "📍 Encontrados $($nodeProcesses.Count) procesos de Node.js" -ForegroundColor Yellow
    foreach ($process in $nodeProcesses) {
        try {
            Stop-Process -Id $process.Id -Force
            Write-Host "✅ Cerrado proceso Node.js (PID: $($process.Id))" -ForegroundColor Green
        } catch {
            Write-Host "⚠️  No se pudo cerrar proceso PID: $($process.Id)" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "ℹ️  No se encontraron procesos de Node.js ejecutándose" -ForegroundColor Cyan
}

# Buscar procesos específicos de live-server
$liveServerProcesses = Get-Process | Where-Object { $_.ProcessName -like "*live-server*" -or $_.MainWindowTitle -like "*live-server*" }
if ($liveServerProcesses) {
    foreach ($process in $liveServerProcesses) {
        try {
            Stop-Process -Id $process.Id -Force
            Write-Host "✅ Cerrado live-server (PID: $($process.Id))" -ForegroundColor Green
        } catch {
            Write-Host "⚠️  No se pudo cerrar live-server PID: $($process.Id)" -ForegroundColor Yellow
        }
    }
}

# Verificar puertos específicos y liberar si están ocupados
$ports = @(3000, 3001, 3002, 3003, 8000, 8080)
foreach ($port in $ports) {
    try {
        $connections = netstat -ano | Select-String ":$port " | Select-String "LISTENING"
        if ($connections) {
            Write-Host "🔍 Puerto $port en uso, intentando liberar..." -ForegroundColor Yellow
            $pids = $connections | ForEach-Object { ($_ -split '\s+')[-1] } | Sort-Object -Unique
            foreach ($pid in $pids) {
                if ($pid -match '^\d+$') {
                    try {
                        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                        Write-Host "✅ Liberado puerto $port (PID: $pid)" -ForegroundColor Green
                    } catch {
                        Write-Host "⚠️  No se pudo liberar puerto $port" -ForegroundColor Yellow
                    }
                }
            }
        } else {
            Write-Host "✅ Puerto $port libre" -ForegroundColor Green
        }
    } catch {
        Write-Host "✅ Puerto $port verificado" -ForegroundColor Green
    }
}

Write-Host "`n✅ LIMPIEZA COMPLETADA" -ForegroundColor Green
Write-Host "Todos los servidores han sido cerrados" -ForegroundColor White
Write-Host "`n🚀 Ahora puedes ejecutar:" -ForegroundColor Cyan
Write-Host "npm run comercial" -ForegroundColor White
