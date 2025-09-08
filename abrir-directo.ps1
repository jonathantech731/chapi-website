# 🚀 CHAPI DIRECTO - Abrir página sin servidor
# Abre directamente tu página principal en el navegador

Write-Host "🚀 ABRIENDO TU PÁGINA PRINCIPAL..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Yellow

# Verificar que el archivo existe
if (Test-Path "index.html") {
  $fullPath = (Get-Item "index.html").FullName
  Write-Host "✅ Archivo encontrado: $fullPath" -ForegroundColor Green

  # Abrir en el navegador predeterminado
  Write-Host "🌐 Abriendo en el navegador..." -ForegroundColor Cyan
  Start-Process $fullPath

  Write-Host "`n✅ Tu página ha sido abierta" -ForegroundColor Green
  Write-Host "📄 Archivo: index.html" -ForegroundColor White
  Write-Host "🎯 Título: CHAPI · Chatbots Inteligentes" -ForegroundColor White
}
else {
  Write-Host "❌ Error: index.html no encontrado" -ForegroundColor Red
  Write-Host "📁 Directorio actual: $PWD" -ForegroundColor Yellow

  # Listar archivos HTML disponibles
  Write-Host "`n📋 Archivos HTML disponibles:" -ForegroundColor Cyan
  Get-ChildItem -Filter "*.html" | ForEach-Object {
    Write-Host "  • $($_.Name)" -ForegroundColor White
  }
}

Write-Host "`nPresiona cualquier tecla para salir..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
