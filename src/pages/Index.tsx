import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CampaignPipeline } from "@/components/dashboard/CampaignPipeline";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useAuth } from "@/hooks/useAuth";
import { useGmailConnection } from "@/hooks/useGmailConnection";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardContent = ({ campaigns, isLoading, userName }) => (
  <>
    {/* Welcome Section */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {userName} 👋
      </h1>
      <p className="text-gray-600">
        Track your cold email campaigns and optimize your outreach strategy
      </p>
    </div>
    <StatsCards campaigns={campaigns} isLoading={isLoading} />
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <CampaignPipeline campaigns={campaigns} isLoading={isLoading} />
      </div>
      <div className="xl:col-span-1">
        <ActivityTimeline campaigns={campaigns} isLoading={isLoading} />
      </div>
    </div>
  </>
);

const ConnectGmailPrompt = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectGmail = async () => {
    setIsConnecting(true);
    const { data, error } = await api.startGmailAuth();
    if (error) {
      console.error("Error connecting to Gmail:", error);
      setIsConnecting(false);
      // You might want to show a toast notification here
    }
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Connect your Gmail Account</CardTitle>
          <CardDescription>
            To start sending campaigns, you need to connect your Gmail account first.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleConnectGmail} disabled={isConnecting}>
            {isConnecting ? "Redirecting..." : "Connect Gmail"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Index = () => {
  const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns();
  const { data: isGmailConnected, isLoading: isLoadingConnection } = useGmailConnection();
  const { session } = useAuth();
  const user = session?.user;
  const userName =
    user?.user_metadata?.first_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'User';
  
  const isLoading = isLoadingCampaigns || isLoadingConnection;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 space-y-6">
              {isLoading ? (
                <DashboardContent campaigns={[]} isLoading={true} userName={userName} />
              ) : isGmailConnected ? (
                <DashboardContent campaigns={campaigns || []} isLoading={false} userName={userName} />
              ) : (
                <ConnectGmailPrompt />
              )}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
