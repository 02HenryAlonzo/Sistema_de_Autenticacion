export const logoutUser = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
  
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login';
  };