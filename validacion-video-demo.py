#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Validación Final - Video Demo CHAPI
Verifica que el video de YouTube esté correctamente integrado en el sitio web
"""

import os
import re
import sys
from datetime import datetime

def verificar_archivo_existe(ruta):
    """Verifica si un archivo existe"""
    return os.path.exists(ruta)

def buscar_video_en_archivo(ruta_archivo):
    """Busca la implementación del video en un archivo HTML"""
    try:
        with open(ruta_archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()

        # Buscar iframe de YouTube
        patron_iframe = r'<iframe[^>]*src="https://www\.youtube\.com/embed/[^"]*"[^>]*>'
        iframes_youtube = re.findall(patron_iframe, contenido, re.IGNORECASE | re.DOTALL)

        # Buscar URL específica del video
        video_id = "kxe0WOkGOvE"
        tiene_video_correcto = video_id in contenido

        # Buscar contenedor responsivo
        patron_responsivo = r'padding-bottom:\s*56\.25%'
        tiene_responsivo = re.search(patron_responsivo, contenido, re.IGNORECASE)

        return {
            'existe_iframe': len(iframes_youtube) > 0,
            'cantidad_iframes': len(iframes_youtube),
            'video_correcto': tiene_video_correcto,
            'es_responsivo': tiene_responsivo is not None,
            'iframes_encontrados': iframes_youtube
        }
    except Exception as e:
        return {'error': str(e)}

def main():
    print("🎬 VALIDACIÓN FINAL - VIDEO DEMO CHAPI")
    print("=" * 50)
    print(f"Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()

    # Archivos a verificar
    archivos_html = [
        ("index.html principal", "d:/chapi-website/index.html"),
        ("Deploy frontend", "d:/chapi-website/deploy/frontend/index.html"),
        ("Archivo de prueba", "d:/chapi-website/test-video-demo.html")
    ]

    resultados = {}

    for nombre, ruta in archivos_html:
        print(f"📁 Verificando: {nombre}")
        print(f"   Ruta: {ruta}")

        if verificar_archivo_existe(ruta):
            resultado = buscar_video_en_archivo(ruta)
            resultados[nombre] = resultado

            if 'error' in resultado:
                print(f"   ❌ Error: {resultado['error']}")
            else:
                print(f"   {'✅' if resultado['existe_iframe'] else '❌'} Iframe YouTube: {'Sí' if resultado['existe_iframe'] else 'No'}")
                print(f"   {'✅' if resultado['video_correcto'] else '❌'} Video correcto: {'Sí' if resultado['video_correcto'] else 'No'}")
                print(f"   {'✅' if resultado['es_responsivo'] else '❌'} Diseño responsivo: {'Sí' if resultado['es_responsivo'] else 'No'}")
                if resultado['cantidad_iframes'] > 0:
                    print(f"   📊 Cantidad de iframes: {resultado['cantidad_iframes']}")
        else:
            print(f"   ❌ Archivo no encontrado")
            resultados[nombre] = {'error': 'Archivo no existe'}

        print()

    # Resumen final
    print("📋 RESUMEN FINAL")
    print("-" * 30)

    archivos_ok = 0
    total_archivos = len([r for r in resultados.values() if 'error' not in r])

    for nombre, resultado in resultados.items():
        if 'error' not in resultado and resultado.get('existe_iframe') and resultado.get('video_correcto'):
            archivos_ok += 1
            print(f"✅ {nombre}: Video integrado correctamente")
        else:
            print(f"❌ {nombre}: Requiere revisión")

    print()
    print(f"Estado general: {archivos_ok}/{len(archivos_html)} archivos con video funcionando")

    if archivos_ok >= 2:  # Al menos index.html y deploy/frontend
        print("🎉 ¡VIDEO DEMO INTEGRADO EXITOSAMENTE!")
        print()
        print("Próximos pasos:")
        print("1. Abrir test-video-demo.html en el navegador para verificar")
        print("2. Subir archivos a Hostinger")
        print("3. Verificar que el video aparece en chapibot.pro")
    else:
        print("⚠️  Se requiere revisión adicional")

    # Verificar archivos de documentación
    print()
    print("📚 DOCUMENTACIÓN")
    print("-" * 20)

    docs = [
        "RESUMEN_DESPLIEGUE_COMPLETO.md",
        "VIDEO_DEMO_INTEGRATION.md"
    ]

    for doc in docs:
        ruta_doc = f"d:/chapi-website/{doc}"
        if verificar_archivo_existe(ruta_doc):
            print(f"✅ {doc}")
        else:
            print(f"❌ {doc} - No encontrado")

if __name__ == "__main__":
    main()
