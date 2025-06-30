import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Updated imports using the new structure
import { ThemeProvider } from "./context/ThemeContext";
import { ErrorBoundary, ErrorTester } from "./components/common";
import { queryClient } from "./lib/queryClient";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ModalsProvider>
            <Notifications />
                      <BrowserRouter>
            <AppRoutes />
            <ErrorTester />
          </BrowserRouter>
            {/* React Query DevTools - only in development */}
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </ModalsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
