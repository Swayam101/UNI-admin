import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Center,
  Stack,
  Box,
  rem,
} from '@mantine/core';
import { IconHome, IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { colorScheme } = useTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

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
        padding: rem(20),
      }}
    >
      <Container size={600} my={40}>
        <Center>
          <Stack align="center" gap="xl">
            {/* 404 Icon */}
            <Box
              style={{
                position: 'relative',
                padding: rem(30),
                borderRadius: rem(20),
                background: 'linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)',
                border: '2px solid #ef4444',
                boxShadow: '0 0 50px rgba(239, 68, 68, 0.3)',
              }}
            >
              <IconAlertCircle size={80} color="white" />
              
              {/* Floating animation dots */}
              <Box
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#fbbf24',
                  animation: 'float 3s ease-in-out infinite',
                }}
              />
              <Box
                style={{
                  position: 'absolute',
                  bottom: -5,
                  left: -5,
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  background: '#06b6d4',
                  animation: 'float 3s ease-in-out infinite 1s',
                }}
              />
            </Box>

            {/* 404 Text */}
            <Stack align="center" gap="md">
              <Title 
                order={1}
                style={{ 
                  fontSize: rem(120), 
                  fontWeight: 900,
                  background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '5px',
                  lineHeight: 0.8,
                }}
              >
                404
              </Title>
              
              <Title 
                order={2}
                ta="center"
                style={{ 
                  fontSize: rem(32), 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #0ea5e9, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Page Not Found
              </Title>
            </Stack>

            {/* Description */}
            <Text 
              ta="center" 
              size="lg"
              c="dimmed"
              style={{ 
                maxWidth: 500,
                lineHeight: 1.6,
                letterSpacing: '0.5px',
              }}
            >
              Oops! The page you're looking for doesn't exist. It might have been moved, 
              deleted, or you entered the wrong URL. Don't worry, let's get you back on track.
            </Text>

            {/* Action Buttons */}
            <Group gap="md" mt="xl">
              <Button
                size="lg"
                radius="md"
                leftSection={<IconHome size={20} />}
                onClick={handleGoHome}
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(14, 165, 233, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                styles={{
                  root: {
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0284c7, #0891b2)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(14, 165, 233, 0.4)',
                    },
                  },
                }}
              >
                Go to Dashboard
              </Button>
              
              <Button
                size="lg"
                radius="md"
                variant="outline"
                leftSection={<IconArrowLeft size={20} />}
                onClick={handleGoBack}
                style={{
                  borderColor: '#06b6d4',
                  color: '#06b6d4',
                  transition: 'all 0.3s ease',
                }}
                styles={{
                  root: {
                    '&:hover': {
                      background: 'rgba(6, 182, 212, 0.1)',
                      borderColor: '#0891b2',
                      color: '#0891b2',
                      transform: 'translateY(-2px)',
                    },
                  },
                }}
              >
                Go Back
              </Button>
            </Group>

            {/* Admin Badge */}
            <Box
              mt="xl"
              p="sm"
              style={{
                background: 'linear-gradient(90deg, rgba(139, 69, 19, 0.1), rgba(184, 134, 11, 0.05))',
                border: '1px solid #f59e0b',
                borderRadius: rem(8),
                textAlign: 'center',
              }}
            >
              <Text size="xs" c="#f59e0b" fw={600} tt="uppercase" style={{ letterSpacing: '1px' }}>
                INCOMING-CLASS ADMIN PORTAL
              </Text>
            </Box>
          </Stack>
        </Center>

        {/* CSS Animation Styles */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </Container>
    </Box>
  );
};

export default NotFoundPage; 