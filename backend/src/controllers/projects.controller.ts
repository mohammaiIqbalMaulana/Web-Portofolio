// src/controllers/projects.controller.ts
import { Request, Response } from 'express';
import { projectService } from '../services/projects.service';
import { createProjectSchema, updateProjectSchema } from '../utils/validator';
import { AuthRequest } from '../types/auth';

export const projectController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const lang = req.query.lang as string;
      const projects = await projectService.getAllProjects();

      // If lang is 'en', translate fields
      if (lang === 'en') {
        const translatedProjects = projects.map(project => ({
          ...project,
          title: project.title_en || project.title,
          description: project.description_en || project.description,
        }));
        res.json(translatedProjects);
      } else {
        res.json(projects);
      }
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const project = await projectService.getProjectById(id);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.json(project);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  create: async (req: AuthRequest, res: Response) => {
    try {
      const validation = createProjectSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validation.error.errors 
        });
      }

      const project = await projectService.createProject({
        ...validation.data,
        createdById: req.admin!.id
      });

      res.status(201).json(project);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  update: async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validation = updateProjectSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validation.error.errors 
        });
      }

      const project = await projectService.updateProject(id, validation.data);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json(project);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await projectService.deleteProject(id);
      
      if (!success) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.status(204).send();
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
};