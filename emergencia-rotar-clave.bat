@echo off
echo.
echo =======================================================
echo  🚨 EMERGENCIA: ROTACION DE CLAVE API COMPROMETIDA 🚨
echo =======================================================
echo.
echo ⚠️  Use este script cuando una clave API haya sido expuesta
echo.
echo 📋 PASOS PARA ROTACION SEGURA:
echo.
echo 1. REVOCAR inmediatamente la clave antigua:
echo    • Ve a: https://platform.openai.com/api-keys
echo    • Busca la clave comprometida
echo    • Haz clic en "Delete" o "Revoke"
echo.
echo 2. CREAR nueva clave:
echo    • En la misma página, "Create new secret key"
echo    • Dale un nombre descriptivo
echo    • Copia la nueva clave INMEDIATAMENTE
echo.
echo 3. CONFIGURAR nueva clave (automático):
echo    • Este script te ayudará a configurarla
echo.
echo.
set /p continuar="¿Ya revocó la clave antigua? (S/N): "
if /i "%continuar%" neq "S" (
    echo.
    echo ❌ Por favor revoque la clave antigua primero
    echo    Vaya a: https://platform.openai.com/api-keys
    echo.
    pause
    exit /b
)

echo.
echo 🔄 Iniciando configuración de nueva clave...
echo.
powershell -ExecutionPolicy Bypass -File "configurar-seguridad.ps1"

if %errorlevel% equ 0 (
    echo.
    echo ✅ ROTACION COMPLETADA EXITOSAMENTE
    echo ====================================
    echo.
    echo 📋 VERIFICACIONES FINALES:
    echo • Clave antigua: REVOCADA ✅
    echo • Clave nueva: CONFIGURADA ✅
    echo • Archivo .env: PROTEGIDO ✅
    echo.
    echo 🔍 PRUEBA EL SISTEMA:
    set /p probar="¿Desea probar el sistema ahora? (S/N): "
    if /i "!probar!" equ "S" (
        echo.
        echo 🚀 Iniciando servidor de prueba...
        start-comercial-simple.ps1
    )
) else (
    echo.
    echo ❌ ERROR EN LA CONFIGURACION
    echo.
    echo 🆘 ACCIONES MANUALES REQUERIDAS:
    echo 1. Verifique que PowerShell puede ejecutar scripts
    echo 2. Ejecute manualmente: .\configurar-seguridad.ps1
    echo 3. Verifique que el archivo .env se creó correctamente
    echo.
)

echo.
echo 📊 REPORTE DE SEGURIDAD:
echo • Fecha/Hora: %date% %time%
echo • Usuario: %username%
echo • Acción: Rotación de clave API
echo • Estado: %errorlevel%
echo.
pause
