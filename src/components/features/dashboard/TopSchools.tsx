import { Card, Stack, Text, Group, Progress, Transition, Button } from '@mantine/core';
import { IconTrophy, IconUsers, IconMessages } from '@tabler/icons-react';
import { useState } from 'react';

interface SchoolData {
  _id: string;
  name: string;
  logoUrl: string;
  totalUsers: number;
  totalPosts: number;
}

interface SchoolItemProps {
  school: SchoolData;
  index: number;
  rank: number;
  totals: {
    totalUsers: number;
    totalPosts: number;
  };
  sortBy: 'users' | 'posts';
}

const SchoolItem = ({ school, index, rank, totals, sortBy }: SchoolItemProps) => {
  const value = sortBy === 'users' ? school.totalUsers : school.totalPosts;
  const total = sortBy === 'users' ? totals.totalUsers : totals.totalPosts;
  const percentage = (value / total) * 100;
  
  return (
    <Transition
      mounted={true}
      transition="fade"
      duration={400}
      timingFunction="ease"
      enterDelay={index * 100}
    >
      {(styles) => (
        <Group
          gap="md"
          style={{
            ...styles,
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: rank === 1 ? 'var(--mantine-color-yellow-1)' : 'var(--mantine-color-gray-1)',
              color: rank === 1 ? 'var(--mantine-color-yellow-7)' : 'var(--mantine-color-gray-7)',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            {rank === 1 ? <IconTrophy size={16} /> : rank}
          </div>
          
          <div style={{ flex: 1 }}>
            <Group justify="space-between" align="center" mb={4}>
              <Text size="sm" fw={500}>
                {school.name}
              </Text>
              <Text size="xs" c="dimmed">
                {value.toLocaleString()} {sortBy === 'users' ? 'users' : 'posts'}
              </Text>
            </Group>
            
            <Progress
              value={percentage}
              color={sortBy === 'users' ? 'blue' : 'orange'}
              size="xs"
              radius="xl"
            />
          </div>
        </Group>
      )}
    </Transition>
  );
};

interface TopSchoolsProps {
  schools?: SchoolData[];
  totals: {
    totalUsers: number;
    totalPosts: number;
  };
}

export const TopSchools = ({ schools, totals }: TopSchoolsProps) => {
  const [sortBy, setSortBy] = useState<'users' | 'posts'>('users');

  const defaultSchools: SchoolData[] = [
    {
      _id: '1',
      name: 'Harvard University',
      logoUrl: '',
      totalUsers: 2847,
      totalPosts: 3000,
    },
    {
      _id: '2',
      name: 'Stanford University',
      logoUrl: '',
      totalUsers: 2156,
      totalPosts: 2500,
    },
    {
      _id: '3',
      name: 'MIT',
      logoUrl: '',
      totalUsers: 1934,
      totalPosts: 2200,
    },
    {
      _id: '4',
      name: 'Yale University',
      logoUrl: '',
      totalUsers: 1782,
      totalPosts: 2100,
    },
    {
      _id: '5',
      name: 'Princeton University',
      logoUrl: '',
      totalUsers: 1543,
      totalPosts: 1800,
    },
  ];

  const schoolList = schools || defaultSchools;

  // Sort schools based on current selection
  const sortedSchools = [...schoolList].sort((a, b) => {
    if (sortBy === 'users') {
      return b.totalUsers - a.totalUsers;
    }
    return b.totalPosts - a.totalPosts;
  });

  const title = sortBy === 'users' ? 'Top Schools by Users' : 'Top Schools by Posts';

  return (
    <Card padding="lg" radius="md" withBorder h="100%">
      <Stack gap="md" h="100%">
        <Group justify="space-between" align="center">
          <Text size="lg" fw={600}>
            {title}
          </Text>
          
          <Group gap="xs">
            <Button
              variant={sortBy === 'users' ? 'filled' : 'light'}
              size="xs"
              leftSection={<IconUsers size={14} />}
              onClick={() => setSortBy('users')}
              color="blue"
            >
              Users
            </Button>
            <Button
              variant={sortBy === 'posts' ? 'filled' : 'light'}
              size="xs"
              leftSection={<IconMessages size={14} />}
              onClick={() => setSortBy('posts')}
              color="orange"
            >
              Posts
            </Button>
          </Group>
        </Group>
        
        <Stack gap="xs" style={{ flex: 1, overflowY: 'auto' }}>
          {sortedSchools.map((school, index) => (
            <SchoolItem
              key={`${school._id || school.name}-${sortBy}`}
              school={school}
              index={index}
              rank={index + 1}
              totals={totals}
              sortBy={sortBy}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};