import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

// Pages
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import CampaignDetails from "./pages/CampaignDetails";
import Analytics from "./pages/Analytics";
import Inbox from "./pages/Inbox";
import Settings from "./pages/Settings";
import Outbox from "./pages/Outbox";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { session, loading } = useAuth();

  if (loading) {
    // You can return a global loading spinner here
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={!session ? <Landing /> : <Navigate to="/dashboard" replace />} />
      <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/dashboard" replace />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/auth/callback/google" element={<AuthCallback />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
      <Route path="/campaign/:id" element={<ProtectedRoute><CampaignDetails /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
      <Route path="/outbox" element={<ProtectedRoute><Outbox /></ProtectedRoute>} />
      <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
