'use client'; // Agrega esta línea al principio del archivo

import React from 'react'; // Es una buena práctica importar React explícitamente cuando se usa 'use client'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 shadow-xl py-4 px-6 md:px-12 flex justify-between items-center fixed w-full z-20 top-0">
        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <a href="/" className="hover:text-blue-300 transition-colors duration-300">
            Grupo 2 - Seguridad TCP/IP
          </a>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="/login" 
                className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Iniciar Sesión
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content (Hero Section) */}
      <main 
        className="flex-grow flex items-center justify-center p-6 text-center pt-24 pb-16 relative overflow-hidden"
        style={{ 
          backgroundImage: 'url("https://voopo.jamstacktemplates.dev/static/media/s1.f253af40d60b6eb11ad6.png")', // Placeholder para la imagen de red
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Para un efecto parallax ligero
        }}
      >
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div> 
        
        <div className="max-w-5xl w-full relative z-10 bg-cyan-800 bg-opacity-5 p-8 md:p-16 rounded-3xl shadow-2xl border border-white border-opacity-10 backdrop-filter backdrop-blur-md transform scale-95 opacity-0 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg animate-pulseText">
            Proyecto Final Seguridad de Redes TCP/IP
          </h1>
          <p className="text-xl sm:text-2xl md:text-4xl font-light text-blue-200 mb-8 opacity-90 drop-shadow-md">
            2025 - Grupo 2
          </p>
          <p className="text-md sm:text-lg text-gray-200 opacity-90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Bienvenido al sistema de demostración para el proyecto final de seguridad de redes.
            Explora una plataforma integral diseñada para entender y analizar conceptos avanzados de seguridad en entornos TCP/IP,
            preparada para pruebas de robustez y resiliencia.
          </p>
          <a 
            href="/login" 
            className="inline-block bg-green-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 border border-green-400"
          >
            Acceder al Sistema
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 bg-opacity-80 text-gray-400 py-6 text-center text-sm mt-auto shadow-inner border-t border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Proyecto Final Seguridad de Redes TCP/IP - Grupo 2.</p>
          <p className="mt-2 text-xs"></p>
        </div>
      </footer>

      {/* Animation for the main content block and text */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        @keyframes pulseText {
          0% { text-shadow: 0 0 5px rgba(255,255,255,0.7); }
          50% { text-shadow: 0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.8); }
          100% { text-shadow: 0 0 5px rgba(255,255,255,0.7); }
        }
        .animate-pulseText {
          animation: pulseText 3s infinite alternate;
        }
      `}</style>
    </div>
  );
}
