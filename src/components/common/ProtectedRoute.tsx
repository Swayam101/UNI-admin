import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Center, Loader, Text, Stack, Box } from '@mantine/core';
import { IconShield } from '@tabler/icons-react';
import { useCurrentUser } from '../../hooks/useAuth';
import { isAuthenticated, clearAuthTokens } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { colorScheme } = useTheme();
  const { 
    data: user, 
    isLoading, 
    isError 
  } = useCurrentUser();

  // Clear tokens and redirect if there's an authentication error
  useEffect(() => {
    if (isError) {
      clearAuthTokens();
    }
  }, [isError]);
  console.log(!isAuthenticated(),isLoading,isError,"printing all this");
  
  // If no token exists, redirect to login immediately
  if (!isAuthenticated()) {
    console.log("redirecting to login");
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <Box
        style={{
          minHeight: '100vh',
          background: colorScheme === 'dark' 
            ? 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a0a1a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Center>
          <Stack align="center" gap="lg">
            <Box
              style={{
                padding: '20px',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981)',
                border: '2px solid #0ea5e9',
                boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <IconShield size={40} color="white" />
            </Box>
            
            <Stack align="center" gap="sm">
              <Loader size="lg" color="blue" />
              <Text 
                size="lg" 
                fw={600} 
                style={{ 
                  color: colorScheme === 'dark' ? '#06b6d4' : '#3b82f6',
                  letterSpacing: '1px'
                }}
              >
                Verifying Access...
              </Text>
              <Text 
                size="sm" 
                c="dimmed"
                style={{ letterSpacing: '0.5px' }}
              >
                Authenticating your credentials
              </Text>
            </Stack>
          </Stack>
        </Center>
        
        <style>{`
          @keyframes pulse {
            0%, 100% { 
              transform: scale(1);
              box-shadow: 0 0 30px rgba(14, 165, 233, 0.5);
            }
            50% { 
              transform: scale(1.05);
              box-shadow: 0 0 40px rgba(14, 165, 233, 0.8);
            }
          }
        `}</style>
      </Box>
    );
  }
  

  // If there's an error or no user data, redirect to login
  if (isError || !user || user.role !== 'admin')  {
    console.log("redirecting to login",isError,user,);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user exists and is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute; 