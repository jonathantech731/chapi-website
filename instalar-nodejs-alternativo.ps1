# Script alternativo para instalar Node.js y Claude CLI
Write-Host "=== INSTALADOR ALTERNATIVO DE NODE.JS Y CLAUDE CLI ===" -ForegroundColor Green

# Crear directorio temporal
$tempDir = "$env:TEMP\nodejs-install"
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

try {
    # Descargar Node.js LTS
    Write-Host "Descargando Node.js LTS..." -ForegroundColor Cyan
    $nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    $nodeInstaller = "$tempDir\nodejs-installer.msi"

    Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller -UseBasicParsing

    # Instalar Node.js
    Write-Host "Instalando Node.js..." -ForegroundColor Yellow
    Start-Process msiexec.exe -ArgumentList "/i", $nodeInstaller, "/quiet", "/norestart" -Wait

    # Actualizar PATH
    Write-Host "Actualizando variables de entorno..." -ForegroundColor Cyan
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    # Esperar un momento para que se actualice
    Start-Sleep -Seconds 5

    # Verificar Node.js
    Write-Host "Verificando Node.js..." -ForegroundColor Cyan
    & "C:\Program Files\nodejs\node.exe" --version
    & "C:\Program Files\nodejs\npm.cmd" --version

    # Configurar npm para usar el registro correcto
    Write-Host "Configurando npm..." -ForegroundColor Cyan
    & "C:\Program Files\nodejs\npm.cmd" config set registry https://registry.npmjs.org/

    # Instalar Claude CLI
    Write-Host "Instalando Claude CLI..." -ForegroundColor Yellow
    & "C:\Program Files\nodejs\npm.cmd" install -g @anthropic-ai/claude-cli

    # Verificar Claude CLI
    Write-Host "Verificando Claude CLI..." -ForegroundColor Green
    & "C:\Program Files\nodejs\npx.cmd" claude --version

    Write-Host "=== INSTALACIÓN COMPLETADA EXITOSAMENTE ===" -ForegroundColor Green
    Write-Host "Para usar Claude CLI: npx claude [comando]" -ForegroundColor Yellow
    Write-Host "Para configurar: npx claude auth" -ForegroundColor Yellow

} catch {
    Write-Error "Error durante la instalación: $_"
} finally {
    # Limpiar archivos temporales
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}
