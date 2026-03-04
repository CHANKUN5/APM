# 🎣 Actividad 2: Custom Hooks Profesionales

## 🎯 Objetivo
Abstraer la lógica repetitiva y compleja en hooks genéricos de producción, mejorando la mantenibilidad y evitando fugas de memoria.

## 🚀 Hooks Implementados
*   **`useFetch`:** Manejo robusto de peticiones asíncronas con estados de carga, error y cancelación mediante `AbortController`.
*   **`useForm`:** Gestión centralizada de estados de formularios, validaciones y envío.
*   **`useToggle`:** Utilidad simple para cambios booleanos.

## 🧪 Auditoría de Lógica (Día 1)

### 1. ¿Qué problema resuelve un custom hook?
Resuelven la **duplicación de lógica de estado y efectos**. Permiten extraer la lógica compleja de los componentes para que estos se enfoquen solo en la interfaz de usuario.

### 2. ¿Cuándo NO se debe usar un hook?
No se deben usar cuando la lógica es puramente algorítmica y no depende del ciclo de vida de React. En esos casos, debe ser un helper en `src/utils/`.

### 3. ¿Qué pasa si el hook depende de props cambiantes?
El hook debe incluir esas props en los arreglos de dependencias (`useEffect`, `useCallback`) para mantenerse sincronizado con el estado externo.

### 4. ¿Dónde está el riesgo de memory leak?
El riesgo principal está en los efectos secundarios asíncronos que no se limpian al desmontar el componente. Usamos `AbortController` para mitigar esto.

---
[⬅️ Volver al Home](../README.md)
