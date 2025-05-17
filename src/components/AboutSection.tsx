
import React from 'react';
import { User, Briefcase, Zap, BookOpen, Award, Users, LanguagesIcon, Calendar, GitPullRequestIcon, Brain } from 'lucide-react'; // Added Award, Users, LanguagesIcon, Calendar

const AboutSection = () => {
  const workExperiences = [
    {
      role: "Full-Stack Developer",
      company: "Smart Genx",
      period: "2025 – Present",
      description: [
        "Collaborated on mobile and backend development projects, contributing to app architecture and code optimization.",
        "Optimized backend code and database queries, improving application performance and reducing response times."
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "WIST Academy",
      period: "08/2024 – 11/2024",
      description: [
        "Collaborated on mobile and backend development projects, contributing to app architecture and code optimization.",
        "Optimized backend code and database queries, improving application performance and reducing response times.",
        "Implemented security features that increased data protection and user trust."
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "Freelancer",
      period: "07/2024 – Present",
      description: [
        "Collaborated on mobile and backend development projects, contributing to app architecture and code optimization.",
        "Optimized backend code and database queries, improving application performance and reducing response times."
      ]
    }
  ];

  const professionalDevelopment = [
    "Google Data Analytics Professional Certificate 2024",
    "Python for Data Science, AI & Developmen 2024",
    "AI Infrastructure and Operations Fundamentals 2024",
    "Build Generative AI Agents with Vertex AI and Flutter 2024",
    "Python (Basic) Certification 2024",
    "Foundations: Data, Data, Everywhere 2024",
    "Problem-Solving (300 points on HackerRank) 2024"
  ];

  return (
    <section id="about" className="bg-slate-50">
      <div className="container mx-auto animate-fade-in-up">
        <h2 className="section-title">About Me</h2>
        <div className="max-w-4xl mx-auto text-slate-700 space-y-8">
          
          <div className="text-center">
            <p className="text-lg leading-relaxed">
              Hi, I'm <span className="font-semibold text-sky-700">Ahmed Mubarak</span>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              As a passionate Information Technology graduate with expertise in artificial intelligence, full-stack
              development, and data analytics, I am dedicated to building innovative software solutions that solve real-world
              problems. With strong project experience and professional certifications, I aim to contribute as an AI
              Developer or Full-Stack Developer in roles that challenge my analytical thinking and technical skills.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-4 text-center">Education</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="font-semibold text-sky-700">Bachelor’s degree | College of Information Technology</p>
                <p className="text-sm text-slate-600">Hadramout University, 2020-2024</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="font-semibold text-sky-700">Diploma in English</p>
                <p className="text-sm text-slate-600">Elec English Institute, Malaysia, 2019-2020</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Work Experience</h3>
            <div className="space-y-6">
              {workExperiences.map((exp, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-sky-700">{exp.role}</h4>
                    <span className="text-sm text-slate-500 bg-sky-100 px-2 py-1 rounded">{exp.period}</span>
                  </div>
                  <p className="text-md font-medium text-slate-800 mb-2">{exp.company}</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Professional Development & Certifications</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {professionalDevelopment.map((cert, index) => (
                 <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Award size={24} className="text-sky-600 mr-3 flex-shrink-0" />
                  <p className="text-sm text-slate-700">{cert}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-4 text-center">Languages</h3>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <LanguagesIcon size={24} className="text-sky-600 mr-2" />
                <p className="text-slate-700">English: <span className="font-medium">Fluent</span></p>
              </div>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <LanguagesIcon size={24} className="text-sky-600 mr-2" />
                <p className="text-slate-700">Arabic: <span className="font-medium">Native</span></p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-10">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <User size={48} className="text-sky-600 mb-3" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">User-Focused</h3>
              <p className="text-sm text-slate-600 text-center">Crafting intuitive and engaging user experiences is my top priority.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Brain size={48} className="text-sky-600 mb-3" /> {/* Replaced Briefcase with Brain for Problem Solver / Analytical */}
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Analytical Problem Solver</h3>
              <p className="text-sm text-slate-600 text-center">I enjoy tackling complex challenges and finding innovative, analytical solutions.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Zap size={48} className="text-sky-600 mb-3" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Performance Driven</h3>
              <p className="text-sm text-slate-600 text-center">Building fast, scalable, and reliable applications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
