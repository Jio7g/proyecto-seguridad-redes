'use client'; // Esta página es un Client Component

import ChangePasswordForm from '@/components/ChangePasswordForm';
import Link from 'next/link'; // Importa Link para el botón de regreso
// import { useRouter } from 'next/navigation'; // Remove if not used

export default function ChangePasswordPage() {
  // const router = useRouter(); // Inicializa el router para la navegación - REMOVE THIS LINE

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100 font-sans antialiased">
      {/* Header (similar al de la página principal para consistencia) */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 shadow-xl py-4 px-6 md:px-12 flex justify-between items-center fixed w-full z-20 top-0">
        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <Link href="/" className="hover:text-blue-300 transition-colors duration-300">
            Grupo 2 - Seguridad TCP/IP
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              {/* Botón de Logout, como en el Dashboard */}
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold text-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Cerrar Sesión
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center pt-24 pb-16 w-full">
        <div className="max-w-xl w-full relative z-10 bg-cyan-800 bg-opacity-10 p-8 md:p-12 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg border border-white border-opacity-20 animate-fadeInUp">
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-white drop-shadow-md mb-6">
            Configuración de Contraseña
          </h2>
          {/* El formulario de cambio de contraseña */}
          <ChangePasswordForm />
        </div>

        {/* Botón para regresar al Dashboard */}
        <div className="mt-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700 transition-colors duration-200"
          >
            {/* Icono de flecha hacia la izquierda, usando SVG inline */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>
      </main>

      {/* Footer (similar al de la página principal para consistencia) */}
      <footer className="bg-gray-800 bg-opacity-80 text-gray-400 py-6 text-center text-sm mt-auto shadow-inner border-t border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Proyecto Final Seguridad de Redes TCP/IP - Grupo 2. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">Desarrollado con Next.js, Tailwind CSS y Prisma.</p>
        </div>
      </footer>

      {/* Animation for the main content block */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}