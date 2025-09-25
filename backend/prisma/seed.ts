// prisma/seed.ts - FIXED VERSION
/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  
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

  // Seed projects - Use create instead of upsert
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
      sortOrder: 100,
      createdById: admin.id
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
      sortOrder: 90,
      createdById: admin.id
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
      sortOrder: 80,
      createdById: admin.id
    }
  ];

  // Delete existing projects first (to avoid duplicates)
  await prisma.project.deleteMany({});
  console.log('🗑️ Cleared existing projects');

  // Create new projects
  let createdCount = 0;
  for (const projectData of projectsData) {
    try {
      const project = await prisma.project.create({
        data: projectData
      });
      console.log(`✅ Created project: ${project.title}`);
      createdCount++;
    } catch (error) {
      console.error(`❌ Failed to create project: ${projectData.title}`, error);
    }
  }

  console.log(`✅ Successfully seeded ${createdCount}/${projectsData.length} projects`);
  console.log('\n🎉 Database seeding completed!');
  console.log('📋 Summary:');
  console.log(`   - Admin user: ${admin.username} (password: admin123)`);
  console.log(`   - Projects: ${createdCount} created`);
  console.log('\n🔐 Login credentials:');
  console.log('   Username: admin');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });