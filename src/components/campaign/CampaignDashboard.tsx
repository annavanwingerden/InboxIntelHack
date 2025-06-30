import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { ArrowLeft, Target, Users, Clock, Send, Mail, Edit, Save, X, Rocket, Pause, Loader, Check, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EmailTemplateSection } from "@/components/campaign/EmailTemplateSection";
import { LeadListSection } from "@/components/campaign/LeadListSection";
import { CampaignScheduleSection } from "@/components/campaign/CampaignScheduleSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCampaigns } from '@/hooks/useCampaigns';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  status: string;
}

const launchTasks = [
  "Validating email templates",
  "Preparing lead list",
  "Setting up delivery schedule",
  "Initializing tracking systems",
  "Starting email sequence",
  "Campaign launched successfully!"
];

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns();
  const campaign = campaigns?.find(c => c.id === id);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [isEditingAudience, setIsEditingAudience] = useState(false);
  const [draftGoal, setDraftGoal] = useState(campaign?.goal || "");
  const [draftAudience, setDraftAudience] = useState(campaign?.audience_description || "");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasEmailTemplate, setHasEmailTemplate] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("settings");
  const [hasSchedule, setHasSchedule] = useState(false);

  if (isLoadingCampaigns) {
    return <div className="flex items-center justify-center h-screen">Loading campaign...</div>;
  }

  if (!campaign || !campaign.id) {
    return (
      <SidebarProvider>
        <div className="min-h-screen bg-slate-50 w-full">
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
                  <Button onClick={() => navigate("/")} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "draft": return "bg-gray-100 text-gray-600";
      case "active": return "bg-blue-100 text-blue-600";
      case "paused": return "bg-yellow-100 text-yellow-600";
      case "completed": return "bg-green-100 text-green-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const saveGoal = () => {
    setIsEditingGoal(false);
    toast({
      title: "Goal updated",
      description: "Campaign goal has been successfully updated.",
    });
  };

  const cancelGoalEdit = () => {
    setDraftGoal(campaign?.goal || "");
    setIsEditingGoal(false);
  };

  const startGoalEdit = () => {
    setDraftGoal(campaign?.goal || "");
    setIsEditingGoal(true);
  };

  const saveAudience = () => {
    setIsEditingAudience(false);
    toast({
      title: "Audience updated",
      description: "Target audience has been successfully updated.",
    });
  };

  const cancelAudienceEdit = () => {
    setDraftAudience(campaign?.audience_description || "");
    setIsEditingAudience(false);
  };

  const startAudienceEdit = () => {
    setDraftAudience(campaign?.audience_description || "");
    setIsEditingAudience(true);
  };

  const handleScheduleUpdate = (startDate: string, endDate: string) => {
    setHasSchedule(!!startDate && !!endDate);
    if (startDate && endDate) {
      toast({
        title: "Schedule updated",
        description: "Campaign schedule has been successfully updated.",
      });
    }
  };

  const handleLeadsUpdate = (newLeads: Lead[]) => {
    setLeads(newLeads);
  };

  const handleEmailTemplateUpdate = (hasTemplate: boolean) => {
    setHasEmailTemplate(hasTemplate);
  };

  const handleDeleteCampaign = () => {
    toast({
      title: "Campaign Deleted",
      description: "Your campaign has been permanently deleted.",
      variant: "destructive",
    });
    navigate("/");
  };

  const canLaunchCampaign = campaign.stage === "draft" && hasEmailTemplate && leads.length > 0 && hasSchedule;

  const launchCampaign = async () => {
    setIsLaunching(true);
    setCurrentTaskIndex(0);
    
    // Animate through tasks one by one
    for (let i = 0; i < launchTasks.length; i++) {
      setCurrentTaskIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setIsLaunching(false);
    toast({
      title: "Campaign Launched! 🚀",
      description: "Your campaign is now live and emails are being sent.",
    });
  };

  const pauseCampaign = () => {
    toast({
      title: "Campaign Paused",
      description: "Your campaign has been paused. You can resume it anytime.",
    });
  };

  const resumeCampaign = () => {
    toast({
      title: "Campaign Resumed",
      description: "Your campaign is now active and running again.",
    });
  };

  const renderCampaignContent = () => {
    if (campaign.stage === "draft") {
      return (
        <>
          {/* Launch Requirements - Only show when NOT launching */}
          {!isLaunching && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Ready to Launch?</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  {hasEmailTemplate ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={hasEmailTemplate ? 'text-green-700 font-medium' : 'text-gray-600'}>
                    Email template created
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {leads.length > 0 ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={leads.length > 0 ? 'text-green-700 font-medium' : 'text-gray-600'}>
                    Target audience generated ({leads.length} leads)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {hasSchedule ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={hasSchedule ? 'text-green-700 font-medium' : 'text-gray-600'}>
                    Campaign schedule configured
                  </span>
                </div>
              </div>
              {!canLaunchCampaign && (
                <p className="text-xs text-blue-700 mt-3 italic">
                  Complete all requirements above to launch your campaign
                </p>
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{campaign.sent}</p>
                  <p className="text-gray-600 text-sm">Emails Sent</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{campaign.replies}</p>
                  <p className="text-gray-600 text-sm">Replies Received</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaign.sent > 0 ? ((campaign.replies / campaign.sent) * 100).toFixed(1) : '0'}%
                  </p>
                  <p className="text-gray-600 text-sm">Reply Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Template Section */}
          <EmailTemplateSection 
            campaign={campaign} 
            onTemplateUpdate={handleEmailTemplateUpdate}
          />

          {/* Lead List Section */}
          <LeadListSection 
            campaign={campaign} 
            onLeadsUpdate={handleLeadsUpdate}
          />

          {/* Campaign Schedule Section */}
          {campaign?.id && (
            <CampaignScheduleSection
              campaignId={campaign.id}
              onScheduleUpdate={handleScheduleUpdate}
            />
          )}
        </>
      );
    }

    // For active/paused campaigns, show stats above tabs
    return (
      <>
        {/* Stats Grid - Above Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{campaign.sent}</p>
                <p className="text-gray-600 text-sm">Emails Sent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{campaign.replies}</p>
                <p className="text-gray-600 text-sm">Replies Received</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {campaign.sent > 0 ? ((campaign.replies / campaign.sent) * 100).toFixed(1) : '0'}%
                </p>
                <p className="text-gray-600 text-sm">Reply Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs with Animation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 relative">
            <TabsTrigger 
              value="settings" 
              className="relative transition-all duration-300 ease-in-out data-[state=active]:translate-x-0"
            >
              Campaign Settings
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="relative transition-all duration-300 ease-in-out data-[state=active]:translate-x-0"
            >
              Campaign Activity
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="settings" className="space-y-6">
              {/* Email Template Section */}
              <EmailTemplateSection 
                campaign={campaign} 
                onTemplateUpdate={handleEmailTemplateUpdate}
              />

              {/* Lead List Section */}
              <LeadListSection 
                campaign={campaign} 
                onLeadsUpdate={handleLeadsUpdate}
              />

              {/* Campaign Schedule Section */}
              {campaign?.id && (
                <CampaignScheduleSection
                  campaignId={campaign.id}
                  onScheduleUpdate={handleScheduleUpdate}
                />
              )}
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-6">
              {/* Campaign Dashboard */}
              {/* Add the CampaignDashboard component here */}
            </TabsContent>
          </div>
        </Tabs>
      </>
    );
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-slate-50 w-full">
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 space-y-6">
                {/* Header with back button */}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/")}
                    className="hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </div>

                {/* Campaign Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-red-600">Delete Campaign</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you absolutely sure you want to delete "{campaign.name}"? This action cannot be undone. 
                                All campaign data, email templates, lead lists, and analytics will be permanently removed.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleDeleteCampaign}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Yes, Delete Campaign
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(campaign.stage)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-gray-600">Created on {new Date(campaign.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-3">
                      {campaign.stage === "draft" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Button 
                                onClick={launchCampaign}
                                disabled={isLaunching || !canLaunchCampaign}
                                className={`${
                                  canLaunchCampaign 
                                    ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600" 
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                {isLaunching ? (
                                  <>
                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                    Launching Campaign...
                                  </>
                                ) : (
                                  <>
                                    <Rocket className="w-4 h-4 mr-2" />
                                    Launch Campaign
                                  </>
                                )}
                              </Button>
                            </div>
                          </TooltipTrigger>
                          {!canLaunchCampaign && (
                            <TooltipContent>
                              <p>Complete all setup requirements below to launch your campaign</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      )}
                      {campaign.stage === "active" && (
                        <Button onClick={pauseCampaign} variant="outline">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause Campaign
                        </Button>
                      )}
                      {campaign.stage === "paused" && (
                        <Button onClick={resumeCampaign} className="bg-green-600 hover:bg-green-700">
                          <Rocket className="w-4 h-4 mr-2" />
                          Resume Campaign
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Campaign Goal and Audience in Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Campaign Goal */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Campaign Goal</h3>
                        {!isEditingGoal && (
                          <Button onClick={startGoalEdit} variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {isEditingGoal ? (
                        <div className="space-y-2">
                          <Input
                            value={draftGoal}
                            onChange={(e) => setDraftGoal(e.target.value)}
                            className="w-full"
                            placeholder="Enter campaign goal..."
                          />
                          <div className="flex gap-2">
                            <Button onClick={saveGoal} size="sm" className="bg-green-600 hover:bg-green-700">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button onClick={cancelGoalEdit} size="sm" variant="outline">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{campaign.goal}</p>
                      )}
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Target Audience</h3>
                        {!isEditingAudience && (
                          <Button onClick={startAudienceEdit} variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {isEditingAudience ? (
                        <div className="space-y-2">
                          <Textarea
                            value={draftAudience}
                            onChange={(e) => setDraftAudience(e.target.value)}
                            className="min-h-[80px]"
                            placeholder="Describe your target audience..."
                          />
                          <div className="flex gap-2">
                            <Button onClick={saveAudience} size="sm" className="bg-green-600 hover:bg-green-700">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button onClick={cancelAudienceEdit} size="sm" variant="outline">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{campaign.audience_description}</p>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Campaign Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Launching Animation - Only show when launching */}
                {isLaunching && (
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <Loader className="w-16 h-16 text-blue-500 animate-spin" />
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">Launching Your Campaign...</h3>
                        <div className="relative h-20 overflow-hidden">
                          <div 
                            className="absolute w-full transition-transform duration-500 ease-in-out space-y-1"
                            style={{ transform: `translateY(-${currentTaskIndex * 24}px)` }}
                          >
                            {launchTasks.map((task, index) => (
                              <p 
                                key={index}
                                className={`text-sm transition-opacity duration-300 ${
                                  index === currentTaskIndex 
                                    ? 'text-blue-600 font-medium opacity-100' 
                                    : index < currentTaskIndex 
                                      ? 'text-green-600 opacity-60' 
                                      : 'text-gray-400 opacity-40'
                                }`}
                              >
                                {index <= currentTaskIndex ? '✓' : '○'} {task}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Campaign Content */}
                {renderCampaignContent()}
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}