export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Proyecto Final Seguridad de Redes TCP/IP
        </h1>
        <p className="text-xl text-gray-600 mb-8">Grupo 2</p>
        <a 
          href="/login" 
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
}