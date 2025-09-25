// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin
  const adminPassword = await hashPassword('admin123'); // CHANGE THIS!
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPassword,
      displayName: 'Mohammad Iqbal Maulana'
    }
  });

  console.log('✅ Admin created:', admin.username);

  // Seed projects (extracted from your SinglePageApp.tsx)
  const projectsData = [
    {
      title: "System Information App",
      description: "Aplikasi untuk menampilkan informasi sistem komputer secara real-time menggunakan teknologi web modern",
      tech: ["Node.js", "Express", "MySQL", "HTML/CSS", "JavaScript"],
      links: [
        { type: "github", url: "https://github.com/yourusername/system-info", label: "View Code" },
        { type: "demo", url: "#", label: "Live Demo" }
      ],
      images: [],
      featured: true,
      sortOrder: 100
    },
    {
      title: "E-Commerce Dashboard",
      description: "Dashboard admin untuk mengelola produk, pesanan, dan analitik toko online",
      tech: ["React", "TypeScript", "Node.js", "MongoDB", "Chart.js"],
      links: [
        { type: "github", url: "https://github.com/yourusername/ecommerce-dashboard", label: "View Code" }
      ],
      images: [],
      featured: false,
      sortOrder: 90
    },
    {
      title: "Task Management App",
      description: "Aplikasi manajemen tugas dengan fitur kolaborasi tim dan real-time updates",
      tech: ["Vue.js", "Express", "Socket.io", "PostgreSQL", "Redis"],
      links: [
        { type: "github", url: "https://github.com/yourusername/task-manager", label: "View Code" },
        { type: "demo", url: "#", label: "Live Demo" }
      ],
      images: [],
      featured: true,
      sortOrder: 80
    }
  ];

  for (const projectData of projectsData) {
    await prisma.project.upsert({
      where: { title: projectData.title },
      update: {},
      create: {
        ...projectData,
        createdById: admin.id
      }
    });
  }

  console.log(`✅ Seeded ${projectsData.length} projects`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });