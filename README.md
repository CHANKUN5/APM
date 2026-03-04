# 🏢 APM Enterprise: Dashboard Management System

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/TR/CSS/)

## 📝 Resumen del Proyecto
Este es un sistema de gestión empresarial diseñado para **APM Enterprise**, enfocado en la administración eficiente de proyectos y métricas de rendimiento (KPIs). El sistema utiliza una **Arquitectura Profesional** de capas, garantizando escalabilidad y mantenimiento preventivo.

---

## 📈 Bitácora de Desarrollo: Día 1 — React Arquitectura Profesional

A continuación, se detallan las actividades del Día 1. Haz clic en cada una para ver el informe detallado y la auditoría correspondiente:

### 🗂️ Índice de Actividades
1.  **[📦 Actividad 1: Auditoría y Refactorización](./docs/ACTIVIDAD_1.md)**
    *   Migración de monolito a estructura modular.
    *   Auditoría de responsabilidades.
2.  **[🎣 Actividad 2: Custom Hooks Profesionales](./docs/ACTIVIDAD_2.md)**
    *   Abstracción de lógica con `useFetch`, `useForm` y `useToggle`.
    *   Auditoría de estados y efectos.
3.  **[📡 Actividad 3: Integración con API Profesional](./docs/ACTIVIDAD_3.md)**
    *   Cliente HTTP centralizado y Servidor Mock.
    *   Manejo de estados de carga y errores HTTP.
4.  **[🤝 Actividad 4: Pair Programming & Refactor Final](./docs/ACTIVIDAD_4.md)**
    *   Auditoría de calidad ("Navigator").
    *   Desacoplamiento total y optimización.

---

## 🏗️ Mapa de Arquitectura y Flujo

### Proceso de Refactorización
```mermaid
graph TD
    A[1. Análisis Monolito] -->|Extracción| B[2. Capa de Servicios]
    B -->|Encapsulamiento| C[3. Custom Hooks]
    C -->|Atomización| D[4. Componentes UI]
    D -->|Optimización| E[5. Auditoría Final]
```

### Tabla de Responsabilidades
| Capa | Ubicación | Responsabilidad |
| :--- | :--- | :--- |
| **UI** | `src/components/` | Solo presentación y estilos puros. |
| **Logic** | `src/hooks/` | Gestión de estado y reglas de negocio. |
| **Services** | `src/services/` | Comunicación con API y manejo de datos. |
| **Utils** | `src/utils/` | Funciones auxiliares genéricas. |

### Diagrama de Flujo de Datos
```mermaid
graph LR
    View[DashboardPage] --> Hook[Custom Hooks]
    Hook --> Client[HTTP Client]
    Client --> Mock[Mock Server]
    Mock --> Response[API Response]
```

---

*Proyecto desarrollado como parte del curso React Profesional para APM Enterprise.*
