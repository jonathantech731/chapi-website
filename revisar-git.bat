@echo off
echo 🔍 REVISIÓN DE GIT - CHAPI Assistant
echo =====================================
echo.

echo 📁 Verificando si es repositorio Git...
if exist .git (
    echo ✅ Es un repositorio Git
) else (
    echo ❌ No es un repositorio Git
    pause
    exit /b 1
)

echo.
echo 📊 Estado del repositorio:
git status

echo.
echo 📋 Últimos commits:
git log --oneline -5

echo.
echo 📂 Archivos en staging:
git diff --name-only --cached

echo.
echo 📝 Archivos modificados:
git diff --name-only

echo.
echo 🌿 Ramas disponibles:
git branch -a

echo.
echo 📍 Commit actual:
git log -1 --pretty=format:"Commit: %%h%%nAutor: %%an%%nFecha: %%ad%%nMensaje: %%s" --date=short

echo.
echo 🔄 Archivos sin seguimiento:
git ls-files --others --exclude-standard

echo.
echo ✅ Revisión completa
pause
