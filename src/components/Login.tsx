import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
  Group,
  Stack,
  Checkbox,
  Anchor,
  Center,
  Box,
  rem,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail, IconLock, IconShield, IconEye, IconAlertTriangle, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import { useLogin } from '../hooks/useAuth';
import { LoginRequest, ApiError } from '../types/auth';

const Login = () => {
  const navigate = useNavigate();
  const { colorScheme } = useTheme();
  
  // TanStack Query mutation for login
  const loginMutation = useLogin();

  // Mantine form with validation
  const form = useForm<LoginRequest>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: (value) => {
        if (!value) return 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email';
        return null;
      },
      password: (value) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return null;
      },
    },
  });

  // Form submission handler with mutateAsync
  const handleSubmit = async (values: LoginRequest) => {
    try {
      await loginMutation.mutateAsync(values);
      // Navigate to dashboard after successful login
      navigate('/');
    } catch (error) {
      // Error is already handled by the mutation's onError callback
      console.error('Login failed:', error);
    }
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
      <Container size={450} my={40}>
        {/* Warning Banner */}
        <Box
          mb="xl"
          p="md"
          style={{
            background: 'linear-gradient(90deg, rgba(139, 69, 19, 0.1), rgba(184, 134, 11, 0.05))',
            border: '1px solid #f59e0b',
            borderRadius: rem(8),
            textAlign: 'center',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
          }}
        >
          <Group justify="center" gap="sm">
            <IconAlertTriangle size={20} color="#f59e0b" />
            <Text size="sm" c="#f59e0b" fw={600} tt="uppercase" style={{ letterSpacing: '1px' }}>
              STUDENT ADMIN ACCESS
            </Text>
          </Group>
        </Box>

        {/* Main Header */}
        <Center mb={50}>
          <Stack align="center" gap="xs">
            <Box
              style={{
                padding: rem(20),
                borderRadius: rem(50),
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981)',
                border: '2px solid #0ea5e9',
                boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)',
              }}
            >
              <IconShield size={40} color="white" />
            </Box>
            <Title 
              order={1} 
              ta="center"
              style={{ 
                fontSize: rem(32), 
                fontWeight: 900,
                background: 'linear-gradient(45deg, #0ea5e9, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              INCOMING-CLASS
            </Title>
            <Text 
              size="sm" 
              ta="center"
              style={{ 
                color: '#06b6d4',
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontSize: rem(11),
              }}
            >
              • ADMIN DASHBOARD •
            </Text>
          </Stack>
        </Center>

        {/* Login Card */}
        <Paper
          radius="lg"
          p="xl"
          withBorder
          style={{
            background: colorScheme === 'dark' 
              ? 'rgba(15, 23, 42, 0.9)' 
              : 'rgba(248, 250, 252, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            boxShadow: '0 0 50px rgba(14, 165, 233, 0.1)',
          }}
        >
          <Stack align="center" mb="xl">
            <Group gap="xs">
              <IconEye size={16} color="#06b6d4" />
              <Text 
                size="xs" 
                style={{
                  color: '#06b6d4',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Welcome Back, Admin! 
              </Text>
            </Group>
            <Text 
              size="sm" 
              ta="center"
              c="dimmed"
              style={{ letterSpacing: '1px' }}
            >
              Sign in to manage your student platform
            </Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              {/* Error Alert */}
              {loginMutation.isError && (
                <Alert
                  icon={<IconX size={16} />}
                  title="Login Failed"
                  color="red"
                  radius="md"
                  variant="light"
                  style={{
                    border: '1px solid var(--mantine-color-red-3)',
                    background: 'var(--mantine-color-red-0)',
                  }}
                >
                  <Text size="sm">
                    {(loginMutation.error as ApiError)?.message || 'Invalid credentials. Please try again.'}
                  </Text>
                </Alert>
              )}

              <TextInput
                label="Email Address"
                placeholder="admin@incomingclass.com"
                leftSection={<IconMail size={18} />}
                radius="md"
                size="lg"
                {...form.getInputProps('email')}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                leftSection={<IconLock size={18} />}
                radius="md"
                size="lg"
                {...form.getInputProps('password')}
              />

              <Group justify="space-between" mt="md">
                <Checkbox
                  label="Stay logged in"
                  {...form.getInputProps('rememberMe', { type: 'checkbox' })}
                />
                <Anchor 
                  component="button" 
                  size="xs" 
                  style={{
                    color: '#06b6d4',
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                  }}
                >
                  Forgot Password?
                </Anchor>
              </Group>

              <Button
                type="submit"
                fullWidth
                size="lg"
                radius="md"
                loading={loginMutation.isPending}
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  border: 'none',
                  marginTop: rem(20),
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 700,
                }}
              >
                {loginMutation.isPending ? 'Signing You In...' : 'Let\'s Go!'}
              </Button>
            </Stack>
          </form>
        </Paper>

        {/* Footer */}
        <Text ta="center" mt="xl" size="xs" style={{ 
          color: colorScheme === 'dark' ? '#475569' : '#64748b',
          letterSpacing: '1px',
        }}>
          © 2024 Incoming Class • Connecting Students Everywhere 🚀
        </Text>
      </Container>
    </Box>
  );
};

export default Login; 