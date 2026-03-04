# 📦 Actividad 1: Auditoría y Refactorización

## 🎯 Objetivo
Migrar el código monolítico e ilegible de `documentacion.md` hacia una arquitectura modular profesional, separando estrictamente las responsabilidades.

## 🛠️ Acciones Realizadas
1.  **Identificación de Lógica:** Se analizaron las funciones de API y lógica de estado mezcladas en el JSX.
2.  **Capa de Servicios:** Extracción de peticiones a `src/services/api.js`.
3.  **Hooks de Negocio:** Creación de `useDashboard` para orquestar los datos.
4.  **Atomización UI:** Creación de componentes reutilizables en `src/components/`.

## 📝 Auditoría de Arquitectura (Día 1)

### 1. ¿Por qué moviste esta lógica a un hook?
Movimos la lógica a custom hooks para **separar la lógica de negocio de la interfaz de usuario**. Esto permite que el código sea:
- **Reutilizable:** La misma lógica puede usarse en otros componentes.
- **Testeable:** Es más fácil testear funciones aisladas que componentes con lógica interna.
- **Limpio:** El JSX se mantiene enfocado solo en "cómo se ve" la aplicación.

### 2. ¿Qué pasa si mañana cambia la API?
Gracias a la centralización en `src/services/api.js`, solo tendríamos que modificar ese archivo. Los hooks y componentes no necesitan saber si los datos vienen de un `fetch`, de `axios` o de un archivo local.

### 3. ¿Dónde colocar las validaciones?
Las validaciones deben colocarse en los **custom hooks** o en archivos dentro de `src/utils/` si son genéricas. Nunca deben estar mezcladas directamente en el JSX.

### 4. ¿Por qué este componente no debería tener fetch directo?
Un componente con `fetch` directo está **acoplado** a una implementación de datos específica. Esto dificulta el mantenimiento, la reutilización y las pruebas unitarias.

---
[⬅️ Volver al Home](../README.md)
