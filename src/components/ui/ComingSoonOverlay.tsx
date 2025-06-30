import React from 'react';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export const ComingSoonOverlay: React.FC = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="lg" variant="outline" className="text-base px-6 py-2 bg-gray-100 border-gray-300 text-gray-600 cursor-default pointer-events-none font-semibold" disabled>
          Coming Soon
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <span>This feature is coming soon! Sample content is shown for preview purposes.</span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
); 