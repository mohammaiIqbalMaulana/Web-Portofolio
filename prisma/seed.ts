import {PrismaClient} from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(){
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: {email},
    update: {},
    create: {
      email,
      name: 'Admin',
      role: 'ADMIN',
      passwordHash
    }
  });
  console.log('Seed admin selesai:', email);
}

main().finally(()=>prisma.$disconnect());


