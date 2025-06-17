import { useState, useEffect } from 'react';
import {
  Card,
  Stack,
  Group,
  Badge,
  Text,
} from '@mantine/core';
import {
  IconCloudRain,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';

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

// Weather Icon Component - Clean Style
const WeatherIcon = ({ type, size = 16 }: { type: string; size?: number }) => {
  const iconMap: Record<string, Icon> = {
    rain: IconCloudRain,
    // Add more weather types as needed
  };
  
  const IconComponent = iconMap[type] || IconCloudRain;
  
  return (
    <IconComponent 
      size={size} 
      color="var(--mantine-color-blue-6)"
    />
  );
};

// Weather Forecast Item Component - Clean Style
const WeatherForecastItem = ({ 
  time, 
  temperature, 
  weatherType, 
  isNow = false 
}: { 
  time: string; 
  temperature: number; 
  weatherType: string; 
  isNow?: boolean;
}) => (
  <Stack align="center" gap="xs">
    <WeatherIcon type={weatherType} size={20} />
    <Text fw={600} size="sm" c="blue">
      {temperature}°C
    </Text>
    <Text size="xs" c="dimmed" fw={500}>
      {isNow ? 'Now' : time}
    </Text>
  </Stack>
);

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
  
  // Sample weather data
  const weatherData = [
    { time: 'Now', temperature: 12, weatherType: 'rain', isNow: true },
    { time: '14:00', temperature: 11, weatherType: 'rain', isNow: false },
    { time: '15:00', temperature: 10, weatherType: 'rain', isNow: false },
  ];
  
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
        
        {/* Weather Section */}
        <Group gap="lg" justify="center" align="flex-end">
          {weatherData.map((item, index) => (
            <WeatherForecastItem
              key={index}
              time={item.time}
              temperature={item.temperature}
              weatherType={item.weatherType}
              isNow={item.isNow}
            />
          ))}
        </Group>
      </Stack>
    </Card>
  );
}; 