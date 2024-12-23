import React from 'react';

/**
 * Componente de Página de Misión
 * @description Muestra la declaración de misión de la empresa
 * @returns {React.ReactElement} Página de Misión renderizada con detalles de la misión
 */
const MisionPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Nuestra Misión</h1>
      <p className="text-gray-700">
        Proporcionar soluciones innovadoras y de alta calidad que satisfagan las necesidades de
        nuestros clientes, generando valor y promoviendo el desarrollo continuo.
      </p>
    </div>
  );
};

export default MisionPage;
