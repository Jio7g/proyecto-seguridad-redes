'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    if (newPassword !== confirmNewPassword) {
      setError('La nueva contraseña y la confirmación no coinciden.');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Contraseña cambiada exitosamente.');
        setError(''); // Limpiar cualquier error anterior
        // Opcional: limpiar los campos del formulario después del éxito
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        // Podrías redirigir al usuario al dashboard después de un momento
        // setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setError(data.error || 'Error al cambiar la contraseña.');
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setError('Error de conexión con el servidor. Por favor, inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg bg-gray-700 bg-opacity-20 shadow-lg border border-gray-600">
      <h3 className="text-xl font-bold text-white mb-4">Cambiar Contraseña</h3>

      {/* Campo de Contraseña Actual */}
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">
          Contraseña Actual
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="appearance-none block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 bg-gray-800 bg-opacity-40 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      {/* Campo de Nueva Contraseña */}
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
          Nueva Contraseña
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="appearance-none block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 bg-gray-800 bg-opacity-40 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      {/* Campo de Confirmar Nueva Contraseña */}
      <div>
        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-300 mb-1">
          Confirmar Nueva Contraseña
        </label>
        <input
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          autoComplete="new-password"
          required
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="appearance-none block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-gray-100 bg-gray-800 bg-opacity-40 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      {/* Mensaje de éxito */}
      {message && (
        <div className="rounded-md bg-green-700 bg-opacity-70 p-3 text-white flex items-center">
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {message}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="rounded-md bg-red-700 bg-opacity-70 p-3 text-white flex items-center">
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.518A8.955 8.955 0 0110 3c2.736 0 5.255 1.096 7.143 2.857A8.955 8.955 0 0117 10c0 2.736-1.096 5.255-2.857 7.143A8.955 8.955 0 0110 17c-2.736 0-5.255-1.096-7.143-2.857A8.955 8.955 0 013 10c0-2.736 1.096-5.255 2.857-7.143zM10 5a1 1 0 011 1v3a1 1 0 11-2 0V6a1 1 0 011-1zm0 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Botón de Submit */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Cambiando Contraseña...' : 'Cambiar Contraseña'}
        </button>
      </div>
    </form>
  );
}
