# MEV Client

Aplicacion frontend de la Mesa de Entradas Virtual (MEV), construida con Vite, React, Ant Design y TypeScript.

---

## Requisitos previos

- Node.js >= 18 (recomendado >= 20)
- npm
- El backend (`mev-server`) en ejecucion con la base de datos inicializada

---

## Instalacion

Clonar el repositorio e instalar las dependencias:

```bash
git clone <url-del-repositorio>
cd mev-client
npm install
```

---

## Configuracion

El cliente se comunica con la API del backend mediante la URL definida en `src/config/config.ts`:

```typescript
export default {
  appTitle: "Mesa de Entradas Virtual",
  baseUrl: `/mev-client`,
  serverUrl: "http://localhost:9101",
};
```

Asegurate de que `serverUrl` coincida con el puerto en el que corre el backend. Por defecto el servidor usa el puerto **9101**.

---

## Ejecutar en modo desarrollo

### 1. Levantar el backend

En el repositorio `mev-server`:

```bash
npm install
npm run db:seed    # Solo la primera vez, o para regenerar datos
npm run dev
```

El backend debe quedar disponible en `http://localhost:9101`.

### 2. Levantar el frontend

En este repositorio (`mev-client`):

```bash
npm run dev
```

La aplicacion queda disponible en:

```
http://localhost:9001/mev-client
```

---

## Scripts disponibles

| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con Vite |
| `npm run build` | Compila TypeScript y genera el build de produccion |
| `npm run preview` | Previsualiza el build de produccion localmente |
| `npm run lint` | Ejecuta ESLint sobre el codigo fuente |

---

## Tecnologias principales

- **Vite** -- Bundler y servidor de desarrollo
- **React** -- Biblioteca de interfaz de usuario
- **Ant Design** -- Componentes UI
- **TypeScript** -- Tipado estatico
- **React Query** -- Gestion de estado del servidor
- **React Router** -- Enrutamiento
- **Tailwind CSS** -- Estilos utilitarios

---

## Estructura del proyecto

```
mev-client/
├── src/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── modules/
│   ├── pages/
│   ├── styles/
│   ├── assets/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Build de produccion

Generar los archivos estaticos:

```bash
npm run build
```

Los artefactos se generan en la carpeta `dist/`. Para previsualizarlos localmente:

```bash
npm run preview
```

---

## Solucion de problemas

| Problema | Posible causa | Solucion |
|----------|---------------|----------|
| La app no carga datos | El backend no esta corriendo | Ejecutar `npm run dev` en `mev-server` |
| Error de conexion a la API | Puerto incorrecto en `serverUrl` | Verificar que apunte a `http://localhost:9101` |
| Listas vacias | Base de datos sin datos | Ejecutar `npm run db:seed` en `mev-server` |
| Pagina en blanco | URL incorrecta | Acceder a `http://localhost:9001/mev-client` (incluye el prefijo `/mev-client`) |
