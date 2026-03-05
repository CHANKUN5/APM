# 🎣 Actividad 1.4: Desacoplamiento de Lógica de Negocio

## 🎯 Objetivo
Extraer la gestión de estados complejos de la capa de visualización.

## 🛠️ Acciones Realizadas
1.  **Primeros Custom Hooks:** Creación de `useDashboard` y `useProjectForm`.
2.  **Orquestación de Datos:** El hook se encarga de llamar al servicio, manejar el estado de carga y filtrar los resultados.
3.  **JSX Limpio:** `DashboardPage.jsx` ahora solo consume estados y funciones, sin saber cómo se calculan o de dónde vienen.

## 🧠 Resultado
Componentes de página delgados y enfocados exclusivamente en la composición visual.

---
[⬅️ Volver al Home](../README.md)
