
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Target, BarChart3 } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Personalization",
      description: "GPT-4 crafts personalized emails that speak directly to your prospects' needs and pain points.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Target,
      title: "98% Deliverability",
      description: "Advanced email infrastructure ensures your messages land in inboxes, not spam folders.",
      color: "from-green-500 to-blue-500"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Real-time insights help you optimize your outreach and maximize response rates.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Trusted by 500+ Founders
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why founders choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InboxIntel
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for startups and YC founders who need to scale their outreach without losing the personal touch.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 py-16 border-t border-gray-200">
          {[
            { number: "98%", label: "Deliverability Rate" },
            { number: "45%", label: "Average Response Rate" },
            { number: "2.3k", label: "Emails Sent Daily" },
            { number: "500+", label: "Happy Founders" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
