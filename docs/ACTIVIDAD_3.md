# 📡 Actividad 3: Integración con API Profesional

## 🎯 Objetivo
Establecer un sistema de comunicación robusto y escalable utilizando un cliente HTTP centralizado y un servidor mock para desarrollo.

## 🛠️ Infraestructura de Red
1.  **`httpClient.js`:** Un wrapper de `fetch` que añade seguridad, gestión de cabeceras y estandarización de respuestas.
2.  **`mockServer.js`:** Implementación de un interceptor de red que simula un backend real con latencia y errores aleatorios.
3.  **Gestión de Estados:** Implementación de estados de "Carga", "Error (401, 404, 500)" y "Lista Vacía" en la UI.

## 📊 Tabla de Respuestas API
| Código | Estado | Acción en UI |
| :--- | :--- | :--- |
| **200/201** | Success | Renderizado de datos y notificaciones positivas. |
| **401** | Unauthorized | Redirección o bloqueo de acceso (pide token). |
| **404** | Not Found | Mensaje visual de "No encontrado". |
| **500** | Server Error | Pantalla de error con opción de reintento. |

---
[⬅️ Volver al Home](../README.md)
