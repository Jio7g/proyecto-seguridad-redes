'use client'; // Agrega esta línea al principio del archivo

import LoginForm from '@/components/LoginForm';


export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-purple-900 text-gray-100 font-sans antialiased p-4">
      <div className="max-w-md w-full relative z-10 bg-cyan-800 bg-opacity-10 p-8 md:p-10 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg border border-white border-opacity-20 transform scale-95 opacity-0 animate-fadeInUp">
        <div className="text-center">
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-md text-gray-200 opacity-90">
            Accede a tu cuenta de Proyecto Final - Seguridad de Redes TCP/IP
          </p>
        </div>
        <LoginForm />
      </div>

      {/* Animación para el bloque principal del formulario */}
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
