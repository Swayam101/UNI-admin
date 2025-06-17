import { MantineProvider } from "@mantine/core";
import { useState, ReactNode } from "react";
import theme from "../styles/themes/theme/mainTheme";
import { ThemeContext } from "./theme";

// Theme Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(() => {
    // Check localStorage for saved preference, default to dark
    const saved = localStorage.getItem('mantine-color-scheme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newColorScheme);
    localStorage.setItem('mantine-color-scheme', newColorScheme);
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <MantineProvider theme={theme} defaultColorScheme={colorScheme} forceColorScheme={colorScheme}>
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
}; 