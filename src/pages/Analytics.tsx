import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Mail, Users, Target, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ComingSoonOverlay } from '@/components/ui/ComingSoonOverlay';

const campaignData = [
  { name: "Week 1", sent: 120, opened: 48, replied: 12 },
  { name: "Week 2", sent: 150, opened: 67, replied: 18 },
  { name: "Week 3", sent: 180, opened: 89, replied: 24 },
  { name: "Week 4", sent: 200, opened: 95, replied: 31 },
];

const responseData = [
  { name: "Mon", responses: 4 },
  { name: "Tue", responses: 7 },
  { name: "Wed", responses: 12 },
  { name: "Thu", responses: 8 },
  { name: "Fri", responses: 15 },
  { name: "Sat", responses: 3 },
  { name: "Sun", responses: 5 },
];

const pieData = [
  { name: "Opened", value: 35, color: "#10b981" },
  { name: "Replied", value: 15, color: "#3b82f6" },
  { name: "Bounced", value: 5, color: "#ef4444" },
  { name: "Unopened", value: 45, color: "#e5e7eb" },
];

const Analytics = () => {
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
                  <p className="text-gray-600">Track your campaign performance and reply rates</p>
                </div>
                <ComingSoonOverlay />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Sent</CardTitle>
                      <Mail className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">1,247</div>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Open Rate</CardTitle>
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">47.5%</div>
                    <p className="text-xs text-green-600 mt-1">+3.2% from last month</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Reply Rate</CardTitle>
                      <Target className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">15.2%</div>
                    <p className="text-xs text-red-600 mt-1">-1.1% from last month</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
                      <Clock className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-gray-900">2.4h</div>
                    <p className="text-xs text-green-600 mt-1">-0.5h from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Campaign Performance */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Campaign Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={campaignData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Bar dataKey="sent" fill="url(#sentGradient)" name="Sent" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="opened" fill="url(#openedGradient)" name="Opened" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="replied" fill="url(#repliedGradient)" name="Replied" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e0e7ff" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#c7d2fe" stopOpacity={0.3}/>
                          </linearGradient>
                          <linearGradient id="openedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#dbeafe" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#bfdbfe" stopOpacity={0.3}/>
                          </linearGradient>
                          <linearGradient id="repliedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#d1fae5" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#a7f3d0" stopOpacity={0.3}/>
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Response Timeline */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Daily Responses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={responseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Line 
                          type="monotone" 
                          dataKey="responses" 
                          stroke="url(#lineGradient)"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                        />
                        <defs>
                          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Email Status Distribution */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Email Status Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                              stroke="#ffffff"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center mt-4 space-x-6">
                      {pieData.map((entry, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performing Campaigns */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Top Performing Campaigns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Q4 Product Launch", openRate: "62%", replyRate: "24%" },
                        { name: "Holiday Outreach", openRate: "58%", replyRate: "19%" },
                        { name: "Partnership Proposal", openRate: "51%", replyRate: "16%" },
                        { name: "Follow-up Series", openRate: "45%", replyRate: "12%" },
                      ].map((campaign, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-600">
                              Open: {campaign.openRate} • Reply: {campaign.replyRate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
