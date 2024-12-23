import React from 'react'

// variable de control. en una implementación real deberíamos usar un servicio de autenticación.
const CAN_ACCESS_INTERNAL = false

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!CAN_ACCESS_INTERNAL) {
    // muestra el fallback
    return <div>No estás autorizado para ver esta ruta</div>
  }

  return <>{children}</>
}
