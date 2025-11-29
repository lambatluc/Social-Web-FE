import { AppRouter } from "@/router";
import { Toaster } from 'react-hot-toast';

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex h-screen">
        <AppRouter />
        <Toaster/>
      </main>
    </QueryClientProvider>
  );
};

export default App;
