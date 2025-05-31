
import React from 'react';
import { Code, Database, Server, Wind, FileText, Image, Zap, BookOpen, Users, RotateCw, Cloud } from 'lucide-react'; // Added more icons

const skillsData = [
  // Programming Languages
  { name: 'C#', icon: <Code size={20} className="mr-2" /> },
  { name: 'Python', icon: <Code size={20} className="mr-2" /> },
  { name: 'Dart', icon: <Code size={20} className="mr-2" /> },
  { name: 'JavaScript', icon: <Code size={20} className="mr-2" /> },
  // Database
  { name: 'SQL Server', icon: <Database size={20} className="mr-2" /> },
  { name: 'PostgreSQL', icon: <Database size={20} className="mr-2" /> },
  { name: 'MySQL', icon: <Database size={20} className="mr-2" /> },
  { name: 'Sqflite', icon: <Database size={20} className="mr-2" /> },
  { name: 'MongoDB', icon: <Database size={20} className="mr-2" /> },
  // Framework
  { name: 'ASP.NET Core', icon: <Server size={20} className="mr-2" /> },
  { name: 'Flask', icon: <Server size={20} className="mr-2" /> },
  { name: 'Flutter', icon: <Code size={20} className="mr-2" /> }, // Using Code for Flutter as it's a UI toolkit
  { name: 'Node.js', icon: <Server size={20} className="mr-2" /> },
  { name: 'Langchain', icon: <Code size={20} className="mr-2" /> }, // AI/LLM framework
  // Cloud
  { name: 'Google Colab', icon: <Cloud size={20} className="mr-2" /> },
  { name: 'Google Cloud', icon: <Cloud size={20} className="mr-2" /> },
  { name: 'Jupyter', icon: <Code size={20} className="mr-2" /> }, // Environment
  // Design
  { name: 'Adobe XD', icon: <Image size={20} className="mr-2" /> },
  { name: 'Figma', icon: <Image size={20} className="mr-2" /> },
  { name: 'Photoshop', icon: <Image size={20} className="mr-2" /> },
  { name: 'Illustrator', icon: <Image size={20} className="mr-2" /> },
  // Microsoft Office
  { name: 'Excel', icon: <FileText size={20} className="mr-2" /> },
  { name: 'Word', icon: <FileText size={20} className="mr-2" /> },
  { name: 'PowerPoint', icon: <FileText size={20} className="mr-2" /> },
  // Core Skills
  { name: 'Problem-Solving', icon: <Zap size={20} className="mr-2" /> },
  { name: 'Analytical Thinking', icon: <BookOpen size={20} className="mr-2" /> },
  { name: 'Team Collaboration', icon: <Users size={20} className="mr-2" /> },
  { name: 'Adaptability', icon: <RotateCw size={20} className="mr-2" /> },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-background dark:bg-background transition-colors duration-300">
      <div className="container mx-auto animate-fade-in-up">
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">
          I have experience with a wide range of technologies and possess strong core skills for development.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center p-4 bg-card dark:bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-border"
            >
              <span className="text-sky-600 dark:text-sky-400">{skill.icon}</span>
              <span className="text-foreground font-medium text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
