import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ProjectCivicResolve from './pages/ProjectCivicResolve';
import ProjectDashboard from './pages/ProjectDashboard';
import ProjectAnnadaan from './pages/ProjectAnnadaan';
import ProjectFlashcards from './pages/ProjectFlashcards';
import ScrollToTopRoute from './components/ScrollToTopRoute';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTopRoute />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project/civicresolve" element={<ProjectCivicResolve />} />
          <Route path="/project/dashboard" element={<ProjectDashboard />} />
          <Route path="/project/annadaan" element={<ProjectAnnadaan />} />
          <Route path="/project/flashcards" element={<ProjectFlashcards />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
