import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from 'date-fns';

const activityConfig = {
  created_at: {
    avatar: "🎯",
    action: "created campaign",
    color: "bg-orange-500",
  },
  sent_at: {
    avatar: "📤",
    action: "sent email to",
    color: "bg-blue-500",
  },
  reply: {
    avatar: "📧",
    action: "received reply from",
    color: "bg-green-500",
  }
};

const generateActivities = (campaigns: any[]) => {
  if (!campaigns) return [];

  const activities: any[] = [];

  campaigns.forEach(campaign => {
    // Campaign creation
    activities.push({
      id: `campaign-${campaign.id}`,
      user: "You",
      action: activityConfig.created_at.action,
      target: campaign.name,
      time: formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true }),
      avatar: activityConfig.created_at.avatar,
      type: "campaign",
      color: activityConfig.created_at.color,
    });

    campaign.emails?.forEach((email: any) => {
      // Email sent
      if (email.sent_at) {
        activities.push({
          id: `sent-${email.id}`,
          user: "You",
          action: activityConfig.sent_at.action,
          target: email.recipient_email,
          time: formatDistanceToNow(new Date(email.sent_at), { addSuffix: true }),
          avatar: activityConfig.sent_at.avatar,
          type: "sent",
          campaign: campaign.name,
          color: activityConfig.sent_at.color,
        });
      }
      
      // Replies received
      email.replies?.forEach((reply: any) => {
        activities.push({
          id: `reply-${reply.id}`,
          user: "System",
          action: activityConfig.reply.action,
          target: email.recipient_email,
          time: formatDistanceToNow(new Date(reply.created_at), { addSuffix: true }),
          avatar: activityConfig.reply.avatar,
          type: "reply",
          campaign: campaign.name,
          color: activityConfig.reply.color,
        });
      });
    });
  });

  return activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
};

export function ActivityTimeline({ campaigns, isLoading }: { campaigns: any[], isLoading?: boolean }) {
  const activities = generateActivities(campaigns);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
              {activity.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">{activity.user}</span>
                <span className="text-gray-600">{activity.action}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{activity.target}</p>
              {activity.campaign && (
                <p className="text-xs text-blue-600 mb-1">📋 {activity.campaign}</p>
              )}
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            
            <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-2 ${activity.color}`} />
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
        View all activity
      </button>
    </div>
  );
}
