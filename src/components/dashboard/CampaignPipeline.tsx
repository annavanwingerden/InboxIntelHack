import { useNavigate } from "react-router-dom";
import { Target, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Campaign {
  id: string;
  name: string;
  stage: string;
  sent: number;
  replies: number;
  status: string;
  goal: string;
  progress: number;
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

export function CampaignPipeline({ campaigns, isLoading }: { campaigns: Campaign[], isLoading?: boolean }) {
  const navigate = useNavigate();

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="w-20 h-6 rounded-full" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Campaign Pipeline</h2>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const StageIcon = getStageIcon(campaign.stage);
          return (
            <div
              key={campaign.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group cursor-pointer"
              onClick={() => handleCampaignClick(campaign.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getStageColor(campaign.stage)}`}>
                    <StageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-600">{campaign.goal}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(campaign.stage)}`}>
                  {campaign.status}
                </span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>📤 {campaign.sent} sent</span>
                  <span>💬 {campaign.replies} replies</span>
                  <span>📊 {campaign.replies > 0 ? ((campaign.replies / campaign.sent) * 100).toFixed(1) : '0'}% reply rate</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
