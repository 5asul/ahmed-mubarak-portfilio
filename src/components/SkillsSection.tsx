
import React from 'react';
import { Code, Database, Server, Wind } from 'lucide-react'; // Example icons

const skillsData = [
  { name: 'JavaScript (ES6+)', icon: <Code size={20} className="mr-2" /> },
  { name: 'TypeScript', icon: <Code size={20} className="mr-2" /> },
  { name: 'React & Next.js', icon: <Code size={20} className="mr-2" /> },
  { name: 'Node.js & Express', icon: <Server size={20} className="mr-2" /> },
  { name: 'Python & Django/Flask', icon: <Code size={20} className="mr-2" /> },
  { name: 'SQL (PostgreSQL, MySQL)', icon: <Database size={20} className="mr-2" /> },
  { name: 'NoSQL (MongoDB, Firebase)', icon: <Database size={20} className="mr-2" /> },
  { name: 'HTML5 & CSS3', icon: <Code size={20} className="mr-2" /> },
  { name: 'Tailwind CSS', icon: <Wind size={20} className="mr-2" /> },
  { name: 'Git & GitHub', icon: <Code size={20} className="mr-2" /> },
  { name: 'RESTful APIs & GraphQL', icon: <Server size={20} className="mr-2" /> },
  { name: 'Docker & Kubernetes', icon: <Server size={20} className="mr-2" /> },
  { name: 'AWS / Cloud Platforms', icon: <Server size={20} className="mr-2" /> },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-white">
      <div className="container mx-auto">
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">
          I have experience with a wide range of technologies in the web development spectrum.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-sky-600">{skill.icon}</span>
              <span className="text-slate-700 font-medium text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
