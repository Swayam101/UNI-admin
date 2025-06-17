import { Card, Stack, Text, Group, Progress, Transition } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';

interface SchoolData {
  name: string;
  studentCount: number;
  maxStudents: number;
  color: string;
}

interface SchoolItemProps {
  school: SchoolData;
  index: number;
  rank: number;
}

const SchoolItem = ({ school, index, rank }: SchoolItemProps) => {
  const percentage = (school.studentCount / school.maxStudents) * 100;
  
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
                {school.studentCount.toLocaleString()} students
              </Text>
            </Group>
            
            <Progress
              value={percentage}
              color={school.color}
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
  title?: string;
}

export const TopSchools = ({ schools, title = "Top Schools by Activity" }: TopSchoolsProps) => {
  const defaultSchools: SchoolData[] = [
    {
      name: 'Harvard University',
      studentCount: 2847,
      maxStudents: 3000,
      color: 'red',
    },
    {
      name: 'Stanford University',
      studentCount: 2156,
      maxStudents: 2500,
      color: 'blue',
    },
    {
      name: 'MIT',
      studentCount: 1934,
      maxStudents: 2200,
      color: 'green',
    },
    {
      name: 'Yale University',
      studentCount: 1782,
      maxStudents: 2100,
      color: 'purple',
    },
    {
      name: 'Princeton University',
      studentCount: 1543,
      maxStudents: 1800,
      color: 'orange',
    },
  ];

  const schoolList = schools || defaultSchools;

  return (
    <Card padding="lg" radius="md" withBorder h="100%">
      <Stack gap="md" h="100%">
        <Text size="lg" fw={600}>
          {title}
        </Text>
        
        <Stack gap="xs" style={{ flex: 1, overflowY: 'auto' }}>
          {schoolList.map((school, index) => (
            <SchoolItem
              key={school.name}
              school={school}
              index={index}
              rank={index + 1}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}; 