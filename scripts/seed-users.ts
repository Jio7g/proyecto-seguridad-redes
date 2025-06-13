import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el script para crear usuarios de prueba...');

  // Hash de contraseñas
  const hashedPasswordAdmin = await bcrypt.hash('admin123', 10); // 'admin123'
  const hashedPasswordUser1 = await bcrypt.hash('user123', 10); // 'user123'

  // Crear usuario administrador
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPasswordAdmin,
      name: 'Administrador Principal',
      email: 'admin@example.com',
    },
  });
  console.log(`Usuario creado/actualizado: ${admin.username}`);

  // Crear usuario de prueba 1
  const user1 = await prisma.user.upsert({
    where: { username: 'cramos' },
    update: {},
    create: {
      username: 'cramos',
      password: hashedPasswordUser1,
      name: 'Carlos Ramos',
      email: 'usuario1@example.com',
    },
  });
  console.log(`Usuario creado/actualizado: ${user1.username}`);

  console.log('Usuarios de prueba creados exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });