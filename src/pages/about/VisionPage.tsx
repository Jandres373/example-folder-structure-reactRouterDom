import React from 'react'

/**
 * Componente de Página de Visión
 * @description Muestra la declaración de visión de la empresa
 * @returns {React.ReactElement} Página de Visión renderizada con detalles de la misión
 */
const VisionPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Nuestra Visión</h1>
      <p className="text-gray-700">
        Ser una empresa líder en innovación y excelencia, comprometida con el desarrollo sostenible y el crecimiento de nuestros colaboradores y clientes.
      </p>
    </div>
  )
}

export default VisionPage
