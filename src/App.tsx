import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useContext, useState, ReactNode } from "react";
import theme from "./theme/mainTheme";
import { queryClient } from "./lib/queryClient";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Theme Context
interface ThemeContextType {
  colorScheme: 'light' | 'dark';
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
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

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <Notifications />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
          {/* React Query DevTools - only in development */}
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </ModalsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
