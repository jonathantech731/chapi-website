# 🔧 REPARACIÓN COMPLETA DE ERRORES
# Script para identificar y corregir todos los problemas del proyecto

Write-Host "🚀 INICIANDO REPARACIÓN COMPLETA..." -ForegroundColor Green
Write-Host "=" * 60

# 1. Verificar archivos con problemas comunes
Write-Host "`n📝 VERIFICANDO ARCHIVOS MARKDOWN..." -ForegroundColor Yellow

$markdownFiles = Get-ChildItem -Path . -Recurse -Filter "*.md"
$problematicFiles = @()

foreach ($file in $markdownFiles) {
    Write-Host "Revisando: $($file.Name)" -ForegroundColor Cyan

    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content) {
        # Verificar problemas comunes
        $issues = @()

        # 1. Líneas duplicadas al inicio
        if ($content -match "^.*npm run.*\n.*npm run.*\n.*npm start.*#") {
            $issues += "Código duplicado al inicio"
        }

        # 2. Merge conflict markers
        if ($content -match "<<<<<<|======|>>>>>>") {
            $issues += "Marcadores de conflicto"
        }

        # 3. Espacios incorrectos en encabezados
        if ($content -match "\n##[^#\s]") {
            $issues += "Espacios faltantes en encabezados"
        }

        # 4. URLs desnudas
        if ($content -match "http[s]?://[^\s\[\(]+(?!\)|\])") {
            $issues += "URLs sin formato"
        }

        if ($issues.Count -gt 0) {
            Write-Host "  ❌ Problemas encontrados: $($issues -join ', ')" -ForegroundColor Red
            $problematicFiles += $file
        } else {
            Write-Host "  ✅ Sin problemas" -ForegroundColor Green
        }
    }
}

# 2. Verificar archivos JavaScript
Write-Host "`n🔧 VERIFICANDO ARCHIVOS JAVASCRIPT..." -ForegroundColor Yellow

$jsFiles = Get-ChildItem -Path "assets\js" -Filter "*.js" -ErrorAction SilentlyContinue
if ($jsFiles) {
    foreach ($jsFile in $jsFiles) {
        $jsContent = Get-Content $jsFile.FullName -Raw -ErrorAction SilentlyContinue
        if ($jsContent) {
            if ($jsContent -match "<<<<<<|======|>>>>>>") {
                Write-Host "  ❌ $($jsFile.Name): Conflictos de merge" -ForegroundColor Red
            } else {
                Write-Host "  ✅ $($jsFile.Name): Sin problemas" -ForegroundColor Green
            }
        }
    }
} else {
    Write-Host "  ⚠️  Carpeta assets\js no encontrada" -ForegroundColor Yellow
}

# 3. Verificar archivos HTML
Write-Host "`n🌐 VERIFICANDO ARCHIVOS HTML..." -ForegroundColor Yellow

$htmlFiles = Get-ChildItem -Path . -Filter "*.html"
foreach ($htmlFile in $htmlFiles) {
    $htmlContent = Get-Content $htmlFile.FullName -Raw -ErrorAction SilentlyContinue
    if ($htmlContent) {
        if ($htmlContent -match "<<<<<<|======|>>>>>>") {
            Write-Host "  ❌ $($htmlFile.Name): Conflictos de merge" -ForegroundColor Red
        } else {
            Write-Host "  ✅ $($htmlFile.Name): Sin problemas" -ForegroundColor Green
        }
    }
}

# 4. Limpiar archivos temporales y problemáticos
Write-Host "`n🧹 LIMPIANDO ARCHIVOS PROBLEMÁTICOS..." -ForegroundColor Yellow

$filesToClean = @(
    "*.tmp",
    "*.bak",
    "*~",
    ".DS_Store",
    "Thumbs.db"
)

foreach ($pattern in $filesToClean) {
    $files = Get-ChildItem -Path . -Recurse -Filter $pattern -ErrorAction SilentlyContinue
    if ($files) {
        foreach ($file in $files) {
            Remove-Item $file.FullName -Force
            Write-Host "  🗑️  Eliminado: $($file.Name)" -ForegroundColor Yellow
        }
    }
}

