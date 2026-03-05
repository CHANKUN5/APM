# 🎣 Actividad 2: Custom Hooks Profesionales

## 🎯 Objetivo
Abstraer la lógica repetitiva y compleja en hooks genéricos de producción, mejorando la mantenibilidad, facilitando el testeo unitario y evitando fugas de memoria.

## 🚀 Hooks Implementados

### 📡 `useFetch`
Manejo robusto de peticiones asíncronas.
*   **Estados:** Loading, Data, Error.
*   **Limpieza:** Implementación de `AbortController` para cancelar peticiones al desmontar.
*   **Funcionalidad:** Permite ejecución automática o manual.

### 📋 `useForm`
Gestión centralizada de estados de formularios.
*   **Validación:** Soporte para lógica de validación externa.
*   **Envío:** Gestión del estado `isSubmitting`.
*   **Reseteo:** Función integrada para limpiar el formulario tras el éxito.

### 🔄 `useToggle`
Utilidad profesional para control de estados booleanos.
*   **Uso:** Modales, paneles expandibles y estados binarios simples.

## 📈 Impacto Arquitectónico
Al extraer esta lógica, los componentes de la interfaz se vuelven "tontos" (stateless), lo que reduce drásticamente la probabilidad de errores por efectos secundarios no controlados.

---
[⬅️ Volver al Home](../README.md)
