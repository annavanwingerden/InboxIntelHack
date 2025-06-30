import React from 'react';
import { Button } from '@/components/ui/button';
import DashboardIllustration from './DashboardIllustration';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const handleStartWriting = () => {
    window.location.href = '/signup';
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Cold Email Platform
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Cold emails.
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Warm responses
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed max-w-lg">
                AI-powered outreach that gets founders noticed.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {[
                "Personalized at scale with GPT-4",
                "98% deliverability guarantee",
                "Built for YC founders & startups"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/auth?mode=signup">
                  Start Writing Smarter
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
              >
                <a href="https://www.youtube.com/watch?v=iO08HEIuWOY" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch InboxIntel in Action
                </a>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-8 text-sm text-gray-500">
              <span>Trusted by 500+ founders</span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
                ))}
                <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                  +12
                </div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative lg:pl-8">
            <DashboardIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
