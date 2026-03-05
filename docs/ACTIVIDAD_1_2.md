# 📡 Actividad 1.2: Aislamiento de Servicios (API)

## 🎯 Objetivo
Desacoplar la comunicación con el backend de la interfaz de usuario.

## 🛠️ Acciones Realizadas
1.  **Encapsulamiento:** Creación de `src/services/api.js`.
2.  **Abstracción de Fetch:** Las funciones `apiGetDashboard`, `apiCreateProject` y `apiToggleProjectStatus` ahora manejan la lógica de red.
3.  **Preparación para Producción:** El sistema ya no depende de dónde vienen los datos, permitiendo cambiar de un mock a un servidor real solo modificando un archivo.

## 🚀 Resultado
Un sistema de comunicación centralizado, testeable y robusto.

---
[⬅️ Volver al Home](../README.md)
