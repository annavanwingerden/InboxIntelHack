import React, { useMemo } from 'react';
import { Target, Send, Mail, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const statIcons = {
  campaigns: Target,
  emails: Send,
  replies: Mail,
  replyRate: TrendingUp,
};

export const gradients = {
  campaigns: "from-blue-500 to-blue-600",
  emails: "from-purple-500 to-purple-600",
  replies: "from-green-500 to-green-600",
  replyRate: "from-orange-500 to-orange-600",
};

export type StatCardData = {
  id: keyof typeof statIcons;
  title: string;
  value: string;
  change?: string;
};

export function StatsCards({ campaigns, isLoading }: { campaigns: any[], isLoading?: boolean }) {
  
  const stats: StatCardData[] = useMemo(() => {
    if (!campaigns || campaigns.length === 0) {
      return [
        { id: 'campaigns', title: "Active Campaigns", value: "0" },
        { id: 'emails', title: "Emails Sent", value: "0" },
        { id: 'replies', title: "Replies Received", value: "0" },
        { id: 'replyRate', title: "Reply Rate", value: "0%" },
      ];
    }

    const totalEmailsSent = campaigns.reduce((sum, c) => sum + (c.sent || 0), 0);
    const totalRepliesReceived = campaigns.reduce((sum, c) => sum + (c.replies || 0), 0);
    const replyRate = totalEmailsSent > 0 ? ((totalRepliesReceived / totalEmailsSent) * 100).toFixed(1) : 0;

    return [
      { id: 'campaigns', title: "Active Campaigns", value: campaigns.length.toString() },
      { id: 'emails', title: "Emails Sent", value: totalEmailsSent.toLocaleString() },
      { id: 'replies', title: "Replies Received", value: totalRepliesReceived.toLocaleString() },
      { id: 'replyRate', title: "Reply Rate", value: `${replyRate}%` },
    ];
  }, [campaigns]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <Skeleton className="w-12 h-8 rounded-full" />
            </div>
            <div>
              <Skeleton className="w-1/2 h-8 mb-2" />
              <Skeleton className="w-1/3 h-6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(stats || []).map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${gradients[stat.id]} shadow-lg`}>
              {React.createElement(statIcons[stat.id], { className: "w-6 h-6 text-white" })}
            </div>
            {stat.change && (
              <span className="text-sm font-medium px-2 py-1 rounded-full text-green-700 bg-green-100">
                {stat.change}
              </span>
            )}
          </div>
          
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
