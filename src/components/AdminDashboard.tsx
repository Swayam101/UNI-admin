import { useState } from 'react';
import {
  AppShell,
  Text,
  NavLink,
  Title,
  Group,
  ActionIcon,
  Container,
  Avatar,
  Menu,
  UnstyledButton,
  rem,
} from '@mantine/core';
import {
  IconSchool,
  IconUsers,
  IconMessages,
  IconChartBar,
  IconMail,
  IconMenu2,
  IconDashboard,
  IconLogout,
  IconMoon,
  IconSun,
  IconChevronDown,
} from '@tabler/icons-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { useLogout, useCurrentUser } from '../hooks/useAuth';
import Dashboard from './Dashboard';
import SchoolManagement from './SchoolManagement';
import UserManagement from './UserManagement';
import PostManagement from './PostManagement';
import Analytics from './Analytics';
import EmailCampaigns from './EmailCampaigns';
import CollegeFormPage from './CollegeFormPage';

const AdminDashboard = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useTheme();
  const logoutMutation = useLogout();
  const { data: user } = useCurrentUser();

  const navigationItems = [
    { icon: IconDashboard, label: 'Dashboard', path: '/' },
    { icon: IconSchool, label: 'College Management', path: '/schools' },
    { icon: IconUsers, label: 'User Management', path: '/users' },
    { icon: IconMessages, label: 'Post Management', path: '/posts' },
    { icon: IconChartBar, label: 'Analytics', path: '/analytics' },
    { icon: IconMail, label: 'Email Campaigns', path: '/emails' },
  ];

  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    return currentItem?.label || 'Dashboard';
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Navigate to login even if logout API fails (tokens are cleared in the hook)
      navigate('/login');
    }
  };

  // Generate user initials from name
  const getUserInitials = () => {
    if (!user) return 'AD';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  // Get full user name
  const getUserName = () => {
    if (!user) return 'Admin User';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
  };

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      header={{ height: 70 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}>
          <Group>
            <ActionIcon
              variant="transparent"
              size="lg"
              onClick={() => setOpened((o) => !o)}
              hiddenFrom="sm"
            >
              <IconMenu2 size={20} />
            </ActionIcon>
            <Group gap="md" visibleFrom="sm">
              <Avatar
                size={36}
                radius="xl"
                src={user?.profilePicture}
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              >
                {!user?.profilePicture && getUserInitials()}
              </Avatar>
              <div>
                <Title order={3} c="blue" style={{ fontSize: rem(18), fontWeight: 600 }}>
                  INCOMING-CLASS Admin
                </Title>
                <Text size="xs" c="dimmed" style={{ marginTop: rem(-2) }}>
                  {getCurrentPageTitle()}
                </Text>
              </div>
            </Group>
            
            {/* Mobile only - simplified title */}
            <Group hiddenFrom="sm">
              <Title order={4} c="blue" style={{ fontSize: rem(16), fontWeight: 600 }}>
                INCOMING-CLASS
              </Title>
            </Group>
          </Group>

          <Group gap="md">
            {/* User Menu */}
            <Menu shadow="md" width={220} position="bottom-end">
              <Menu.Target>
                <UnstyledButton
                  style={{
                    padding: rem(4),
                    borderRadius: rem(8),
                    backgroundColor: 'transparent',
                    border: '1px solid var(--mantine-color-default-border)',
                    minWidth: 'auto',
                  }}
                >
                  <Group gap="sm">
                    <Avatar 
                      size={32} 
                      radius="xl" 
                      src={user?.profilePicture}
                      color="blue"
                    >
                      {!user?.profilePicture && getUserInitials()}
                    </Avatar>
                    {/* Hide user info on mobile */}
                    <Group style={{ flex: 1, minWidth: 0 }} visibleFrom="md">
                      <div>
                        <Text size="sm" fw={500} style={{ lineHeight: 1 }}>
                          {getUserName()}
                        </Text>
                        <Text size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                          {user?.email || 'Loading...'}
                        </Text>
                      </div>
                      <IconChevronDown 
                        size={14} 
                        style={{ color: 'var(--mantine-color-dimmed)' }}
                      />
                    </Group>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                
                <Menu.Divider />
                
                <Menu.Label>Appearance</Menu.Label>
                <Menu.Item 
                  leftSection={colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
                  onClick={toggleColorScheme}
                >
                  {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Menu.Item>
                
                <Menu.Divider />
                
                <Menu.Item 
                  leftSection={<IconLogout size={16} />}
                  color="red"
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        

        <Text size="xs" tt="uppercase" fw={700} c="dimmed" mb="md">
          Navigation
        </Text>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: rem(4) }}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              active={location.pathname === item.path}
              label={item.label}
              leftSection={<item.icon size={20} />}
              onClick={() => {
                navigate(item.path);
                setOpened(false);
              }}
              style={{
                borderRadius: rem(8),
                fontSize: rem(14),
                fontWeight: 500,
              }}
            />
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: rem(16), borderTop: '1px solid var(--mantine-color-default-border)' }}>
          <Text size="xs" c="dimmed" ta="center">
            INCOMING-CLASS Admin v1.0
          </Text>
        </div>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl" p={0}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schools" element={<SchoolManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/posts" element={<PostManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/emails" element={<EmailCampaigns />} />
            <Route path="/schools/add" element={<CollegeFormPage />} />
            <Route path="/schools/edit/:id" element={<CollegeFormPage />} />
          </Routes>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminDashboard; 