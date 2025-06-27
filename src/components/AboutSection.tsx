
import React from 'react';
import { User, Briefcase, Zap, BookOpen, Award, Users, LanguagesIcon, Calendar, GitPullRequestIcon, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

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
    <section id="about" className="bg-muted/30 dark:bg-muted/10 transition-colors duration-300">
      <div className="container mx-auto animate-fade-in-up">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="max-w-4xl mx-auto text-foreground space-y-8">
          
          <div className="text-center">
            <p className="text-lg leading-relaxed">
              {t('about.greeting')}
            </p>
            <p className="text-lg leading-relaxed mt-4">
              {t('about.description')}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">{t('about.education')}</h3>
            <div className="space-y-4">
              <div className="p-4 bg-card dark:bg-card rounded-lg shadow-sm border border-border">
                <p className="font-semibold text-sky-700 dark:text-sky-400">{t('about.bachelorDegree')}</p>
                <p className="text-sm text-muted-foreground">{t('about.bachelorLocation')}</p>
              </div>
              <div className="p-4 bg-card dark:bg-card rounded-lg shadow-sm border border-border">
                <p className="font-semibold text-sky-700 dark:text-sky-400">{t('about.diplomaEnglish')}</p>
                <p className="text-sm text-muted-foreground">{t('about.diplomaLocation')}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">{t('about.workExperience')}</h3>
            <div className="space-y-6">
              {workExperiences.map((exp, index) => (
                <div key={index} className="p-6 bg-card dark:bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-sky-700 dark:text-sky-400">{exp.role}</h4>
                    <span className="text-sm text-muted-foreground bg-sky-100 dark:bg-sky-900/30 px-2 py-1 rounded">{exp.period}</span>
                  </div>
                  <p className="text-md font-medium text-foreground mb-2">{exp.company}</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">{t('about.professionalDevelopment')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {professionalDevelopment.map((cert, index) => (
                 <div key={index} className="flex items-center p-4 bg-card dark:bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border">
                  <Award size={24} className="text-sky-600 dark:text-sky-400 mr-3 flex-shrink-0" />
                  <p className="text-sm text-foreground">{cert}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">{t('about.languages')}</h3>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center p-4 bg-card dark:bg-card rounded-lg shadow-sm border border-border">
                <LanguagesIcon size={24} className="text-sky-600 dark:text-sky-400 mr-2" />
                <p className="text-foreground">{t('about.english')}: <span className="font-medium">{t('about.fluent')}</span></p>
              </div>
              <div className="flex items-center p-4 bg-card dark:bg-card rounded-lg shadow-sm border border-border">
                <LanguagesIcon size={24} className="text-sky-600 dark:text-sky-400 mr-2" />
                <p className="text-foreground">{t('about.arabic')}: <span className="font-medium">{t('about.native')}</span></p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-10">
            <div className="flex flex-col items-center p-6 bg-card dark:bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border">
              <User size={48} className="text-sky-600 dark:text-sky-400 mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('about.userFocused')}</h3>
              <p className="text-sm text-muted-foreground text-center">{t('about.userFocusedDesc')}</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card dark:bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border">
              <Brain size={48} className="text-sky-600 dark:text-sky-400 mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('about.analyticalProblemSolver')}</h3>
              <p className="text-sm text-muted-foreground text-center">{t('about.analyticalProblemSolverDesc')}</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card dark:bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border">
              <Zap size={48} className="text-sky-600 dark:text-sky-400 mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('about.performanceDriven')}</h3>
              <p className="text-sm text-muted-foreground text-center">{t('about.performanceDrivenDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
