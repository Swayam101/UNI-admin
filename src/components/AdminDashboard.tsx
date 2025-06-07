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
  IconSettings,
  IconLogout,
  IconUser,
  IconMoon,
  IconSun,
  IconChevronDown,
} from '@tabler/icons-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import Dashboard from './Dashboard';
import SchoolManagement from './SchoolManagement';
import UserManagement from './UserManagement';
import PostManagement from './PostManagement';
import Analytics from './Analytics';
import EmailCampaigns from './EmailCampaigns';

const AdminDashboard = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useTheme();

  const navigationItems = [
    { icon: IconDashboard, label: 'Dashboard', path: '/' },
    { icon: IconSchool, label: 'School Management', path: '/schools' },
    { icon: IconUsers, label: 'User Management', path: '/users' },
    { icon: IconMessages, label: 'Post Management', path: '/posts' },
    { icon: IconChartBar, label: 'Analytics', path: '/analytics' },
    { icon: IconMail, label: 'Email Campaigns', path: '/emails' },
  ];

  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    return currentItem?.label || 'Dashboard';
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
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              >
                A
              </Avatar>
              <div>
                <Title order={3} c="blue" style={{ fontSize: rem(18), fontWeight: 600 }}>
                  Admin Panel
                </Title>
                <Text size="xs" c="dimmed" style={{ marginTop: rem(-2) }}>
                  {getCurrentPageTitle()}
                </Text>
              </div>
            </Group>
            
            {/* Mobile only - simplified title */}
            <Group hiddenFrom="sm">
              <Title order={4} c="blue" style={{ fontSize: rem(16), fontWeight: 600 }}>
                Admin
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
                    <Avatar size={32} radius="xl" color="blue">
                      AD
                    </Avatar>
                    {/* Hide user info on mobile */}
                    <Group style={{ flex: 1, minWidth: 0 }} visibleFrom="md">
                      <div>
                        <Text size="sm" fw={500} style={{ lineHeight: 1 }}>
                          Admin User
                        </Text>
                        <Text size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                          admin@university.edu
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
                <Menu.Item leftSection={<IconUser size={16} />}>
                  Profile Settings
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={16} />}>
                  Preferences
                </Menu.Item>
                
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
            University Admin v1.0
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
          </Routes>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminDashboard; 