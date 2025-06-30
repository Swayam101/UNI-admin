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
  Alert,
  Code,
  Collapse,
} from '@mantine/core';
import { IconHome, IconRefresh, IconBug, IconChevronDown, IconAlertTriangle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useState } from 'react';

interface ErrorPageProps {
  error?: Error;
  errorInfo?: React.ErrorInfo;
  onReset?: () => void;
}

const ErrorPage = ({ error, errorInfo, onReset }: ErrorPageProps) => {
  const navigate = useNavigate();
  const { colorScheme } = useTheme();
  const [showDetails, setShowDetails] = useState(false);

  const handleGoHome = () => {
    if (onReset) onReset();
    navigate('/');
  };

  const handleRefresh = () => {
    if (onReset) onReset();
    window.location.reload();
  };

  const handleReportError = () => {
    // In a real app, you might send error details to your error reporting service
    const subject = encodeURIComponent('Error Report - INCOMING-CLASS Admin');
    const body = encodeURIComponent(
      `Error: ${error?.message || 'Unknown error'}\n\nStack: ${error?.stack || 'No stack trace'}\n\nComponent Stack: ${errorInfo?.componentStack || 'No component stack'}`
    );
    window.open(`mailto:support@incoming-class.com?subject=${subject}&body=${body}`);
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
      <Container size={700} my={40}>
        <Center>
          <Stack align="center" gap="xl" style={{ width: '100%' }}>
            {/* Error Icon */}
            <Box
              style={{
                position: 'relative',
                padding: rem(30),
                borderRadius: rem(20),
                background: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
                border: '2px solid #f59e0b',
                boxShadow: '0 0 50px rgba(245, 158, 11, 0.3)',
              }}
            >
              <IconBug size={80} color="white" />
              
              {/* Glitch effect */}
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: rem(20),
                  background: 'linear-gradient(135deg, transparent 49%, rgba(239, 68, 68, 0.3) 50%, transparent 51%)',
                  animation: 'glitch 2s infinite',
                }}
              />
            </Box>

            {/* Error Title */}
            <Stack align="center" gap="md">
              <Title 
                order={1}
                ta="center"
                style={{ 
                  fontSize: rem(48), 
                  fontWeight: 900,
                  background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Oops! Something Went Wrong
              </Title>
              
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
                We encountered an unexpected error. Our team has been notified and is working to fix this issue.
              </Text>
            </Stack>

            {/* Error Details */}
            {error && (
              <Alert
                icon={<IconAlertTriangle size={16} />}
                title="Error Details"
                color="yellow"
                radius="md"
                variant="light"
                style={{
                  width: '100%',
                  maxWidth: 600,
                  border: '1px solid var(--mantine-color-yellow-3)',
                  background: 'var(--mantine-color-yellow-0)',
                }}
              >
                <Stack gap="sm">
                  <Text size="sm" fw={500}>
                    {error.message || 'An unknown error occurred'}
                  </Text>
                  
                  <Button
                    variant="subtle"
                    size="xs"
                    rightSection={<IconChevronDown 
                      size={14} 
                      style={{ 
                        transform: showDetails ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease'
                      }} 
                    />}
                    onClick={() => setShowDetails(!showDetails)}
                    color="yellow"
                  >
                    {showDetails ? 'Hide' : 'Show'} Technical Details
                  </Button>
                  
                  <Collapse in={showDetails}>
                    <Stack gap="xs" mt="xs">
                      {error.stack && (
                        <Box>
                          <Text size="xs" fw={600} mb={4}>Stack Trace:</Text>
                          <Code block style={{ fontSize: '10px', maxHeight: 200, overflow: 'auto' }}>
                            {error.stack}
                          </Code>
                        </Box>
                      )}
                      {errorInfo?.componentStack && (
                        <Box>
                          <Text size="xs" fw={600} mb={4}>Component Stack:</Text>
                          <Code block style={{ fontSize: '10px', maxHeight: 200, overflow: 'auto' }}>
                            {errorInfo.componentStack}
                          </Code>
                        </Box>
                      )}
                    </Stack>
                  </Collapse>
                </Stack>
              </Alert>
            )}

            {/* Action Buttons */}
            <Group gap="md" mt="xl">
              <Button
                size="lg"
                radius="md"
                leftSection={<IconRefresh size={20} />}
                onClick={handleRefresh}
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
                Try Again
              </Button>
              
              <Button
                size="lg"
                radius="md"
                variant="outline"
                leftSection={<IconHome size={20} />}
                onClick={handleGoHome}
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
                Go to Dashboard
              </Button>
            </Group>

            {/* Report Error Button */}
            <Button
              variant="subtle"
              size="sm"
              color="gray"
              onClick={handleReportError}
              style={{ marginTop: rem(20) }}
            >
              Report this error to support
            </Button>

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
          @keyframes glitch {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
          }
        `}</style>
      </Container>
    </Box>
  );
};

export default ErrorPage; 