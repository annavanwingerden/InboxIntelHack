import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

const transformCampaignData = (campaign: any) => {
    const sent = campaign.emails?.length || 0;
    const replies = campaign.emails?.reduce((sum: number, email: any) => sum + (email.replies?.length || 0), 0) || 0;
    const replyRate = sent > 0 ? (replies / sent) * 100 : 0;
    
    // Infer stage - this is a simplification for now
    let stage = "draft";
    if (sent > 0) {
      stage = "active";
    }

    // Ensure each email includes its replies array (default to empty array)
    const emailsWithReplies = (campaign.emails || []).map((email: any) => ({
      ...email,
      replies: email.replies || []
    }));

    return {
      id: campaign.id,
      name: campaign.name,
      stage: stage,
      sent: sent,
      replies: replies,
      status: stage.charAt(0).toUpperCase() + stage.slice(1),
      goal: campaign.goal,
      audience_description: campaign.audience_description,
      audience: campaign.audience_description,
      progress: sent > 0 ? (replyRate > 0 ? 50 : 25) : 0, // Mock progress for UI
      createdAt: campaign.created_at,
      replyRate: replyRate,
      emails: emailsWithReplies, // Now includes replies array for each email
    };
};

export const useCampaigns = () => {
    return useQuery({
        queryKey: ['campaigns'],
        queryFn: async () => {
            const { data, error } = await api.getCampaigns();
            if (error) throw new Error(error.message);
            // The API returns an object { campaigns: [...] }, so we extract the array.
            const campaigns = data?.campaigns ?? [];
            return Array.isArray(campaigns) ? campaigns.map(transformCampaignData) : [];
        },
    });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCampaign) => api.createCampaign(newCampaign),
    onSuccess: () => {
      // When a campaign is created, invalidate the 'campaigns' query
      // to refetch the list and show the new campaign.
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
    onError: (error) => {
      // You can add more robust error handling here, like showing a toast notification.
      console.error("Error creating campaign:", error);
    }
  });
}; 