// src/services/projects.service.ts
import { prisma } from '../config/database';

export const projectService = {
  getAllProjects: async () => {
    return prisma.project.findMany({
      orderBy: [
        { featured: 'desc' },
        { sortOrder: 'desc' },
        { createdAt: 'desc' }
      ]
    });
  },

  getProjectById: async (id: number) => {
    return prisma.project.findUnique({ where: { id } });
  },

  createProject: async (data: any) => {
    return prisma.project.create({ data });
  },

  updateProject: async (id: number, data: any) => {
    try {
      return await prisma.project.update({ where: { id }, data });
    } catch (error: any) {
      if (error.code === 'P2025') return null;
      throw error;
    }
  },

  deleteProject: async (id: number) => {
    try {
      await prisma.project.delete({ where: { id } });
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') return false;
      throw error;
    }
  }
};