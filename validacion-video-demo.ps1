# Validación Final - Video Demo CHAPI
# Verifica que el video de YouTube esté correctamente integrado

Write-Host "🎬 VALIDACIÓN FINAL - VIDEO DEMO CHAPI" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor White
Write-Host "Fecha: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host ""

# Archivos a verificar
$archivos = @(
  @{Nombre = "index.html principal"; Ruta = "d:\chapi-website\index.html" },
  @{Nombre = "Deploy frontend"; Ruta = "d:\chapi-website\deploy\frontend\index.html" },
  @{Nombre = "Archivo de prueba"; Ruta = "d:\chapi-website\test-video-demo.html" }
)

$videoID = "kxe0WOkGOvE"
$archivosOK = 0

foreach ($archivo in $archivos) {
  Write-Host "📁 Verificando: $($archivo.Nombre)" -ForegroundColor Yellow
  Write-Host "   Ruta: $($archivo.Ruta)" -ForegroundColor Gray

  if (Test-Path $archivo.Ruta) {
    $contenido = Get-Content $archivo.Ruta -Raw -Encoding UTF8

    # Verificar iframe de YouTube
    $tieneIframe = $contenido -match 'iframe.*youtube\.com/embed'
    $tieneVideoCorrect = $contenido -match $videoID
    $esResponsivo = $contenido -match 'padding-bottom:\s*56\.25%'

    if ($tieneIframe) {
      Write-Host "   ✅ Iframe YouTube: Sí" -ForegroundColor Green
    }
    else {
      Write-Host "   ❌ Iframe YouTube: No" -ForegroundColor Red
    }

    if ($tieneVideoCorrect) {
      Write-Host "   ✅ Video correcto: Sí" -ForegroundColor Green
    }
    else {
      Write-Host "   ❌ Video correcto: No" -ForegroundColor Red
    }

    if ($esResponsivo) {
      Write-Host "   ✅ Diseño responsivo: Sí" -ForegroundColor Green
    }
    else {
      Write-Host "   ❌ Diseño responsivo: No" -ForegroundColor Red
    }

    if ($tieneIframe -and $tieneVideoCorrect) {
      $archivosOK++
    }
  }
  else {
    Write-Host "   ❌ Archivo no encontrado" -ForegroundColor Red
  }
  Write-Host ""
}

# Resumen final
Write-Host "📋 RESUMEN FINAL" -ForegroundColor Cyan
Write-Host "-" * 30 -ForegroundColor White
Write-Host "Estado general: $archivosOK/$($archivos.Count) archivos con video funcionando" -ForegroundColor White

if ($archivosOK -ge 2) {
  Write-Host "🎉 ¡VIDEO DEMO INTEGRADO EXITOSAMENTE!" -ForegroundColor Green
  Write-Host ""
  Write-Host "Próximos pasos:" -ForegroundColor Yellow
  Write-Host "1. Abrir test-video-demo.html en el navegador para verificar" -ForegroundColor White
  Write-Host "2. Subir archivos a Hostinger" -ForegroundColor White
  Write-Host "3. Verificar que el video aparece en chapibot.pro" -ForegroundColor White
}
else {
  Write-Host "⚠️  Se requiere revisión adicional" -ForegroundColor Yellow
}

# Verificar archivos de documentación
Write-Host ""
Write-Host "📚 DOCUMENTACIÓN" -ForegroundColor Cyan
Write-Host "-" * 20 -ForegroundColor White

$docs = @("RESUMEN_DESPLIEGUE_COMPLETO.md", "VIDEO_DEMO_INTEGRATION.md")

foreach ($doc in $docs) {
  $rutaDoc = "d:\chapi-website\$doc"
  if (Test-Path $rutaDoc) {
    Write-Host "✅ $doc" -ForegroundColor Green
  }
  else {
    Write-Host "❌ $doc - No encontrado" -ForegroundColor Red
  }
}

Write-Host ""
Write-Host "Para probar el video, abre el archivo:" -ForegroundColor Yellow
Write-Host "d:\chapi-website\test-video-demo.html" -ForegroundColor Cyan
Write-Host "en tu navegador web." -ForegroundColor Yellow
