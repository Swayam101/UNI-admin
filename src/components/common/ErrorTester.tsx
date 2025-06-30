import { Button, Group, Text, Box, Alert } from '@mantine/core';
import { IconBug, IconAlertTriangle } from '@tabler/icons-react';
import { useState } from 'react';

const ErrorTester = () => {
  const [shouldError, setShouldError] = useState(false);

  // Only show in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  if (shouldError) {
    // This will trigger the error boundary
    throw new Error('Test error triggered by ErrorTester component');
  }

  return (
    <Box p="md" style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <Alert
        icon={<IconAlertTriangle size={16} />}
        title="Development Tools"
        color="orange"
        radius="md"
        variant="light"
        style={{
          border: '1px solid var(--mantine-color-orange-3)',
          background: 'var(--mantine-color-orange-0)',
        }}
      >
        <Group gap="sm" mt="xs">
          <Text size="xs">Test error handling:</Text>
          <Button
            size="xs"
            variant="outline"
            color="red"
            leftSection={<IconBug size={12} />}
            onClick={() => setShouldError(true)}
          >
            Trigger Error
          </Button>
        </Group>
      </Alert>
    </Box>
  );
};

export default ErrorTester; 