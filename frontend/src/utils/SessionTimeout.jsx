import React, { useEffect } from 'react';
import { logoutUser } from './logout';

const SESSION_TIMEOUT = 3600000; // 1 hora en milisegundos

export const SessionTimeout = () => {
  useEffect(() => {
    let timeoutId = null;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetTimeout();
      } else {
        clearTimeout(timeoutId);
      }
    };

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logoutUser(); // Cerrar sesión después del período de inactividad
      }, SESSION_TIMEOUT);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null; // Este componente no renderiza nada, solo maneja el temporizador
};