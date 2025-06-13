'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Importa Link para el botón de regreso

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.error || 'Usuario o contraseña incorrectos'); // Mensaje de error más específico
      }
    } catch (error) {
      setError('Error de conexión con el servidor. Por favor, inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-lg shadow-sm -space-y-px"> {/* Bordes más redondeados */}
        <div>
          <label htmlFor="username" className="sr-only">
            Usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base bg-gray-700 bg-opacity-30 text-white focus:bg-opacity-50 transition-colors"
            placeholder="Usuario"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base bg-gray-700 bg-opacity-30 text-white focus:bg-opacity-50 transition-colors"
            placeholder="Contraseña"
            disabled={isLoading}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-800 bg-opacity-70 p-4 text-white text-sm font-medium">
          <div className="flex items-center">
            {/* Icono de advertencia, usando SVG inline */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.518A8.955 8.955 0 0110 3c2.736 0 5.255 1.096 7.143 2.857A8.955 8.955 0 0117 10c0 2.736-1.096 5.255-2.857 7.143A8.955 8.955 0 0110 17c-2.736 0-5.255-1.096-7.143-2.857A8.955 8.955 0 013 10c0-2.736 1.096-5.255 2.857-7.143zM10 5a1 1 0 011 1v3a1 1 0 11-2 0V6a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </div>
      
      <div className="text-sm text-center text-gray-300 mt-6">
            {/* Botón para regresar a la página principal */}
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          {/* Icono de flecha hacia la izquierda, usando SVG inline */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Volver al Inicio
        </Link>
      </div>
    </form>
  );
}
