import { useState, useEffect } from "react";
import { Users, Edit, Save, X, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from '@/lib/api';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  status: string;
}

interface Campaign {
  id: string;
  audience: string;
}

interface LeadListSectionProps {
  campaign: Campaign;
  onLeadsUpdate: (leads: Lead[]) => void;
}

export function LeadListSection({ campaign, onLeadsUpdate }: LeadListSectionProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLead, setNewLead] = useState<Partial<Lead>>({ first_name: '', last_name: '', email: '', company: '', status: 'pending' });
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch leads on mount
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.fetchLeads(campaign.id);
        if (res && res.leads) {
          setLeads(res.leads);
          onLeadsUpdate(res.leads);
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch leads.');
      }
      setLoading(false);
    };
    if (campaign?.id) fetchLeads();
    // eslint-disable-next-line
  }, [campaign?.id]);

  // Add a new lead
  const handleAddLead = async () => {
    setError(null);
    if (!campaign.id || typeof campaign.id !== 'string' || campaign.id.trim() === '') {
      setError('Campaign ID is missing or invalid.');
      return;
    }
    if (!newLead.first_name || !newLead.email) {
      setError('First name and email are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.addLeads(campaign.id, [newLead]);
      if (res && res.leads) {
        const updatedLeads = [...leads, ...res.leads];
        setLeads(updatedLeads);
        onLeadsUpdate(updatedLeads);
        setIsDialogOpen(false);
        setNewLead({ first_name: '', last_name: '', email: '', company: '', status: 'pending' });
      } else {
        setError('Failed to add lead. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to add lead. Please check your input and try again.');
    }
    setLoading(false);
  };

  // Delete a lead
  const deleteLead = async (leadId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.deleteLead(leadId);
      if (res && res.success) {
        const updatedLeads = leads.filter(lead => lead.id !== leadId);
        setLeads(updatedLeads);
        onLeadsUpdate(updatedLeads);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to delete lead.');
    }
    setLoading(false);
  };

  // Update a lead
  const updateLead = async (updatedLead: Lead) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.updateLead(updatedLead.id, {
        first_name: updatedLead.first_name,
        last_name: updatedLead.last_name,
        email: updatedLead.email,
        company: updatedLead.company,
        status: updatedLead.status,
      });
      if (res && res.lead) {
        const updatedLeads = leads.map(lead => lead.id === updatedLead.id ? res.lead : lead);
        setLeads(updatedLeads);
        onLeadsUpdate(updatedLeads);
        setEditingLead(null);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update lead.');
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>
              Manually add and manage your list of leads for this campaign.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                <Label>First Name</Label>
                <Input value={newLead.first_name || ''} onChange={e => setNewLead({ ...newLead, first_name: e.target.value })} />
                <Label>Last Name</Label>
                <Input value={newLead.last_name || ''} onChange={e => setNewLead({ ...newLead, last_name: e.target.value })} />
                <Label>Email</Label>
                <Input value={newLead.email || ''} onChange={e => setNewLead({ ...newLead, email: e.target.value })} />
                <Label>Company</Label>
                <Input value={newLead.company || ''} onChange={e => setNewLead({ ...newLead, company: e.target.value })} />
                <Button className="mt-2 w-full" onClick={handleAddLead} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Lead'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No leads yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Add leads manually to start building your campaign audience.
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto space-y-2">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                {editingLead?.id === lead.id ? (
                  <div className="flex-1 grid grid-cols-5 gap-2">
                    <Input
                      value={editingLead.first_name}
                      onChange={(e) => setEditingLead({ ...editingLead, first_name: e.target.value })}
                      placeholder="First Name"
                    />
                    <Input
                      value={editingLead.last_name}
                      onChange={(e) => setEditingLead({ ...editingLead, last_name: e.target.value })}
                      placeholder="Last Name"
                    />
                    <Input
                      value={editingLead.email}
                      onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                      placeholder="Email"
                    />
                    <Input
                      value={editingLead.company}
                      onChange={(e) => setEditingLead({ ...editingLead, company: e.target.value })}
                      placeholder="Company"
                    />
                    <Input
                      value={editingLead.status}
                      onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
                      placeholder="Status"
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{lead.first_name} {lead.last_name}</p>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{lead.company}</p>
                        <p className="text-sm text-gray-600">{lead.status}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  {editingLead?.id === lead.id ? (
                    <>
                      <Button size="sm" onClick={() => updateLead(editingLead)}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingLead(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => setEditingLead(lead)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteLead(lead.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
