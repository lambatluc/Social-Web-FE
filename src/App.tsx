import { Toaster } from "@/components/ui/toaster";
import { AppRouter } from "@/router";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <AppRouter />
      <Toaster />
    </main>
  );
};

export default App;
