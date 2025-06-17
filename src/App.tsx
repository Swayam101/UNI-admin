import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Updated imports using the new structure
import { ThemeProvider } from "./context/ThemeContext";
import { queryClient } from "./lib/queryClient";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <Notifications />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          {/* React Query DevTools - only in development */}
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </ModalsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
