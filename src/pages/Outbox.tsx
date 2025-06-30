import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Send, Clock, CheckCircle, XCircle, Pause, Play } from "lucide-react";
import { useState } from "react";
import { ComingSoonOverlay } from '@/components/ui/ComingSoonOverlay';

const outboxEmails = [
  {
    id: 1,
    to: "john.doe@example.com",
    subject: "Partnership Opportunity - Let's Connect",
    campaign: "Q4 Outreach",
    status: "scheduled",
    scheduledFor: "Today, 2:00 PM",
    opened: false,
    replied: false
  },
  {
    id: 2,
    to: "sarah.wilson@company.com",
    subject: "Product Demo - See Our Latest Features",
    campaign: "Product Launch",
    status: "sent",
    scheduledFor: "Yesterday, 10:30 AM",
    opened: true,
    replied: false
  },
  {
    id: 3,
    to: "mike.chen@startup.io",
    subject: "Investment Discussion - Let's Talk",
    campaign: "Investor Outreach",
    status: "sent",
    scheduledFor: "2 days ago, 9:15 AM",
    opened: true,
    replied: true
  },
  {
    id: 4,
    to: "lisa.garcia@enterprise.com",
    subject: "Enterprise Solution for Your Team",
    campaign: "Enterprise Sales",
    status: "failed",
    scheduledFor: "3 days ago, 11:45 AM",
    opened: false,
    replied: false
  },
  {
    id: 5,
    to: "david.brown@agency.com",
    subject: "Collaboration Proposal - Creative Partnership",
    campaign: "Partnership",
    status: "sent",
    scheduledFor: "1 week ago, 3:20 PM",
    opened: true,
    replied: false
  },
  {
    id: 6,
    to: "emily.taylor@tech.com",
    subject: "Follow-up: Our Previous Conversation",
    campaign: "Follow-up Series",
    status: "scheduled",
    scheduledFor: "Tomorrow, 1:15 PM",
    opened: false,
    replied: false
  }
];

const statusConfig = {
  scheduled: { icon: Clock, color: "text-blue-600", bg: "bg-blue-100", label: "Scheduled" },
  sent: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Sent" },
  failed: { icon: XCircle, color: "text-red-600", bg: "bg-red-100", label: "Failed" },
};

const Outbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEmails = outboxEmails.filter(email => {
    const matchesSearch = email.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || email.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              <div className="mb-6 flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Outbox</h1>
                  <p className="text-gray-600">View and manage your sent and scheduled emails</p>
                </div>
                <ComingSoonOverlay />
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">24</div>
                        <div className="text-sm text-gray-600">Scheduled</div>
                      </div>
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">156</div>
                        <div className="text-sm text-gray-600">Sent Today</div>
                      </div>
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">89</div>
                        <div className="text-sm text-gray-600">Opened</div>
                      </div>
                      <CheckCircle className="w-8 h-8 text-gray-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">3</div>
                        <div className="text-sm text-gray-600">Failed</div>
                      </div>
                      <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Email Queue
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search emails..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                        />
                      </div>
                      <select 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
                      </select>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Scheduled/Sent</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmails.map((email) => {
                        const StatusIcon = statusConfig[email.status].icon;
                        return (
                          <TableRow key={email.id}>
                            <TableCell className="font-medium">
                              {email.to}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {email.subject}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {email.campaign}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded-full ${statusConfig[email.status].bg}`}>
                                  <StatusIcon className={`w-3 h-3 ${statusConfig[email.status].color}`} />
                                </div>
                                <span className={`text-sm font-medium ${statusConfig[email.status].color}`}>
                                  {statusConfig[email.status].label}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {email.scheduledFor}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {email.opened && (
                                  <Badge variant="outline" className="text-xs">Opened</Badge>
                                )}
                                {email.replied && (
                                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Replied</Badge>
                                )}
                                {!email.opened && !email.replied && email.status === "sent" && (
                                  <span className="text-xs text-gray-500">No activity</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {email.status === "scheduled" && (
                                  <>
                                    <Button variant="ghost" size="sm">
                                      <Pause className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Send className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                                {email.status === "failed" && (
                                  <Button variant="ghost" size="sm">
                                    <Play className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Outbox;
