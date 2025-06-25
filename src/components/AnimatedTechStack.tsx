
import React from 'react';
import { Code, Database, Smartphone, Globe, Cpu, Zap } from 'lucide-react';

const AnimatedTechStack = () => {
  const techIcons = [
    { Icon: Code, name: 'React', color: 'text-blue-500', delay: '0s' },
    { Icon: Database, name: 'Node.js', color: 'text-green-500', delay: '0.5s' },
    { Icon: Globe, name: 'TypeScript', color: 'text-blue-600', delay: '1s' },
    { Icon: Smartphone, name: 'Mobile', color: 'text-purple-500', delay: '1.5s' },
    { Icon: Cpu, name: 'AI/ML', color: 'text-orange-500', delay: '2s' },
    { Icon: Zap, name: 'Performance', color: 'text-yellow-500', delay: '2.5s' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {techIcons.map(({ Icon, name, color, delay }, index) => (
        <div
          key={name}
          className={`absolute opacity-20 hover:opacity-60 transition-all duration-300 ${color}`}
          style={{
            top: `${20 + (index * 12)}%`,
            right: `${10 + (index % 2) * 10}%`,
            animation: `float 4s ease-in-out infinite`,
            animationDelay: delay
          }}
        >
          <div className="relative group">
            <Icon 
              size={32} 
              className="animate-pulse group-hover:scale-125 transition-transform duration-300" 
            />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTechStack;
