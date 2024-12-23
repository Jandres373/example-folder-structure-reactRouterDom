const InternalPage = () => {
  return (
    <div className="size-fit flex flex-col justify-center items-center p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center text-red-600">
        Hola soy la page internal pero solo puedes verme si tienes acceso, soy una ruta protegida.
      </h1>
    </div>
  );
};

export default InternalPage;
