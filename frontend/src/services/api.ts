// src/services/api.ts

// In dev, default to whatever host the page itself was loaded from, on the
// backend's port (4000). This means the same build works whether you open
// it as http://localhost:3000 on your own machine or as
// http://<your-computer-LAN-IP>:3000 from a phone on the same Wi-Fi — no
// manual .env edit needed per network. VITE_BACKEND_URL still wins if set
// (e.g. for a real production deployment).
const inferredBackendUrl =
  typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:4000` : 'http://localhost:4000';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || inferredBackendUrl;

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  technologies?: string;
  github_url?: string;
  live_url?: string;
  image_url?: string;
  links?: Array<{
    type: 'github' | 'colab' | 'demo' | 'other';
    url: string;
    label: string;
  }>;
  images?: string[];
  files?: Array<{
    type: string;
    path: string;
    label: string;
  }>;
  title_en?: string;
  description_en?: string;
  role?: string;
  year?: string;
  status?: string;
  featured?: boolean;
  highlights?: string[];
  outcome?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  admin: {
    id: number;
    username: string;
    displayName: string;
  };
  token?: string;
}

export interface ApiError {
  error: string;
  path?: string;
}

class ApiService {
  private baseURL = '/api';
  private token: string | null = null;

  constructor() {
    // Get token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  // Helper method for making HTTP requests
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth methods
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.success && response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }

    return response;
  }

  async logout(): Promise<void> {
    this.token = null;
    localStorage.removeItem('auth_token');

    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      // Logout endpoint might not exist, that's OK
      console.warn('Logout endpoint error (continuing anyway):', error);
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Projects methods
  async getProjects(lang?: string): Promise<Project[]> {
    const query = lang ? `?lang=${lang}` : '';
    return this.request<Project[]>(`/projects${query}`);
  }

  async getProject(id: number): Promise<Project> {
    return this.request<Project>(`/projects/${id}`);
  }

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async createProjectWithFiles(formData: FormData): Promise<Project> {
    const url = `${this.baseURL}/projects`;

    const config: RequestInit = {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      credentials: 'include',
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (/projects):`, error);
      throw error;
    }
  }

  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async updateProjectWithFiles(id: number, formData: FormData): Promise<Project> {
    const url = `${this.baseURL}/projects/${id}`;

    const config: RequestInit = {
      method: 'PUT',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      credentials: 'include',
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (/projects/${id}):`, error);
      throw error;
    }
  }

  async deleteProject(id: number): Promise<void> {
    const url = `${this.baseURL}/projects/${id}`;

    const config: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      credentials: 'include',
    };

    try {
      const response = await fetch(url, config);

      if (response.ok) {
        // 204 No Content - successful deletion, no body to parse
        return;
      }

      // Try to parse error response as JSON, fallback to status text
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new Error(errorMessage);
    } catch (error) {
      console.error(`API Error (/projects/${id}):`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<any> {
    return this.request<any>('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService();
