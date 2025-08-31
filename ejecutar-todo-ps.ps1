# 🚀 EJECUTOR AUTOMÁTICO POWERSHELL - CLAUDE CLI SETUP
param(
  [switch]$Verbose,
  [string]$LogFile = "installation-log-ps.txt"
)

function Write-Log {
  param($Message, $Color = "White")
  Write-Host $Message -ForegroundColor $Color
  "$((Get-Date).ToString('yyyy-MM-dd HH:mm:ss')) - $Message" | Add-Content $LogFile
}

Write-Log "============================================" "Blue"
Write-Log "🚀 EJECUTOR AUTOMÁTICO - CLAUDE CLI SETUP" "Blue"
Write-Log "============================================" "Blue"

Set-Location "d:\chapi-website"
Write-Log "📍 Directorio actual: $(Get-Location)" "Cyan"

# Inicializar log
"Instalación iniciada el $(Get-Date)" | Set-Content $LogFile

# 1. Verificar Node.js
Write-Log "`n1️⃣ Verificando Node.js..." "Green"
try {
  $nodeVersion = & node --version 2>&1
  if ($nodeVersion -and $nodeVersion -notlike "*not recognized*") {
    Write-Log "✅ Node.js: $nodeVersion" "Green"
  }
  else {
    Write-Log "❌ Node.js no encontrado" "Red"
    Write-Log "🔧 Instala Node.js desde: https://nodejs.org" "Yellow"
    Start-Process "https://nodejs.org"
    return
  }
}
catch {
  Write-Log "❌ Error verificando Node.js: $_" "Red"
  return
}

# 2. Verificar npm
Write-Log "`n2️⃣ Verificando npm..." "Green"
try {
  $npmVersion = & npm --version 2>&1
  if ($npmVersion -and $npmVersion -notlike "*not recognized*") {
    Write-Log "✅ npm: $npmVersion" "Green"
  }
  else {
    Write-Log "❌ npm no encontrado" "Red"
    return
  }
}
catch {
  Write-Log "❌ Error verificando npm: $_" "Red"
  return
}

# 3. Limpiar caché
Write-Log "`n3️⃣ Limpiando caché de npm..." "Green"
try {
  & npm cache clean --force 2>&1 | Add-Content $LogFile
  Write-Log "✅ Caché limpiado" "Green"
}
catch {
  Write-Log "⚠️ Error limpiando caché: $_" "Yellow"
}

# 4. Instalar dependencias
Write-Log "`n4️⃣ Instalando dependencias del proyecto..." "Green"
try {
  & npm install 2>&1 | Add-Content $LogFile
  Write-Log "✅ Dependencias instaladas" "Green"
}
catch {
  Write-Log "❌ Error instalando dependencias: $_" "Red"
}

# 5. Instalar Claude CLI globalmente
Write-Log "`n5️⃣ Instalando Claude CLI globalmente..." "Green"
try {
  & npm install -g @anthropic-ai/claude-cli 2>&1 | Add-Content $LogFile
  Write-Log "✅ Instalación global completada" "Green"
}
catch {
  Write-Log "⚠️ Error en instalación global: $_" "Yellow"
}

# 6. Verificar Claude CLI global
Write-Log "`n6️⃣ Verificando Claude CLI global..." "Green"
try {
  $claudeGlobal = & claude --version 2>$null
  if ($claudeGlobal -and $claudeGlobal -notlike "*not recognized*") {
    Write-Log "✅ Claude CLI global: $claudeGlobal" "Green"
    $claudeInstalled = $true
  }
}
catch {
  Write-Log "⚠️ Claude CLI global no disponible" "Yellow"
}

# 7. Instalar Claude CLI localmente si global falla
if (-not $claudeInstalled) {
  Write-Log "`n7️⃣ Instalando Claude CLI localmente..." "Green"
  try {
    & npm install @anthropic-ai/claude-cli --save-dev 2>&1 | Add-Content $LogFile
    Write-Log "✅ Instalación local completada" "Green"
  }
  catch {
    Write-Log "❌ Error en instalación local: $_" "Red"
  }
}

# 8. Verificar Claude CLI con npx
Write-Log "`n8️⃣ Verificando Claude CLI con npx..." "Green"
try {
  $claudeNpx = & npx claude --version 2>$null
  if ($claudeNpx -and $claudeNpx -notlike "*not recognized*" -and $claudeNpx -notlike "*error*") {
    Write-Log "✅ Claude CLI npx: $claudeNpx" "Green"
    $claudeInstalled = $true
  }
}
catch {
  Write-Log "⚠️ Claude CLI npx no disponible" "Yellow"
}

# 9. Verificar ejecución directa
if (-not $claudeInstalled) {
  Write-Log "`n9️⃣ Probando ejecución directa..." "Green"
  try {
    $claudeDirect = & npx @anthropic-ai/claude-cli --version 2>$null
    if ($claudeDirect -and $claudeDirect -notlike "*error*") {
      Write-Log "✅ Claude CLI directo: $claudeDirect" "Green"
      $claudeInstalled = $true
    }
  }
  catch {
    Write-Log "❌ Ejecución directa falló: $_" "Red"
  }
}

# Resultado final
Write-Log "`n============================================" "Blue"
if ($claudeInstalled) {
  Write-Log "🎉 CLAUDE CLI INSTALADO EXITOSAMENTE" "Green"
  Write-Log "============================================" "Blue"
  Write-Log "`n🚀 Comandos disponibles:" "Cyan"
  Write-Log "   claude --help" "White"
  Write-Log "   claude auth" "White"
  Write-Log "   claude chat" "White"
  Write-Log "`n📝 O usa con npx:" "Cyan"
  Write-Log "   npx claude --help" "White"
  Write-Log "   npx claude auth" "White"
  Write-Log "   npx claude chat" "White"
  Write-Log "`n🔧 Configuración siguiente:" "Blue"
  Write-Log "   Ejecuta: claude auth (o npx claude auth)" "Yellow"
  Write-Log "`n📝 Log guardado en: $LogFile" "Cyan"
}
else {
  Write-Log "❌ INSTALACIÓN FALLÓ" "Red"
  Write-Log "============================================" "Blue"
  Write-Log "`n🔧 Ejecuta como Administrador y reinicia PowerShell" "Yellow"
  Write-Log "📝 Revisa el log en: $LogFile" "Cyan"
}

Write-Log "`n✅ PROCESO COMPLETADO" "Green"
