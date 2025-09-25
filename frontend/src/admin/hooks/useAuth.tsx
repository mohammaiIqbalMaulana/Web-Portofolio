import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = (redirectTo: string = '/admin/login'): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = apiService.isAuthenticated();
        
        if (!isAuth) {
          navigate(redirectTo);
          return;
        }

        // Optional: Validate token with server
        // await apiService.validateToken();
        
        setAuthState({ isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState({ isAuthenticated: false, isLoading: false });
        navigate(redirectTo);
      }
    };

    checkAuth();
  }, [navigate, redirectTo]);

  return authState;
};

// Protected Route Component
export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/admin/login' 
}) => {
  const { isAuthenticated, isLoading } = useAuth(redirectTo);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
