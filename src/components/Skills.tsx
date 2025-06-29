import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, Brain, Cpu, Globe, GitBranch } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code,
      color: 'blue',
      skills: [
        'Java',
        'Python',
        'SQL',
        'JavaScript',
        'HTML/CSS'
      ]
    },
    {
      title: 'Technologies & Tools',
      icon: Cpu,
      color: 'slate',
      skills: [
        'Git',
        'VS Code',
        'Linux',
        'AWS Cloud',
        'Firebase',
        'React.js',
        'Node.js'
      ]
    },
    {
      title: 'Areas of Expertise',
      icon: Brain,
      color: 'gray',
      skills: [
        'Data Structures & Algorithms',
        'Full-Stack Development',
        'AI/ML',
        'Cloud Computing'
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-700',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600',
        shadow: 'hover:shadow-blue-500/20',
        iconBg: 'bg-blue-100 dark:bg-blue-900/50',
        iconHover: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-800',
        dot: 'bg-blue-500'
      },
      slate: {
        bg: 'bg-slate-50 dark:bg-slate-900/20',
        border: 'border-slate-200 dark:border-slate-700',
        text: 'text-slate-600 dark:text-slate-400',
        hover: 'hover:bg-slate-100 dark:hover:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-600',
        shadow: 'hover:shadow-slate-500/20',
        iconBg: 'bg-slate-100 dark:bg-slate-900/50',
        iconHover: 'group-hover:bg-slate-200 dark:group-hover:bg-slate-800',
        dot: 'bg-slate-500'
      },
      gray: {
        bg: 'bg-gray-50 dark:bg-gray-900/20',
        border: 'border-gray-200 dark:border-gray-700',
        text: 'text-gray-600 dark:text-gray-400',
        hover: 'hover:bg-gray-100 dark:hover:bg-gray-900/30 hover:border-gray-300 dark:hover:border-gray-600',
        shadow: 'hover:shadow-gray-500/20',
        iconBg: 'bg-gray-100 dark:bg-gray-900/50',
        iconHover: 'group-hover:bg-gray-200 dark:group-hover:bg-gray-800',
        dot: 'bg-gray-500'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2 leading-tight">
            Skills & Expertise
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-3 leading-relaxed font-light">
            A summary of the <span className="font-medium text-indigo-600 dark:text-indigo-400">technical skills</span>, <span className="font-medium text-purple-600 dark:text-purple-400">tools</span>, and <span className="font-medium text-blue-600 dark:text-blue-400">expertise</span> I apply in my projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <div
                key={categoryIndex}
                className={`group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border-2 transition-all duration-500 hover:shadow-xl transform hover:scale-105 hover:-translate-y-2 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover} ${colorClasses.shadow} touch-manipulation focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 h-full ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${300 + categoryIndex * 200}ms`,
                  transitionDelay: isVisible ? `${300 + categoryIndex * 200}ms` : '0ms'
                }}
                tabIndex={0}
                role="region"
                aria-labelledby={`skill-category-${categoryIndex}`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 md:mb-8">
                  <div className={`p-2 sm:p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${colorClasses.iconBg} ${colorClasses.iconHover}`}>
                    <category.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colorClasses.text} group-hover:rotate-6 transition-transform duration-300`} />
                  </div>
                  <h3 
                    id={`skill-category-${categoryIndex}`}
                    className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex} 
                      className={`flex items-center space-x-2 sm:space-x-3 group/skill transition-all duration-300 hover:translate-x-1 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{
                        animationDelay: `${500 + categoryIndex * 200 + skillIndex * 100}ms`,
                        transitionDelay: isVisible ? `${500 + categoryIndex * 200 + skillIndex * 100}ms` : '0ms'
                      }}
                    >
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 group-hover/skill:scale-125 ${colorClasses.dot}`}></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors duration-300 leading-relaxed">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Cloud */}
        <div className={`mt-12 sm:mt-16 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 px-2 leading-tight">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            {[
              'Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision',
              'Natural Language Processing', 'Data Visualization', 'Statistical Analysis',
              'Algorithm Design', 'Software Architecture', 'API Development',
              'Microservices', 'DevOps', 'Agile Methodology', 'Test-Driven Development'
            ].map((tech, index) => (
              <span
                key={index}
                className={`bg-gradient-to-r from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 text-gray-700 dark:text-gray-300 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:from-blue-200 hover:to-slate-200 dark:hover:from-blue-800/50 dark:hover:to-slate-800/50 transition-all duration-300 cursor-default hover:scale-105 hover:shadow-md touch-manipulation focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  animationDelay: `${900 + index * 50}ms`,
                  transitionDelay: isVisible ? `${900 + index * 50}ms` : '0ms'
                }}
                tabIndex={0}
                role="button"
                aria-label={`Technology: ${tech}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Summary - Updated with Professional Colors */}
        <div className={`mt-12 sm:mt-16 bg-gradient-to-r from-slate-800 via-gray-900 to-black rounded-2xl p-4 sm:p-6 md:p-8 text-white border border-gray-700 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Technical Proficiency</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
            <div className="group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">5+</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light">Programming Languages</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">15+</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light">Technologies & Tools</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">4</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light">Core Expertise Areas</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">9.0</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light">CGPA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;