# 🧪 Auditoría de Lógica: Día 2

### 1. ¿Qué problema resuelve un custom hook?
La duplicación de lógica de estado y efectos. Permiten extraer comportamientos complejos para que los componentes se enfoquen solo en el renderizado.

### 2. ¿Cuándo NO se debe usar un hook?
Cuando la lógica es puramente algorítmica y no depende del ciclo de vida de React. En esos casos, debe ser un helper en `utils`. Tampoco para lógica extremadamente simple que no se va a reutilizar.

### 3. ¿Qué pasa si el hook depende de props cambiantes?
Debemos incluir esas props en el arreglo de dependencias de los hooks internos (`useEffect`, `useCallback`, etc.) para asegurar que el estado del hook se mantenga sincronizado.

### 4. ¿Dónde está el riesgo de memory leak?
En efectos secundarios que no se limpian al desmontar el componente (peticiones API, timers, listeners). Por eso usamos `AbortController` en `useFetch`.

---
[⬅️ Volver al Home](../README.md)
