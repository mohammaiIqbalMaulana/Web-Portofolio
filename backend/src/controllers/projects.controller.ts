// src/controllers/projects.controller.ts
import { Request, Response } from 'express';
import { projectService } from '../services/projects.service';
import { createProjectSchema, updateProjectSchema } from '../utils/validator';
import { AuthRequest } from '../types/auth';
import fs from 'fs';
import path from 'path';

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

        // Send clean response
        const cleanProjects = translatedProjects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          tech: project.tech,
          github_url: project.github_url,
          live_url: project.live_url,
          image_url: project.image_url,
          links: project.links,
          images: project.images,
          files: project.files,
          featured: project.featured,
          sortOrder: project.sortOrder,
          created_at: project.createdAt,
          updated_at: project.updatedAt
        }));

        res.json(cleanProjects);
      } else {
        // Send clean response
        const cleanProjects = projects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          tech: project.tech,
          github_url: project.github_url,
          live_url: project.live_url,
          image_url: project.image_url,
          links: project.links,
          images: project.images,
          files: project.files,
          featured: project.featured,
          sortOrder: project.sortOrder,
          created_at: project.createdAt,
          updated_at: project.updatedAt
        }));

        res.json(cleanProjects);
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

      // Send clean response without potential circular references
      const responseData = {
        id: project.id,
        title: project.title,
        description: project.description,
        tech: project.tech,
        github_url: project.github_url,
        live_url: project.live_url,
        image_url: project.image_url,
        links: project.links,
        images: project.images,
        files: project.files,
        featured: project.featured,
        sortOrder: project.sortOrder,
        created_at: project.createdAt,
        updated_at: project.updatedAt
      };

      res.json(responseData);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  create: async (req: AuthRequest, res: Response) => {
    try {
      // Parse the 'data' field which contains the JSON string
      let body;
      if (req.body.data) {
        // FormData case
        body = JSON.parse(req.body.data);
      } else {
        // Regular JSON case
        body = req.body;
      }

      const validation = createProjectSchema.safeParse(body);
      if (!validation.success) {
        return res.status(400).json({
          error: 'Validation failed',
          details: validation.error.errors
        });
      }

      // Create project first to get ID
      const project = await projectService.createProject({
        ...validation.data,
        createdById: req.admin!.id
      });

      // Handle uploaded files
      const projectDir = path.join('uploads', 'projects', project.id.toString());
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }

      const uploadedImages: string[] = [];
      const uploadedFiles: any[] = [];

      // Process images
      if (req.files && 'images' in req.files) {
        const images = req.files.images as Express.Multer.File[];
        for (const file of images) {
          try {
            const newPath = path.join(projectDir, file.filename);
            fs.renameSync(file.path, newPath);
            uploadedImages.push(`/uploads/projects/${project.id}/${file.filename}`);
          } catch (fileError) {
            console.error('Error processing image file:', fileError);
            // Continue with other files
          }
        }
      }

      // Process files (ZIPs, etc.)
      if (req.files && 'files' in req.files) {
        const files = req.files.files as Express.Multer.File[];
        for (const file of files) {
          try {
            const newPath = path.join(projectDir, file.filename);
            fs.renameSync(file.path, newPath);
            uploadedFiles.push({
              type: file.mimetype === 'application/zip' ? 'zip' : 'file',
              path: `/uploads/projects/${project.id}/${file.filename}`,
              label: file.originalname
            });
          } catch (fileError) {
            console.error('Error processing file:', fileError);
            // Continue with other files
          }
        }
      }

      // Update project with file paths
      const updatedProject = await projectService.updateProject(project.id, {
        images: [...(validation.data.images || []), ...uploadedImages],
        files: [...(validation.data.files || []), ...uploadedFiles]
      });

      if (!updatedProject) {
        return res.status(500).json({ error: 'Failed to update project with file paths' });
      }

      // Send clean response without potential circular references
      const responseData = {
        id: updatedProject.id,
        title: updatedProject.title,
        description: updatedProject.description,
        tech: updatedProject.tech,
        github_url: updatedProject.github_url,
        live_url: updatedProject.live_url,
        image_url: updatedProject.image_url,
        links: updatedProject.links,
        images: updatedProject.images,
        files: updatedProject.files,
        featured: updatedProject.featured,
        sortOrder: updatedProject.sortOrder,
        created_at: updatedProject.createdAt,
        updated_at: updatedProject.updatedAt
      };

      res.status(201).json(responseData);
    } catch (error: unknown) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  update: async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      // Parse the 'data' field which contains the JSON string
      let body;
      if (req.body.data) {
        // FormData case
        body = JSON.parse(req.body.data);
      } else {
        // Regular JSON case
        body = req.body;
      }

      const validation = updateProjectSchema.safeParse(body);

      if (!validation.success) {
        return res.status(400).json({
          error: 'Validation failed',
          details: validation.error.errors
        });
      }

      // Get existing project to append to images/files
      const existingProject = await projectService.getProjectById(id);
      if (!existingProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Handle uploaded files
      const projectDir = path.join('uploads', 'projects', id.toString());
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }

      const uploadedImages: string[] = [];
      const uploadedFiles: any[] = [];

      // Process images
      if (req.files && 'images' in req.files) {
        const images = req.files.images as Express.Multer.File[];
        for (const file of images) {
          try {
            const newPath = path.join(projectDir, file.filename);
            fs.renameSync(file.path, newPath);
            uploadedImages.push(`/uploads/projects/${id}/${file.filename}`);
          } catch (fileError) {
            console.error('Error processing image file:', fileError);
            // Continue with other files
          }
        }
      }

      // Process files (ZIPs, etc.)
      if (req.files && 'files' in req.files) {
        const files = req.files.files as Express.Multer.File[];
        for (const file of files) {
          try {
            const newPath = path.join(projectDir, file.filename);
            fs.renameSync(file.path, newPath);
            uploadedFiles.push({
              type: file.mimetype === 'application/zip' ? 'zip' : 'file',
              path: `/uploads/projects/${id}/${file.filename}`,
              label: file.originalname
            });
          } catch (fileError) {
            console.error('Error processing file:', fileError);
            // Continue with other files
          }
        }
      }

      // Merge with existing - only add uploaded files, don't replace existing arrays unless explicitly provided
      const existingImages = Array.isArray(existingProject.images) ? existingProject.images : [];
      const existingFiles = Array.isArray(existingProject.files) ? existingProject.files : [];

      const updateData = {
        ...validation.data,
        images: validation.data.images ? validation.data.images : [...existingImages, ...uploadedImages],
        files: validation.data.files ? validation.data.files : [...existingFiles, ...uploadedFiles]
      };

      const project = await projectService.updateProject(id, updateData);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Send clean response without potential circular references
      const responseData = {
        id: project.id,
        title: project.title,
        description: project.description,
        tech: project.tech,
        github_url: project.github_url,
        live_url: project.live_url,
        image_url: project.image_url,
        links: project.links,
        images: project.images,
        files: project.files,
        featured: project.featured,
        sortOrder: project.sortOrder,
        created_at: project.createdAt,
        updated_at: project.updatedAt
      };

      res.json(responseData);
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