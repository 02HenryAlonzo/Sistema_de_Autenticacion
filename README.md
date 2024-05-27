# Sistema de Autenticación Full Stack

Este proyecto es un sistema de autenticación completo que permite a los usuarios registrarse, iniciar sesión y acceder de manera segura a su perfil. La solución incluye un backend desarrollado con Node.js y Express, y un frontend construido con React y Tailwind CSS. 

## Características Principales

- **Registro de Usuarios**: Los usuarios pueden crear cuentas proporcionando un correo válido y una contraseña segura.
- **Inicio de Sesión**: Los usuarios registrados pueden iniciar sesión utilizando su correo y contraseña.
- **Seguridad de Contraseñas**: Las contraseñas se cifran utilizando bcrypt antes de almacenarse en la base de datos.
- **Tokens JWT**: Utiliza JSON Web Tokens (JWT) para autenticar las solicitudes del usuario y mantener su sesión activa de manera segura.
- **Integración con Base de Datos**: Utiliza MySQL para almacenar la información de los usuarios y sus credenciales.
- **Interfaz de Usuario Intuitiva**: El frontend está diseñado para ser amigable y fácil de usar, siguiendo un diseño detallado proporcionado en Figma.
- **Gestión de Estado**: localStorage para la persistencia de la información.
- **Seguridad de Rutas**: Utiliza React Router para proteger las rutas privadas en el frontend y middleware en Express para proteger las rutas del backend.
- **Manejo de Errores**: Proporciona retroalimentación clara al usuario en caso de problemas durante el proceso de autenticación.

## Estructura del Proyecto

- **Backend**: Node.js, Express, MySQL, bcrypt, JWT.
- **Frontend**: React, Tailwind CSS, Axios, React Query, React Router.

Para más detalles específicos sobre cada parte del proyecto, consulta los README en las carpetas `Backend` y `Frontend`.
