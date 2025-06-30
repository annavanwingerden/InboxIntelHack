
import React from 'react';

const DashboardIllustration = () => {
  return (
    <div className="relative">
      {/* Main Dashboard Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform rotate-3 hover:rotate-1 transition-transform duration-700">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-gray-600">InboxIntel Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-xs text-blue-500">Open Rate</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">45%</div>
              <div className="text-xs text-green-500">Response</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.3k</div>
              <div className="text-xs text-purple-500">Sent</div>
            </div>
          </div>

          {/* Email Preview */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">AI-Generated Email</div>
              <div className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Ready to Send</div>
            </div>
            
            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <div className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Personalized</div>
              <div className="px-3 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">AI-Optimized</div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Response Rate Trend</div>
            <div className="h-20 bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 rounded-lg relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 80">
                <path 
                  d="M0,60 Q75,20 150,30 T300,25" 
                  stroke="url(#gradient)" 
                  strokeWidth="3" 
                  fill="none"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl transform rotate-12 opacity-80 animate-bounce delay-300"></div>
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-200 to-blue-300 rounded-2xl transform -rotate-12 opacity-80 animate-bounce delay-700"></div>
      
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl transform scale-110 -z-10"></div>
    </div>
  );
};

export default DashboardIllustration;
