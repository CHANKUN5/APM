# 🔍 Auditoría de Calidad: Día 1

### 1. ¿Por qué moviste esta lógica a un hook?
Para separar la **lógica de negocio** de la **interfaz de usuario**. Esto hace que el código sea reutilizable, más fácil de testear y mantiene el JSX limpio.

### 2. ¿Qué pasa si mañana cambia la API?
Solo modificamos `src/services/api.js`. El resto de la aplicación (componentes y hooks) no se entera del cambio, ya que consumen interfaces estandarizadas.

### 3. ¿Dónde colocar las validaciones?
En los **custom hooks** (como `useProjectForm`) o en `utils` si son genéricas. Nunca en el JSX, para evitar que la UI sea responsable de reglas de negocio.

### 4. ¿Por qué este componente no debería tener fetch directo?
Porque se acopla a una implementación específica. Un componente "puro" debe recibir datos o llamar a un hook, permitiendo que sea testeable sin necesidad de simular red en cada prueba de UI.

---
[⬅️ Volver al Home](../README.md)
