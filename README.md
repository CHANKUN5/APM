# APM Enterprise - Auditoría de Red 🚀

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide](https://img.shields.io/badge/lucide--react-black?style=for-the-badge&logo=lucide&logoColor=white)

Ecosistema de gestión de red de grado empresarial, diseñado bajo los más altos estándares de arquitectura profesional en React. Este proyecto documenta la evolución técnica a través de 3 sprints intensivos.

---

## 🏛️ Arquitectura Global del Sistema

El sistema utiliza un patrón de **Separación de Preocupaciones (SoC)** absoluto, dividiendo la aplicación en capas desacopladas que permiten un mantenimiento senior.

```mermaid
graph TD
    subgraph "Capa de Presentación (UI)"
        P[Pages] --> C[Atomic Components]
        C --> S[Skeletons & Modals]
    end

    subgraph "Capa de Lógica (Business)"
        P --> H[Custom Hooks]
        H --> F[useFetch / useForm]
    end

    subgraph "Capa de Datos (Infrastructure)"
        H --> AC[API Client]
        AC --> HC[HTTP Centralized Client]
        HC --> EXT[JSONPlaceholder / Enterprise API]
    end
```

---

## 📈 Roadmap de Desarrollo Profesional

Haz clic en cada fase para ver los **diagramas detallados** y la ingeniería aplicada en cada etapa:

1.  👉 **[Día 1: Refactorización y Estructura Core](./docs/FASE_1_ESTRUCTURA.md)**
    *Refactorización de monolito a arquitectura por capas.*
2.  👉 **[Día 2: Lógica Senior y Custom Hooks](./docs/FASE_2_LOGICA.md)**
    *Abstracción de patrones de red y formularios.*
3.  👉 **[Día 3: UI Premium e Integridad de API](./docs/FASE_3_PREMIUM.md)**
    *Diseño dinámico y sistema de simulación de errores.*

---

## 🚨 Gestión de Protocolos y Errores (Ingenieria de Red)

El sistema implementa una **Auditoría de Red Activa** que permite diagnosticar fallos mediante una consola de ingeniería integrada en el Sidebar.

### Matriz de Respuesta a Errores
| Código | Estado Técnico | Comportamiento del Sistema | Visual (Modal) |
| :--- | :--- | :--- | :--- |
| **200** | **SUCCESS** | Restaura flujos de datos inmediatamente. | **Esmeralda** |
| **401** | **AUTH FAIL** | Limpia caché local y notifica expiración de sesión. | **Violeta** |
| **404** | **NOT FOUND** | Renderiza "Empty State" específico del recurso. | **Azul** |
| **500** | **CORE FAIL** | Dispara protocolo de emergencia y limpia tablas. | **Rojo** |

### Flujo de Simulación de Errores
```mermaid
flowchart LR
    A[Panel Ingeniería Sidebar] -->|setSimulatedError| B(CustomEvent Global)
    B -->|apm:api_status| C{Hooks & App.jsx}
    C -->|Reactivo| D[Cerrar Modales Previos]
    C -->|Reactivo| E[Limpiar Datos de Tablas]
    C -->|Reactivo| F[Mostrar Feedback Visual Nuevo]
```

---
**Desarrollado para la Evaluación de Arquitectura React - APM v3.0 Premium**
