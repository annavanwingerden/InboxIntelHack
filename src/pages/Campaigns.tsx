import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Clock, Send, MessageSquare, CheckCircle, Plus, Filter, Search, Calendar } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewCampaignForm } from "@/components/forms/NewCampaignForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCampaigns } from "@/hooks/useCampaigns";

interface Campaign {
  id: string;
  name: string;
  stage: string;
  sent: number;
  replies: number;
  status: string;
  goal: string;
  progress: number;
  createdAt: string;
  replyRate: number;
}

const getStageIcon = (stage: string) => {
  switch (stage) {
    case "draft": return Clock;
    case "active": return Send;
    case "paused": return MessageSquare;
    case "completed": return CheckCircle;
    default: return Target;
  }
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case "draft": return "bg-gray-100 text-gray-600";
    case "active": return "bg-blue-100 text-blue-600";
    case "paused": return "bg-yellow-100 text-yellow-600";
    case "completed": return "bg-green-100 text-green-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

const getBadgeVariant = (stage: string) => {
  switch (stage) {
    case "active": return "default";
    case "completed": return "secondary";
    case "paused": return "outline";
    case "draft": return "outline";
    default: return "outline";
  }
};

const getBadgeClassName = (stage: string) => {
  switch (stage) {
    case "active": return "bg-blue-100 text-blue-600 hover:bg-blue-200";
    case "completed": return "bg-green-100 text-green-600 hover:bg-green-200";
    case "paused": return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200";
    case "draft": return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    default: return "";
  }
};

export default function Campaigns() {
  const { data: campaigns = [], isLoading } = useCampaigns();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.goal.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.stage === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "progress": return b.progress - a.progress;
        case "replyRate": return b.replyRate - a.replyRate;
        case "recent":
        default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.stage === "active").length,
    draft: campaigns.filter(c => c.stage === "draft").length,
    completed: campaigns.filter(c => c.stage === "completed").length,
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 space-y-6">
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
                  <p className="text-gray-600">
                    Manage and track all your cold email campaigns
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Plus className="w-4 h-4 mr-2" />
                      New Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <NewCampaignForm
                      onFormSubmit={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-gray-600 text-sm">Total Campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                        <p className="text-gray-600 text-sm">Active Campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                        <p className="text-gray-600 text-sm">Draft Campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                        <p className="text-gray-600 text-sm">Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Search */}
              <Card>
                <CardHeader>
                  <CardTitle>All Campaigns</CardTitle>
                  <CardDescription>
                    Search, filter, and manage your campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search campaigns..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <Calendar className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="progress">Progress</SelectItem>
                        <SelectItem value="replyRate">Reply Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Campaigns Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCampaigns.map((campaign) => {
                      const StageIcon = getStageIcon(campaign.stage);
                      return (
                        <Card
                          key={campaign.id}
                          className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                          onClick={() => handleCampaignClick(campaign.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className={`p-2 rounded-lg ${getStageColor(campaign.stage)}`}>
                                <StageIcon className="w-4 h-4" />
                              </div>
                              <Badge 
                                variant={getBadgeVariant(campaign.stage)}
                                className={getBadgeClassName(campaign.stage)}
                              >
                                {campaign.status}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                              {campaign.name}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {campaign.goal}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>📤 {campaign.sent} sent</span>
                                <span>💬 {campaign.replies} replies</span>
                                <span>📊 {campaign.replyRate}%</span>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{campaign.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${campaign.progress}%` }}
                                  />
                                </div>
                              </div>
                              
                              <div className="text-xs text-gray-500">
                                Created on {new Date(campaign.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Empty state */}
                  {filteredCampaigns.length === 0 && (
                    <div className="text-center py-12">
                      <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchTerm || statusFilter !== "all" 
                          ? "Try adjusting your search or filter criteria"
                          : "Create your first campaign to get started"
                        }
                      </p>
                      {!searchTerm && statusFilter === "all" && (
                        <Button 
                          onClick={() => setIsDialogOpen(true)}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Campaign
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
