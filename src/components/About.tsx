import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Brain, Target, Award, Code } from 'lucide-react';

const About = () => {
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

  const highlights = [
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: 'Computer Science & Engineering (AI & ML) at SR University',
      detail: 'Current CGPA: 9.0/10'
    },
    {
      icon: Code,
      title: 'What I Enjoy Building',
      description: 'Modern web applications and practical software tools',
      detail: 'Focused on problem-solving, clean architecture, and user-friendly design'
    },
    {
      icon: Target,
      title: 'Future Goals',
      description: 'Build impactful web solutions and grow as a software developer',
      detail: 'Focus on creating scalable, user-friendly, and meaningful applications'
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Multiple hackathons and coding competitions',
      detail: 'Recognized for innovative solutions'
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2 leading-tight">
            About Me
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-3 leading-relaxed font-light">
            I enjoy solving problems through technology and developing modern, efficient web applications. My interest lies in creating clean, scalable, and user-friendly systems that help address real-world challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Profile Section */}
          <div className={`space-y-4 sm:space-y-6 order-2 lg:order-1 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">My Journey</h3>
              </div>
              
              <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed">
                <p className="text-gray-700 dark:text-gray-300 font-light leading-loose">
                  I'm a <span className="font-medium text-indigo-600 dark:text-indigo-400">Computer Science and Engineering</span> student at <span className="font-medium">SR University</span> with a keen interest in problem-solving, web development, and creating practical software solutions. I enjoy building clean, scalable, and user-friendly applications that help address real-world challenges.
                </p>
                
                <div className="w-12 h-px bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-600 dark:to-purple-600 my-4"></div>
                
                <p className="text-gray-700 dark:text-gray-300 font-light leading-loose">
                  I like working with technologies such as <span className="font-medium text-blue-600 dark:text-blue-400">JavaScript</span>, <span className="font-medium text-green-600 dark:text-green-400">Python</span>, <span className="font-medium text-orange-600 dark:text-orange-400">Firebase</span>, <span className="font-medium text-cyan-600 dark:text-cyan-400">React</span>, and <span className="font-medium text-purple-600 dark:text-purple-400">Tailwind CSS</span>, and I'm always exploring new tools and frameworks to enhance my projects. My work often focuses on developing full-stack applications, integrating modern UI design with robust backend logic.
                </p>
                
                <div className="w-12 h-px bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600 my-4"></div>
                
                <p className="text-gray-700 dark:text-gray-300 font-light leading-loose">
                  Over time, I've participated in <span className="font-medium text-yellow-600 dark:text-yellow-400">hackathons</span>, <span className="font-medium text-red-600 dark:text-red-400">coding challenges</span>, and <span className="font-medium text-teal-600 dark:text-teal-400">team projects</span>, where I've learned the value of collaboration, adaptability, and continuous improvement. I'm passionate about turning ideas into reality — whether it's through personal projects, contributions to open-source, or experimenting with new technologies.
                </p>
                
                <div className="w-12 h-px bg-gradient-to-r from-pink-300 to-indigo-300 dark:from-pink-600 dark:to-indigo-600 my-4"></div>
                
                <p className="text-gray-700 dark:text-gray-300 font-light leading-loose">
                  Outside of programming, I enjoy reading about <span className="font-medium text-emerald-600 dark:text-emerald-400">emerging tech trends</span>, learning from the developer community, and finding inspiration in innovative solutions. I'm always excited to take on new challenges, share knowledge, and work with like-minded people to build something meaningful.
                </p>
              </div>
            </div>

            {/* Key Stats */}
            <div className={`grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-2 sm:p-3 md:p-4 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-300 hover:scale-105 group cursor-default">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">9.0</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">CGPA</div>
              </div>
              <div className="text-center bg-purple-50 dark:bg-purple-900/30 rounded-xl p-2 sm:p-3 md:p-4 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-300 hover:scale-105 group cursor-default">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">15+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Projects</div>
              </div>
              <div className="text-center bg-green-50 dark:bg-green-900/30 rounded-xl p-2 sm:p-3 md:p-4 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-300 hover:scale-105 group cursor-default">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">5+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Certifications</div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 order-1 lg:order-2 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {highlights.map((item, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 touch-manipulation hover:scale-105 hover:-translate-y-1`}
                style={{
                  animationDelay: `${800 + index * 100}ms`
                }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{item.title}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2 leading-relaxed font-light">{item.description}</p>
                <p className="text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-medium group-hover:font-semibold transition-all duration-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;