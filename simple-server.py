#!/usr/bin/env python3
"""
Servidor HTTP simple para desarrollo de CHAPI Assistant
Alternativa a live-server cuando hay problemas con Node.js
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from threading import Timer

def start_server():
    PORT = 3000

    # Cambiar al directorio del proyecto
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    Handler = http.server.SimpleHTTPRequestHandler

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"🚀 CHAPI Assistant servidor iniciado en http://localhost:{PORT}")
            print(f"📁 Sirviendo archivos desde: {os.getcwd()}")
            print("✨ El navegador se abrirá automáticamente en 2 segundos...")
            print("\n👀 Archivos disponibles:")
            print(f"   • http://localhost:{PORT}/index.html (Sitio principal)")
            print(f"   • http://localhost:{PORT}/test-assistant.html (Test básico)")
            print(f"   • http://localhost:{PORT}/test-chapi-pro.html (Test PRO)")
            print("\n🛑 Para detener el servidor: Ctrl+C")
            print("=" * 60)

            # Abrir navegador automáticamente
            Timer(2.0, lambda: webbrowser.open(f'http://localhost:{PORT}/index.html')).start()

            httpd.serve_forever()

    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Error: El puerto {PORT} ya está en uso")
            print("💡 Soluciones:")
            print("   1. Cierra otras aplicaciones que usen el puerto 3000")
            print("   2. Edita este archivo y cambia PORT = 3001")
            print("   3. Usa: netstat -ano | findstr :3000 para encontrar el proceso")
        else:
            print(f"❌ Error del servidor: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Servidor detenido por el usuario")
        print("✅ ¡Gracias por usar CHAPI Assistant!")

if __name__ == "__main__":
    start_server()
