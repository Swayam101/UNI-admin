import { useState, useEffect } from 'react';
import {
  Card,
  Stack,
  Group,
  Badge,
  Text,
} from '@mantine/core';

// Digital Clock Component - Clean Style
const DigitalClock = ({ time }: { time: Date }) => {
  const timeString = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  });
  
  return (
    <Group gap="xs" align="center">
      <Text 
        size="lg" 
        fw={700} 
        style={{ 
          fontFamily: 'monospace',
          letterSpacing: '2px',
          color: 'var(--mantine-color-blue-6)'
        }}
      >
        {timeString}
      </Text>
      <Text 
        size="xs" 
        c="dimmed"
        tt="uppercase"
        fw={500}
      >
        {time.toLocaleTimeString('en-US', { 
          hour12: true 
        }).split(' ')[1]}
      </Text>
    </Group>
  );
};

// Main Weather Widget Component - Clean and Consistent
export const WeatherWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second for smoother digital clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Card 
      padding="md" 
      radius="md" 
      withBorder
      style={{
        minWidth: 320,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <Stack gap="md">
        {/* Time and Date Row */}
        <Group justify="space-between" align="center">
          {/* Digital Clock */}
          <DigitalClock time={currentTime} />
          
          {/* Date and Day */}
          <Group gap="xs" align="center">
            <Badge variant="light" color="blue" size="sm">
              {currentTime.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              })}
            </Badge>
            <Badge variant="outline" color="gray" size="sm">
              {currentTime.toLocaleDateString('en-US', { weekday: 'short' })}
            </Badge>
          </Group>
        </Group>
        

      </Stack>
    </Card>
  );
}; 