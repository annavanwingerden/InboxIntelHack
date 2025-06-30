import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Archive, Star, Reply, Forward, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ComingSoonOverlay } from '@/components/ui/ComingSoonOverlay';

const emails = [
  {
    id: 1,
    from: "john.doe@example.com",
    subject: "Re: Partnership Opportunity",
    preview: "Thanks for reaching out! I'm very interested in discussing this further...",
    time: "2 min ago",
    isRead: false,
    isStarred: true,
    campaign: "Q4 Outreach"
  },
  {
    id: 2,
    from: "sarah.wilson@company.com",
    subject: "Re: Product Demo Request",
    preview: "I'd love to schedule a demo for next week. What times work best for you?",
    time: "15 min ago",
    isRead: false,
    isStarred: false,
    campaign: "Product Launch"
  },
  {
    id: 3,
    from: "mike.chen@startup.io",
    subject: "Re: Investment Discussion",
    preview: "Your proposal looks interesting. Can we set up a call to discuss the details?",
    time: "1 hour ago",
    isRead: true,
    isStarred: false,
    campaign: "Investor Outreach"
  },
  {
    id: 4,
    from: "lisa.garcia@enterprise.com",
    subject: "Re: Enterprise Solution Inquiry",
    preview: "We're evaluating different solutions for our team. Could you provide more information about pricing?",
    time: "3 hours ago",
    isRead: true,
    isStarred: true,
    campaign: "Enterprise Sales"
  },
  {
    id: 5,
    from: "david.brown@agency.com",
    subject: "Re: Collaboration Proposal",
    preview: "This sounds like a great opportunity. Let's discuss how we can move forward.",
    time: "Yesterday",
    isRead: true,
    isStarred: false,
    campaign: "Partnership"
  }
];

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [searchTerm, setSearchTerm] = useState("");

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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Inbox</h1>
                  <p className="text-gray-600">Manage your email responses and conversations</p>
                </div>
                <ComingSoonOverlay />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
                {/* Email List */}
                <div className="lg:col-span-1">
                  <Card className="border-0 shadow-sm h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          Messages
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Filter className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search emails..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-0 overflow-y-auto">
                      <div className="space-y-1">
                        {emails.map((email) => (
                          <div
                            key={email.id}
                            onClick={() => setSelectedEmail(email)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedEmail.id === email.id ? 'bg-gray-100' : ''
                            } ${!email.isRead ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {email.isStarred && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                )}
                                <span className={`text-sm ${!email.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                  {email.from}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">{email.time}</span>
                            </div>
                            <div className={`text-sm mb-2 ${!email.isRead ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                              {email.subject}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-2 mb-2">
                              {email.preview}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {email.campaign}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Email Content */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-sm h-full">
                    <CardHeader className="border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {selectedEmail.subject}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            From: {selectedEmail.from} • {selectedEmail.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Star className={`w-4 h-4 ${selectedEmail.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Archive className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-6">
                      <div className="mb-6">
                        <Badge variant="secondary" className="mb-4">
                          Campaign: {selectedEmail.campaign}
                        </Badge>
                        <div className="prose max-w-none text-gray-700">
                          <p className="mb-4">Hi there,</p>
                          <p className="mb-4">{selectedEmail.preview}</p>
                          <p className="mb-4">
                            I've reviewed your proposal and I think there's a great opportunity for us to work together. 
                            The solution you've outlined addresses exactly what we've been looking for.
                          </p>
                          <p className="mb-4">
                            Could we schedule a call next week to discuss the implementation timeline and pricing details? 
                            I'm available Tuesday through Thursday between 10 AM and 4 PM EST.
                          </p>
                          <p className="mb-4">
                            Looking forward to hearing from you soon.
                          </p>
                          <p>Best regards,<br />
                          {selectedEmail.from.split('@')[0].replace('.', ' ')}</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Button className="bg-gray-900 text-white hover:bg-gray-800">
                            <Reply className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                          <Button variant="outline">
                            <Forward className="w-4 h-4 mr-2" />
                            Forward
                          </Button>
                        </div>
                        <textarea
                          placeholder="Type your reply..."
                          className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Inbox;
