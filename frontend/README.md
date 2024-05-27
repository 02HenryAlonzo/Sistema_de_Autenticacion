# Frontend del Sistema de Autenticación

Este directorio contiene el código del frontend para el sistema de autenticación, desarrollado con React y Tailwind CSS.

## Descripción

El frontend proporciona una interfaz de usuario intuitiva para el registro, inicio de sesión y gestión del perfil de usuarios. Utiliza React Query para la gestión eficiente de datos y React Router para la navegación entre rutas.

### Características

- **Interfaz de Usuario**: Diseño responsivo y amigable, siguiendo el diseño detallado proporcionado en Figma.
- **Autenticación**: 
  - Formularios para registro e inicio de sesión.
  - Manejo de tokens JWT para mantener la sesión activa.
- **Gestión del Perfil**: 
  - Visualización y actualización de la información del perfil del usuario.
  - Carga y visualización de imágenes de perfil.
- **Gestión de Estado**: 
  - Persistencia de datos con localStorage.
- **Solicitudes HTTP**: Manejo de solicitudes HTTP al backend utilizando Axios y React Query.
- **Enrutamiento**: Protección de rutas privadas y navegación entre diferentes páginas utilizando React Router.

## Estructura del Proyecto

- `src/components`: Componentes reutilizables de React.
- `src/Auth`: Componentes de registro y login.
- `src/Profile`: Componentes sobre el perfil del usuario.
- `src/pages`: Páginas principales de la aplicación.

## Imagenes

- `public`: imagenes del proyecto renderizado.

