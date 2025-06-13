// app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

interface UserToken {
  userId: number;
  username: string;
  email: string;
}

async function getUser() {
  // Await the cookies() function call
  const cookieStore = await cookies(); 
  // Accede al valor de la cookie directamente desde el objeto RequestCookie
  const token = cookieStore.get('auth-token'); 

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as UserToken;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    if (!user) {
      redirect('/login');
    }

    return user;
  } catch (error) {
    console.error('Error verificando token:', error);
    redirect('/login');
  }
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gradient-to-r from-blue-900 to-indigo-800 text-amber-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Panel de Usuario</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-amber-50">Hola, {user.name}</span>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="text-amber-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium roun bg-orange-700"
                >
                  Cerrar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-cyan-800 text-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                ¡Bienvenido, {user.name}!
              </h2>

              <div className="mt-5 border-t border-gray-200 pt-5">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-white neon-text">
                      Usuario
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
                      {user.username}
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-200">
                      Nombre Completo
                    </dt>
                    <dd className="mt-1 text-sm text-gray-100 sm:col-span-2 sm:mt-0">
                      {user.name}
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-200">
                      Correo Electrónico
                    </dt>
                    <dd className="mt-1 text-sm text-gray-100 sm:col-span-2 sm:mt-0">
                      {user.email}
                    </dd>
                  </div>

                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-200">
                      Miembro desde
                    </dt>
                    <dd className="mt-1 text-sm text-gray-100 sm:col-span-2 sm:mt-0">
                      {new Date(user.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-blue-700">
                  Página de demostración para el Proyecto Final de Seguridad de Redes TCP/IP.
                  El sistema está preparado para pruebas de seguridad controladas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}