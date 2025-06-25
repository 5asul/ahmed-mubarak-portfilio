
import React, { useState, useEffect } from 'react';
import { Users, Code2, Award, Clock } from 'lucide-react';

const ClientStats = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    awards: 0,
    experience: 0
  });

  const finalCounts = {
    projects: 50,
    clients: 25,
    awards: 8,
    experience: 3
  };

  useEffect(() => {
    const animateCount = (key: keyof typeof counts, target: number) => {
      const increment = target / 50;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 50);
    };

    // Start animation after a delay
    setTimeout(() => {
      animateCount('projects', finalCounts.projects);
      animateCount('clients', finalCounts.clients);
      animateCount('awards', finalCounts.awards);
      animateCount('experience', finalCounts.experience);
    }, 1000);
  }, []);

  const stats = [
    {
      icon: Code2,
      value: counts.projects,
      suffix: '+',
      label: 'Projects Completed',
      color: 'text-blue-500'
    },
    {
      icon: Users,
      value: counts.clients,
      suffix: '+',
      label: 'Happy Clients',
      color: 'text-green-500'
    },
    {
      icon: Award,
      value: counts.awards,
      suffix: '',
      label: 'Awards Won',
      color: 'text-yellow-500'
    },
    {
      icon: Clock,
      value: counts.experience,
      suffix: '+',
      label: 'Years Experience',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className="text-center p-4 bg-white/5 dark:bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
        >
          <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
          <div className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}{stat.suffix}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientStats;
