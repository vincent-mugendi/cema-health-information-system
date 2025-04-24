import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import ClientDetail from "@/pages/ClientDetail";
import Programs from "@/pages/Programs";
import Enroll from "@/pages/Enroll";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/clients" element={<MainLayout><Clients /></MainLayout>} />
        <Route path="/clients/:id" element={<MainLayout><ClientDetail /></MainLayout>} />
        <Route path="/programs" element={<MainLayout><Programs /></MainLayout>} />
        <Route path="/enroll" element={<MainLayout><Enroll /></MainLayout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </QueryClientProvider>
);

export default App;
