# Backend del Sistema de Autenticación

Este directorio contiene el código del backend para el sistema de autenticación, desarrollado con Node.js, Express y MySQL.

## Descripción

El backend proporciona una API RESTful para manejar el registro, inicio de sesión y gestión del perfil de usuarios. Implementa medidas de seguridad robustas, como el cifrado de contraseñas y la autenticación mediante JWT.

### Características

- **Registro de Usuarios**: Endpoint para registrar nuevos usuarios con validación de correo electrónico y contraseñas seguras.
- **Inicio de Sesión**: Endpoint para autenticar usuarios y generar tokens JWT.
- **Gestión de Perfil**: Endpoints para obtener y actualizar la información del perfil del usuario.
- **Seguridad**: 
  - Cifrado de contraseñas usando bcrypt.
  - Autenticación de usuarios con JWT.
  - Middleware para proteger rutas privadas.
- **Documentación**: Documentación de la API disponible en `/api-docs` utilizando Swagger.

### Rutas Principales

- `POST /register`: Registra un nuevo usuario.
- `POST /login`: Inicia sesión y devuelve un token JWT.
- `GET /profile`: Obtiene la información del perfil del usuario autenticado.
- `PUT /profile`: Actualiza la información del perfil del usuario autenticado.

## Documentos

- `public`: archivos importantes como base de datos importada, imagen swagger y diagrama Entidad-Relación (ERD) que represente la estructura de la base de datos.

