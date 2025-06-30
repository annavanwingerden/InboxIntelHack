import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Bell, Shield, Database, Trash2 } from "lucide-react";
import { ComingSoonOverlay } from '@/components/ui/ComingSoonOverlay';

const Settings = () => {
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                  <p className="text-gray-600">Manage your account, integrations, and preferences</p>
                </div>
                <ComingSoonOverlay />
              </div>

              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 max-w-md">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="notifications">Alerts</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <User className="w-5 h-5" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Alex"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Johnson"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="alex@example.com"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          defaultValue="InboxIntel Inc."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        />
                      </div>
                      <Button className="bg-gray-900 text-white hover:bg-gray-800">
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="email" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Mail className="w-5 h-5" />
                        Email Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            SMTP Server
                          </label>
                          <input
                            type="text"
                            defaultValue="smtp.gmail.com"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Port
                          </label>
                          <input
                            type="text"
                            defaultValue="587"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          From Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Alex Johnson"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reply-To Email
                        </label>
                        <input
                          type="email"
                          defaultValue="alex@example.com"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Gmail Connected</div>
                          <div className="text-sm text-gray-600">alex@example.com</div>
                        </div>
                        <Button variant="outline">Reconnect</Button>
                      </div>
                      <Button className="bg-gray-900 text-white hover:bg-gray-800">
                        Save Email Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Bell className="w-5 h-5" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { label: "Email Replies", description: "Get notified when someone replies to your emails", defaultChecked: true },
                        { label: "Campaign Updates", description: "Receive updates about your campaign performance", defaultChecked: true },
                        { label: "Daily Summary", description: "Get a daily summary of your email activity", defaultChecked: false },
                        { label: "Weekly Reports", description: "Receive weekly performance reports", defaultChecked: true },
                        { label: "System Updates", description: "Get notified about system maintenance and updates", defaultChecked: false },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                          </div>
                          <Switch defaultChecked={item.defaultChecked} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Shield className="w-5 h-5" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
                        <div className="space-y-3">
                          <input
                            type="password"
                            placeholder="Current password"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                          />
                          <input
                            type="password"
                            placeholder="New password"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                          />
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                          />
                        </div>
                        <Button className="mt-3 bg-gray-900 text-white hover:bg-gray-800">
                          Update Password
                        </Button>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Enable 2FA</div>
                            <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="data" className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <Database className="w-5 h-5" />
                        Data Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Export Data</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Download all your campaign data, contacts, and email history
                        </p>
                        <Button variant="outline">Export All Data</Button>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-medium text-gray-900 mb-2 text-red-600">Danger Zone</h3>
                        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <div className="flex items-start gap-3">
                            <Trash2 className="w-5 h-5 text-red-600 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-medium text-red-900 mb-1">Delete Account</h4>
                              <p className="text-sm text-red-700 mb-3">
                                Permanently delete your account and all associated data. This action cannot be undone.
                              </p>
                              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