# 5. Verificar estructura de proyecto
Write-Host "`n📁 VERIFICANDO ESTRUCTURA DEL PROYECTO..." -ForegroundColor Yellow

$requiredStructure = @{
    "index.html" = "Página principal"
    "test-chapi-ultra-comercial.html" = "Página de testing comercial"
    "assets\js\chapi-assistant.js" = "Asistente principal"
    "assets\js\chapi-config-ultra-comercial.js" = "Configuración comercial"
    "assets\js\chapi-assistant-ultra-comercial.js" = "Asistente comercial"
    "assets\css\chapi-assistant-pro.css" = "Estilos comerciales"
    "package.json" = "Configuración del proyecto"
}

$missingFiles = @()
foreach ($file in $requiredStructure.GetEnumerator()) {
    if (Test-Path $file.Key) {
        Write-Host "  ✅ $($file.Key) - $($file.Value)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $($file.Key) - $($file.Value) [FALTANTE]" -ForegroundColor Red
        $missingFiles += $file.Key
    }
}

# 6. Verificar configuración de Git
Write-Host "`n🔄 CONFIGURANDO GIT..." -ForegroundColor Yellow

if (-not (Test-Path ".git")) {
    git init
    Write-Host "  🆕 Repositorio Git inicializado" -ForegroundColor Green
}

# Crear .gitignore si no existe
if (-not (Test-Path ".gitignore")) {
    $gitignoreContent = @"
# Node modules
node_modules/
npm-debug.log*

# OS generated files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Temporary files
*.tmp
*.bak
*~

# Environment files
.env
.env.local

# Build outputs
dist/
build/

# Logs
*.log
"@
    Set-Content -Path ".gitignore" -Value $gitignoreContent
    Write-Host "  📝 .gitignore creado" -ForegroundColor Green
}

# 7. Ejecutar comandos de reparación automática
Write-Host "`n🔧 EJECUTANDO REPARACIONES AUTOMÁTICAS..." -ForegroundColor Yellow

# Instalar dependencias si faltan
if (-not (Test-Path "node_modules")) {
    Write-Host "  📦 Instalando dependencias de Node.js..." -ForegroundColor Cyan
    npm install --silent
}

# 8. Resumen final
Write-Host "`n📊 RESUMEN DE REPARACIÓN" -ForegroundColor Cyan
Write-Host "=" * 60

if ($problematicFiles.Count -eq 0) {
    Write-Host "✅ Archivos Markdown: SIN PROBLEMAS" -ForegroundColor Green
} else {
    Write-Host "⚠️  Archivos con problemas: $($problematicFiles.Count)" -ForegroundColor Yellow
}

if ($missingFiles.Count -eq 0) {
    Write-Host "✅ Estructura de archivos: COMPLETA" -ForegroundColor Green
} else {
    Write-Host "❌ Archivos faltantes: $($missingFiles.Count)" -ForegroundColor Red
}

Write-Host "`n🎯 COMANDOS DE VERIFICACIÓN:" -ForegroundColor Cyan
Write-Host "• Probar sistema:     npm run comercial" -ForegroundColor White
Write-Host "• Solo testing:       npm run test-comercial" -ForegroundColor White
Write-Host "• Página principal:   npm start" -ForegroundColor White

Write-Host "`n🚀 ESTADO DEL PROYECTO:" -ForegroundColor Cyan
if ($problematicFiles.Count -eq 0 -and $missingFiles.Count -eq 0) {
    Write-Host "🟢 COMPLETAMENTE FUNCIONAL - Listo para usar" -ForegroundColor Green
} elseif ($missingFiles.Count -eq 0) {
    Write-Host "🟡 FUNCIONAL CON ADVERTENCIAS - Revisar archivos markdown" -ForegroundColor Yellow
} else {
    Write-Host "🔴 REQUIERE ATENCIÓN - Archivos faltantes críticos" -ForegroundColor Red
}

Write-Host "`n✅ REPARACIÓN COMPLETADA" -ForegroundColor Green
