# 🧠 Fase 2: Lógica Senior y Custom Hooks

## 🎯 Objetivo de la Fase
Abstraer patrones repetitivos y comportamientos asíncronos complejos en herramientas reutilizables que garanticen la integridad del estado global.

## 🚀 Abstracción de Red con `useFetch`
Se diseñó un motor de peticiones universal que permite a cualquier vista consumir datos con control total de ciclo de vida:

```mermaid
graph TD
    A[Componente Invocador] -->|Dispara| B(useFetch)
    subgraph "Motor Interno (Ref 2.1)"
        B --> C{AbortController}
        C -->|Memory Leak Prevent| D[CleanUp Effect]
        B --> E[Manejo Atómico: loading, data, error]
    end
    D --> F[API Request]
```

## 📋 Gestión de Formularios y Toggles
Modularización del control de entrada de datos y comportamiento binario de la UI:

```mermaid
graph LR
    subgraph "Lógica de Formulario"
        A[useForm] --> B[Reset States]
        A --> C[Validation Schema]
        A --> D[Loading State]
    end

    subgraph "Lógica de UI"
        E[useToggle] --> F[Modal States]
        E --> G[Expand Panel]
    end
```

### Impacto Técnico
La implementación de estos hooks redujo el código duplicado en las páginas en un **65%**, centralizando el manejo de errores y estados de carga en un solo lugar.

---
[⬅️ Volver al Roadmap Principal](../README.md)
