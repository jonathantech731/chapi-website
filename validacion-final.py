#!/usr/bin/env python3
"""
🔧 Script de validación rápida para CHAPI Assistant
Verifica que todos los archivos estén listos para despliegue
"""

import os
import json
import requests
import time
from pathlib import Path

def check_file_exists(path, description):
    """Verifica si un archivo existe"""
    if os.path.exists(path):
        print(f"✅ {description}: {path}")
        return True
    else:
        print(f"❌ {description}: {path} - NO ENCONTRADO")
        return False

def check_frontend_files():
    """Verifica archivos del frontend"""
    print("\n🌐 VERIFICANDO FRONTEND:")
    frontend_path = "deploy/frontend"

    files_to_check = [
        (f"{frontend_path}/index.html", "Página principal"),
        (f"{frontend_path}/assets/css/chapi-assistant-pro.css", "Estilos CSS"),
        (f"{frontend_path}/assets/js/chapi-assistant.js", "Widget JavaScript"),
        (f"{frontend_path}/assets/js/chapi-config.js", "Configuración JS")
    ]

    all_ok = True
    for file_path, description in files_to_check:
        if not check_file_exists(file_path, description):
            all_ok = False

    return all_ok

def check_backend_files():
    """Verifica archivos del backend"""
    print("\n⚙️ VERIFICANDO BACKEND:")
    backend_path = "deploy/backend"

    files_to_check = [
        (f"{backend_path}/production_server.py", "Servidor Python"),
        (f"{backend_path}/requirements.txt", "Dependencias"),
        (f"{backend_path}/Procfile", "Configuración deployment"),
        (f"{backend_path}/runtime.txt", "Runtime Python"),
        (f"{backend_path}/.env", "Variables de entorno")
    ]

    all_ok = True
    for file_path, description in files_to_check:
        if not check_file_exists(file_path, description):
            all_ok = False

    return all_ok

def test_local_server():
    """Prueba el servidor local brevemente"""
    print("\n🚀 PROBANDO SERVIDOR LOCAL:")

    try:
        # Cambiar al directorio del backend
        os.chdir("deploy/backend")

        print("Iniciando servidor en modo prueba...")
        import subprocess

        # Iniciar servidor en background
        process = subprocess.Popen([
            "python", "production_server.py"
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Esperar un poco para que arranque
        time.sleep(3)

        # Probar endpoint de health
        try:
            response = requests.get("http://localhost:8000/health", timeout=5)
            if response.status_code == 200:
                print("✅ Servidor responde correctamente")
                print(f"📊 Status: {response.json().get('status', 'unknown')}")
                return True
            else:
                print(f"❌ Servidor responde con error: {response.status_code}")
                return False
        except requests.RequestException as e:
            print(f"❌ Error conectando al servidor: {e}")
            return False
        finally:
            # Terminar el proceso
            process.terminate()
            process.wait()

    except Exception as e:
        print(f"❌ Error iniciando servidor: {e}")
        return False
    finally:
        # Volver al directorio original
        os.chdir("../..")

def main():
    """Función principal de validación"""
    print("🤖 CHAPI Assistant - Validación de Despliegue")
    print("=" * 50)

    frontend_ok = check_frontend_files()
    backend_ok = check_backend_files()

    print("\n📋 RESUMEN:")
    if frontend_ok and backend_ok:
        print("✅ Todos los archivos están listos")
        print("\n🚀 PRÓXIMOS PASOS:")
        print("1. Subir contenido de deploy/frontend/ a Hostinger")
        print("2. Subir contenido de deploy/backend/ a Railway")
        print("3. Configurar DNS para api.chapibot.pro")
        print("4. Verificar que todo funcione en producción")

        # Opcionalmente probar servidor local
        print("\n🔧 ¿Quieres probar el servidor localmente? (opcional)")
        test_local = input("Presiona Enter para omitir, o 'y' para probar: ").lower()
        if test_local == 'y':
            server_ok = test_local_server()
            if server_ok:
                print("✅ Servidor local funcionando correctamente")
            else:
                print("⚠️ Servidor local con problemas, pero puede funcionar en producción")

    else:
        print("❌ Faltan archivos importantes")
        print("⚠️ Ejecuta deploy.bat para regenerar los archivos")

if __name__ == "__main__":
    main()
