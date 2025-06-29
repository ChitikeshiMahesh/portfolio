import React, { useEffect, useRef, useState } from 'react';
import { Award, Calendar, ExternalLink, Star, Trophy, Medal, Target, Users } from 'lucide-react';

const Certifications = () => {
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

  const certifications = [
    {
      title: 'AWS Academy Cloud Foundations',
      issuer: 'Amazon Web Services',
      date: '2023',
      description: 'Foundational understanding of AWS cloud services and architecture.',
      badge: '/image copy.png',
      credentialUrl: '#',
      skills: ['AWS', 'Cloud Computing', 'Architecture', 'Security']
    },
    {
      title: 'Foundations of AI and Machine Learning',
      issuer: 'Google AI',
      date: '2023',
      description: 'Comprehensive understanding of AI and ML fundamentals and applications.',
      badge: '/image.png',
      credentialUrl: '#',
      skills: ['AI', 'Machine Learning', 'Neural Networks', 'Data Science']
    },
    {
      title: 'Computer Networking Certificate',
      issuer: 'Cisco',
      date: '2023',
      description: 'Advanced concepts in computer networking and network security.',
      badge: '/image copy copy.png',
      credentialUrl: '#',
      skills: ['Networking', 'Security', 'Protocols', 'Infrastructure']
    },
    {
      title: 'Operating Systems & Computer Networks',
      issuer: 'Saylor Academy',
      date: '2022',
      description: 'In-depth study of operating systems principles and network fundamentals.',
      badge: '/image copy copy copy copy.png',
      credentialUrl: '#',
      skills: ['Operating Systems', 'System Design', 'Networks', 'Performance']
    },
    {
      title: 'Java (Intermediate)',
      issuer: 'HackerRank',
      date: '2022',
      description: 'Intermediate-level Java programming skills and problem-solving abilities.',
      badge: '/image copy copy copy.png',
      credentialUrl: '#',
      skills: ['Java', 'Programming', 'Problem Solving', 'Algorithms']
    }
  ];

  const hackathons = [
    {
      title: 'Anveshan International Hackathon',
      year: '2025',
      placement: 'Finalist',
      location: 'Chitkara University, Punjab',
      description: 'Represented SR University at the international level, competing against top teams from across the globe.',
      icon: '🌍',
      color: 'blue',
      achievement: 'International Level Representation'
    },
    {
      title: 'Anveshan Hackathon (Zonal)',
      year: '2025',
      placement: '2nd Place',
      location: 'M. S. Ramaiah University, Bangalore',
      description: 'Secured 2nd place in the zonal competition, qualifying for the international round.',
      icon: '🥈',
      color: 'yellow',
      achievement: 'Qualified for International Round'
    }
  ];

  const awards = [
    {
      title: 'Academic Excellence Award',
      year: '2024-2025',
      description: 'Recognized as the top-performing student in the Artificial Intelligence & Machine Learning department.',
      icon: '🎓',
      category: 'Academic'
    },
    {
      title: 'Hackathon Achievement Award',
      year: '2024',
      description: 'Secured 2nd place at the Zonal Anveshan Hackathon 2024.',
      icon: '🏆',
      category: 'Competition'
    },
    {
      title: 'Innovation Excellence',
      year: '2024',
      description: 'Recognized for innovative project contributions and technical leadership.',
      icon: '💡',
      category: 'Innovation'
    }
  ];

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Achievements & Recognition
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Professional certifications, hackathon victories, and academic achievements that demonstrate my commitment to excellence and continuous learning.
          </p>
        </div>

        {/* Hackathons & Competitions */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className={`flex items-center justify-center mb-6 sm:mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-yellow-500 mr-2 sm:mr-3" />
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Hackathons & Competitions</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {hackathons.map((hackathon, index) => (
              <div
                key={index}
                className={`group relative bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 border-2 overflow-hidden touch-manipulation hover:scale-[1.02] hover:-translate-y-1 ${
                  hackathon.color === 'yellow' 
                    ? 'border-yellow-200 dark:border-yellow-700 hover:border-yellow-300 dark:hover:border-yellow-600 hover:shadow-yellow-500/20' 
                    : 'border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-blue-500/20'
                } ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${500 + index * 200}ms`,
                  transitionDelay: isVisible ? `${500 + index * 200}ms` : '0ms'
                }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{hackathon.icon}</div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                      <div className={`text-xl sm:text-2xl md:text-3xl p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${
                        hackathon.color === 'yellow' 
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800' 
                          : 'bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800'
                      }`}>
                        {hackathon.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 leading-tight">
                          {hackathon.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light">{hackathon.year}</p>
                      </div>
                    </div>
                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 group-hover:scale-105 animate-gentle-bounce self-start sm:self-auto flex-shrink-0 ${
                      hackathon.color === 'yellow'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    }`}
                    style={{
                      animationDelay: `${700 + index * 200}ms`
                    }}>
                      {hackathon.placement}
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light">
                      <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{hackathon.location}</span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm font-light">
                      {hackathon.description}
                    </p>
                    
                    <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 group-hover:scale-105 ${
                      hackathon.color === 'yellow'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    }`}>
                      <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                      <span className="leading-tight">{hackathon.achievement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className={`flex items-center justify-center mb-6 sm:mb-8 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Medal className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-blue-500 mr-2 sm:mr-3" />
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Awards & Recognition</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
            {awards.map((award, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-blue-500/20 text-center touch-manipulation hover:scale-105 hover:-translate-y-1 h-full flex flex-col ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${900 + index * 150}ms`,
                  transitionDelay: isVisible ? `${900 + index * 150}ms` : '0ms'
                }}
              >
                <div className={`text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 animate-gentle-bounce`}
                     style={{ animationDelay: `${1100 + index * 150}ms` }}>
                  {award.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                  {award.title}
                </h4>
                <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mb-2 sm:mb-3">{award.year}</div>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-light flex-grow">
                  {award.description}
                </p>
                <span className={`inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-105 animate-gentle-bounce mt-auto`}
                      style={{ animationDelay: `${1300 + index * 150}ms` }}>
                  {award.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className={`flex items-center justify-center mb-6 sm:mb-8 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3" />
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Professional Certifications</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 hover:shadow-green-500/20 touch-manipulation hover:scale-105 hover:-translate-y-1 h-full flex flex-col ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${1200 + index * 150}ms`,
                  transitionDelay: isVisible ? `${1200 + index * 150}ms` : '0ms'
                }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <img
                    src={cert.badge}
                    alt={`${cert.issuer} certification badge`}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0 bg-white dark:bg-gray-800 p-1"
                    onError={(e) => {
                      // Fallback to a default certification icon if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 hidden">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 leading-tight">
                      {cert.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium leading-tight">{cert.issuer}</p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-light">
                      <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed font-light flex-grow">
                  {cert.description}
                </p>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {cert.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`text-xs bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium transition-all duration-300 hover:scale-105 animate-gentle-bounce leading-tight`}
                      style={{ animationDelay: `${1400 + index * 150 + skillIndex * 50}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <a
                  href={cert.credentialUrl}
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-xs sm:text-sm font-medium group-hover:underline transition-all duration-300 hover:translate-x-1 mt-auto"
                >
                  <span>View Credential</span>
                  <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-1 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Statistics */}
        <div className={`bg-gradient-to-r from-slate-800 via-gray-900 to-black rounded-2xl p-4 sm:p-6 md:p-8 text-white border border-gray-700 transition-all duration-1000 delay-1500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Achievement Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
            <div className="group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">2</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light leading-tight">Hackathon Wins</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">{certifications.length}</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light leading-tight">Certifications</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-green-400 group-hover:text-green-300 transition-colors duration-300">{awards.length}</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light leading-tight">Awards Received</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">9.0</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light leading-tight">CGPA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;