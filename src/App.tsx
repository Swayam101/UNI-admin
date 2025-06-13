import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./contexts/ThemeContext";
import { queryClient } from "./lib/queryClient";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

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
