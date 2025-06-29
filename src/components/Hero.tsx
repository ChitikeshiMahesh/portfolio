import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, Github, Linkedin, Mail, Eye } from 'lucide-react';
import ResumeViewer from './ResumeViewer';

const Hero = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Resume_Mahesh.pdf';
    link.download = 'Mahesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 px-3 sm:px-4">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent)] opacity-70 animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.15),transparent)] opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent)] opacity-50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-16 sm:pt-18 md:pt-20">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Professional Avatar with Animation */}
            <div className={`relative mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-xl transition-all duration-1000 hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-110 group cursor-default ${
              isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-8'
            }`}>
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-50 group-hover:to-purple-50 dark:group-hover:from-gray-700 dark:group-hover:to-gray-600 transition-all duration-500">
                <span className="text-xl sm:text-2xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">M</span>
              </div>
              {/* Animated Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-indigo-300 dark:border-indigo-600 opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>

            {/* Main Heading with Staggered Animation */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 px-2">
              <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Hello, I'm{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent relative group cursor-default hover:from-indigo-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-500">
                  Mahesh Chitikeshi
                  {/* Subtle glow effect on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-30 blur-sm transition-all duration-500 pointer-events-none">
                    Mahesh Chitikeshi
                  </span>
                </span>
              </h1>
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-2 leading-relaxed font-light transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Computer Science and Engineering (AIML) Undergraduate at <span className="font-medium text-indigo-600 dark:text-indigo-400">SR University</span>
              </p>
            </div>

            {/* Tagline with Enhanced Animation */}
            <div className={`space-y-1 sm:space-y-2 px-3 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 font-medium">
                Driven by <span className="text-indigo-600 dark:text-indigo-400 font-semibold">curiosity</span> and a love for creating <span className="text-purple-600 dark:text-purple-400 font-semibold">practical solutions</span>.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                I enjoy building modern, efficient web applications that solve real-world problems.
              </p>
            </div>

            {/* CTA Buttons with Staggered Animation */}
            <div className={`flex flex-col space-y-3 sm:space-y-4 justify-center items-center px-3 sm:px-4 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button
                onClick={scrollToProjects}
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center touch-manipulation max-w-xs relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-sm sm:text-base z-10">View My Work</span>
                <ArrowDown className="relative h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 group-hover:animate-gentle-bounce transition-transform duration-300 z-10" />
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </button>
              
              <div className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto max-w-sm sm:max-w-none transition-all duration-1000 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <button 
                  onClick={() => setIsResumeOpen(true)}
                  className="group bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-4 sm:px-6 py-3 sm:py-4 rounded-full font-semibold border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:border-indigo-700 dark:hover:border-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-2 justify-center touch-manipulation text-sm sm:text-base relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Eye className="relative h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300 z-10" />
                  <span className="relative z-10">View Resume</span>
                </button>
                
                <button 
                  onClick={handleDownloadResume}
                  className="group bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-4 sm:px-6 py-3 sm:py-4 rounded-full font-semibold border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:border-indigo-700 dark:hover:border-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-2 justify-center touch-manipulation text-sm sm:text-base relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Download className="relative h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300 z-10" />
                  <span className="relative z-10">Download</span>
                </button>
              </div>
            </div>

            {/* Social Links with Enhanced Animation */}
            <div className={`flex justify-center space-x-4 sm:space-x-6 pt-4 sm:pt-6 md:pt-8 transition-all duration-1000 delay-1200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <a 
                href="https://github.com/Mahesh-ch06" 
                className="group text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 p-2 touch-manipulation hover:scale-110 hover:-translate-y-1 relative"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </a>
              <a 
                href="https://www.linkedin.com/in/mahesh-chitikeshi-b7a0982b9/" 
                className="group text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 p-2 touch-manipulation hover:scale-110 hover:-translate-y-1 relative"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </a>
              <a 
                href="mailto:chitikeshimahesh6@gmail.com" 
                className="group text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 p-2 touch-manipulation hover:scale-110 hover:-translate-y-1 relative"
                aria-label="Email Contact"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator - Hidden on mobile */}
        <div className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block transition-all duration-1000 delay-1400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="group cursor-pointer" onClick={scrollToProjects}>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-300 group-hover:scale-110">
              <div className="w-1 h-2 sm:h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-gentle-bounce group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400 transition-colors duration-300"></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
              Scroll to explore
            </p>
          </div>
        </div>

        {/* Floating Elements for Visual Interest */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-indigo-300 dark:bg-indigo-600 rounded-full opacity-60 animate-pulse hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-300 dark:bg-purple-600 rounded-full opacity-40 animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-blue-300 dark:bg-blue-600 rounded-full opacity-50 animate-pulse hidden lg:block" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-indigo-200 dark:bg-indigo-700 rounded-full opacity-30 animate-pulse hidden lg:block" style={{ animationDelay: '0.5s' }}></div>
      </section>

      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};

export default Hero;