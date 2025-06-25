
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ProfessionalAvatar = () => {
  return (
    <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40">
        {/* Glassmorphism container */}
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-full border border-white/20 shadow-2xl" />
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 p-1 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="w-full h-full rounded-full bg-background" />
        </div>
        
        {/* Avatar */}
        <div className="absolute inset-2">
          <Avatar className="w-full h-full">
            <AvatarImage 
              src="/placeholder.svg" 
              alt="Ahmed Mubarak"
              className="object-cover"
            />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-sky-400 to-purple-600 text-white">
              AM
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Status indicator */}
        <div className="absolute -bottom-2 -right-2">
          <Badge className="bg-green-500 text-white shadow-lg animate-pulse">
            Available for Hire
          </Badge>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-sky-400 rounded-full animate-ping" />
        <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-3 -left-1 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default ProfessionalAvatar;
