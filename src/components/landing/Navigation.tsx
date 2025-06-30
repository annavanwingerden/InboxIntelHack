import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="InboxIntel Logo" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-bold text-gray-900">InboxIntel</span>
        </div>

        {/* Bolt.new Badge */}
        <a
          href="https://bolt.new/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block ml-4"
          style={{ position: 'absolute', top: 16, right: 32, zIndex: 100 }}
        >
          <img
            src="/bolt.png"
            alt="Bolt.new Badge"
            className="w-24 h-auto max-w-[120px] min-w-[60px] transition-all duration-200 hover:scale-105"
            style={{ height: 'auto', width: '6vw', minWidth: 60, maxWidth: 120 }}
          />
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Docs
          </a>
          <Link to="/auth?mode=signin" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Login
          </Link>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
            <Link to="/auth?mode=signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
