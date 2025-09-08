@echo off
echo === INSTALADOR DE NODE.JS Y CLAUDE CLI ===

REM Verificar si Node.js ya está instalado
where node >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Node.js ya está instalado:
    node --version
    goto install_claude
)

echo Descargando Node.js...
REM Crear directorio temporal
mkdir %TEMP%\nodejs-install 2>nul

REM Descargar Node.js usando PowerShell
powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi' -OutFile '%TEMP%\nodejs-install\nodejs.msi'"

echo Instalando Node.js...
msiexec /i "%TEMP%\nodejs-install\nodejs.msi" /quiet /norestart

REM Esperar a que termine la instalación
timeout /t 10 /nobreak

REM Actualizar PATH para la sesión actual
set "PATH=%PATH%;C:\Program Files\nodejs"

:install_claude
echo Verificando Node.js...
"C:\Program Files\nodejs\node.exe" --version
"C:\Program Files\nodejs\npm.cmd" --version

echo Instalando Claude CLI...
"C:\Program Files\nodejs\npm.cmd" install -g @anthropic-ai/claude-cli

echo Verificando Claude CLI...
"C:\Program Files\nodejs\npx.cmd" claude --version

echo === INSTALACIÓN COMPLETADA ===
echo Para usar Claude CLI: npx claude [comando]
echo Para configurar: npx claude auth

REM Limpiar archivos temporales
rmdir /s /q "%TEMP%\nodejs-install" 2>nul

pause
