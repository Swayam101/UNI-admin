// theme.ts
import { MantineThemeOverride, MantineTheme } from '@mantine/core';

const theme: MantineThemeOverride = {
  primaryColor: 'blue', // Primary accent color
  defaultRadius: 'md',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.3' },
      h2: { fontSize: '2rem', lineHeight: '1.35' },
      h3: { fontSize: '1.75rem', lineHeight: '1.4' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', lineHeight: '1.5' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
    },
  },
  colors: {
    // Dark theme optimized colors
    dark: [
      '#C1C2C5', '#A6A7AB', '#909296', '#5c5f66',
      '#373A40', '#2C2E33', '#25262b', '#1A1B1E',
      '#141517', '#101113',
    ],
    blue: [
      '#e7f5ff', '#d0ebff', '#a5d8ff', '#74c0fc',
      '#4dabf7', '#339af0', '#228be6', '#1c7ed6',
      '#1971c2', '#1864ab',
    ],
    green: [
      '#ebfbee', '#d3f9d8', '#b2f2bb', '#8ce99a',
      '#69db7c', '#51cf66', '#40c057', '#37b24d',
      '#2f9e44', '#2b8a3e',
    ],
    red: [
      '#fff5f5', '#ffe3e3', '#ffc9c9', '#ffa8a8',
      '#ff8787', '#ff6b6b', '#fa5252', '#f03e3e',
      '#e03131', '#c92a2a',
    ],
    yellow: [
      '#fff9db', '#fff3bf', '#ffec99', '#ffe066',
      '#ffd43b', '#fcc419', '#fab005', '#f59f00',
      '#f08c00', '#e67700',
    ],
    orange: [
      '#fff4e6', '#ffe8cc', '#ffd8a8', '#ffc078',
      '#ffa94d', '#ff922b', '#fd7e14', '#f76707',
      '#e8590c', '#d9480f',
    ],
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },
  shadows: {
    xs: '0 1px 3px rgba(0,0,0,0.12)',
    sm: '0 2px 6px rgba(0,0,0,0.16)',
    md: '0 4px 12px rgba(0,0,0,0.20)',
    lg: '0 8px 20px rgba(0,0,0,0.25)',
    xl: '0 12px 24px rgba(0,0,0,0.30)',
  },
  components: {
    Button: {
      styles: () => ({
        root: {
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      }),
    },
    Card: {
      styles: () => ({
        root: {
          borderRadius: '12px',
          transition: 'all 0.2s ease',
        },
      }),
    },
    NavLink: {
      styles: (theme: MantineTheme) => ({
        root: {
          borderRadius: theme.radius.md,
          transition: 'all 0.2s ease',
        },
      }),
    },
  },
};

export default theme;
