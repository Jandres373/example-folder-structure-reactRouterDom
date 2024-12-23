import React from 'react';

import { useLocation } from 'react-router-dom';
import { useGlobalStore } from '../../store/global.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = <div>Lo sentimos, no tienes acceso a esta ruta</div>,
}) => {
  const { isAuthenticated } = useGlobalStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Store the attempted URL for redirecting after login
    sessionStorage.setItem('redirectUrl', location.pathname);
    return fallback;
  }

  return <>{children}</>;
};
