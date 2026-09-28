# Vue 3 Product Catalog & Management Dashboard

Panel de administración y catálogo de productos reactivo desarrollado con **Vue 3 (Composition API)**, **Pinia**, **Vue Router 4** y **Tailwind CSS**, construido sobre **Vite**.

## Características Implementadas

- **Vue 3 SFC (`<script setup>`)**: Uso estricto de la Composition API moderna con macros del compilador (`defineProps`, `defineEmits`).
- **Gestión de Estado Global (Pinia)**: Store centralizado bajo sintaxis Setup Store, computeds como getters y sincronización reactiva profunda con `localStorage`.
- **Enrutamiento SPA (Vue Router 4)**: Rutas dinámicas por ID (`/producto/:id`), navegación declarativa y fallback asíncrono con estrategia Cache-First.
- **Componentes & Teleport**: Modal desacoplado inyectado directamente al `<body>` usando `<Teleport>`, formularios con `reactive` y modificadores de eventos (`@submit.prevent`).
- **Arquitectura de Composables**: Extracción de lógica reutilizable con `watch` reactivo (`useDebounce`).
- **Estilos con Tailwind CSS**: Interfaz moderna en modo oscuro, responsive y optimizada para dashboards.

## Stack Tecnológico

- **Framework**: Vue 3.5+
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Estilos**: Tailwind CSS
- **HTTP Client**: Axios
- **API Mock**: DummyJSON REST API

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Generar build de producción
npm run build