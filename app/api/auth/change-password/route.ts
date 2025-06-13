import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// Define la interfaz para el payload del token JWT
interface UserToken {
  userId: number;
  username: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();

    // 1. Obtener el token de la cookie
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('auth-token');

    if (!tokenCookie) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // 2. Verificar el token JWT y obtener el ID del usuario
    let decodedToken: UserToken;
    try {
      decodedToken = jwt.verify(tokenCookie.value, process.env.JWT_SECRET!) as UserToken;
    } catch (error) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
    }

    const userId = decodedToken.userId;

    // 3. Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // 4. Verificar la contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 401 });
    }

    // 5. Validar la nueva contraseña (puedes añadir más reglas aquí)
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' }, { status: 400 });
    }

    // 6. Encriptar la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 7. Actualizar la contraseña en la base de datos
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({ message: 'Contraseña actualizada exitosamente' }, { status: 200 });

  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
