import { createSupabaseClient } from '@/lib/supabaseClient';

const supabase = createSupabaseClient();

export const api = {
  // Campaigns
  getCampaigns: () => supabase.functions.invoke('campaign-manager', { method: 'GET' }),
  createCampaign: async (campaignData) => {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Add user_id to the campaign data
    const campaignWithUser = {
      ...campaignData,
      user_id: user.id
    };

    return supabase.from('campaigns').insert(campaignWithUser).select();
  },
  
  // Gmail
  startGmailAuth: () => supabase.functions.invoke('gmail-auth-start'),
  
  // Analytics
  getAnalytics: (campaignId: string) => supabase.functions.invoke('get-campaign-analytics', {
    body: JSON.stringify({ campaign_id: campaignId })
  }),
  
  // Leads (Direct Supabase Table)
  fetchLeads: async (campaignId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', user.id)
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false });
    if (error) throw error as Error;
    return { leads: data };
  },
  addLeads: async (campaignId: string, leads: unknown[]) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const leadsWithCampaign = (leads as Record<string, unknown>[]).map(lead => ({
      ...lead,
      campaign_id: campaignId,
      user_id: user.id,
    }));
    const { data, error } = await supabase
      .from('leads')
      .insert(leadsWithCampaign)
      .select();
    if (error) throw error as Error;
    return { leads: data };
  },
  updateLead: async (leadId, update) => {
    const { data, error } = await supabase
      .from('leads')
      .update(update)
      .eq('id', leadId)
      .select()
      .single();
    if (error) throw error;
    return { lead: data };
  },
  deleteLead: async (leadId) => {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId);
    if (error) throw error;
    return { success: true };
  },
  
  // Emails
  generateDraft: async (payload: { campaignGoal: string; audience: string; [key: string]: unknown }) => {
    return supabase.functions.invoke('generate-email-draft', {
      body: payload,
    });
  },
  sendEmail: (data: Record<string, unknown>) => supabase.functions.invoke('send-email', {
    body: JSON.stringify(data)
  }),
  
  // Campaign Schedule
  fetchCampaignSchedule: async (campaignId: string) => {
    const { data, error } = await supabase
      .from('campaign_schedules')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (error && (error as { code?: string }).code === 'PGRST116') return null;
    if (error) throw error;
    return data;
  },
  saveCampaignSchedule: async (campaignId, startDate, endDate) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    // Upsert schedule for this campaign/user
    const { data, error } = await supabase
      .from('campaign_schedules')
      .upsert([
        {
          campaign_id: campaignId,
          user_id: user.id,
          start_date: startDate,
          end_date: endDate,
          updated_at: new Date().toISOString(),
        }
      ], { onConflict: 'campaign_id,user_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  saveEmailTemplate: async (campaignId, subject, body) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const { data, error } = await supabase
      .from('email_templates')
      .upsert([
        {
          campaign_id: campaignId,
          user_id: user.id,
          subject,
          body,
          updated_at: new Date().toISOString(),
        }
      ], { onConflict: 'campaign_id,user_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  fetchEmailTemplate: async (campaignId) => {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
  deleteCampaign: async (campaignId: string): Promise<{ success: boolean }> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', campaignId)
      .eq('user_id', user.id);
    if (error) throw error;
    return { success: true };
  },
} 