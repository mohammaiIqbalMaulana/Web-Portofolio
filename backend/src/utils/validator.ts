// src/utils/validators.ts
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  title_en: z.string().optional(),
  description_en: z.string().optional(),
  tech: z.array(z.string()).min(1, 'At least one technology required'),
  github_url: z.string().url().optional().or(z.literal('')),
  live_url: z.string().url().optional().or(z.literal('')),
  image_url: z.string().url().optional().or(z.literal('')),
  links: z.array(z.object({
    type: z.enum(['github', 'colab', 'demo', 'other']), // Allow colab and other types
    url: z.string().url(),
    label: z.string()
  })).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  files: z.array(z.object({
    type: z.string(), // e.g., 'zip', 'apk'
    path: z.string(),
    label: z.string()
  })).optional().default([]),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0)
});

export const updateProjectSchema = createProjectSchema.partial();
