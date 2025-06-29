import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Eye, X, Star, Users, ArrowRight, ChevronDown, ChevronUp, Plus } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
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

  const projects = [
    {
      id: 1,
      title: 'CampusConnect',
      subtitle: 'Startup ✨',
      description: 'A smart solution to simplify everyday student life on campus. From placing food and snack orders to requesting Xerox and other essentials — all in one place, eliminating queues and manual requests for more convenience and transparency.',
      longDescription: 'CampusConnect is a comprehensive platform designed to revolutionize student life on campus. The application eliminates traditional queues and manual request processes by providing a centralized digital solution for all campus services. Currently in development with a planned release in 2026, the platform features secure authentication, role-based access control, and a scalable architecture ready for future service integrations.',
      technologies: ['Firebase', 'React', 'Node.js', 'Role-Based Access'],
      features: [
        'Firebase Authentication for secure login',
        'Role-based access for Students and Admins',
        'Dynamic navigation based on user role',
        'Future-ready structure for service integration'
      ],
      image: '/Gray Minimalist Abstract Coming Soon Fashion Video.png',
      githubUrl: 'https://github.com/Mahesh-ch06',
      liveUrl: 'https://lnkd.in/gGBRhk2d',
      category: 'Startup',
      featured: true,
      status: 'In Development',
      releaseDate: '2026',
      demoStatus: 'Coming Soon',
      collaborationUrl: 'https://mahesh06.me/form/'
    },
    {
      id: 2,
      title: 'Personal Portfolio',
      description: 'Responsive portfolio website built from scratch to showcase projects and skills.',
      longDescription: 'Modern, responsive portfolio website featuring dark mode, smooth animations, and an integrated AI chatbot. Built with React and Tailwind CSS for optimal performance across all devices.',
      technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Gemini API'],
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500',
      githubUrl: 'https://github.com/Mahesh-ch06',
      liveUrl: 'https://mahesh06.me',
      category: 'Web Development'
    },
    {
      id: 3,
      title: 'DSA Resource Platform',
      description: 'Interactive peer-learning platform for Data Structures and Algorithms concepts.',
      longDescription: 'Educational platform designed to help students learn DSA concepts through interactive examples, practice problems, and peer collaboration features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500',
      githubUrl: 'https://github.com/Mahesh-ch06',
      liveUrl: '#',
      category: 'Education'
    },
    {
      id: 4,
      title: 'Digital Diary App',
      description: 'Secure digital diary for users to manage and track thoughts with intuitive interface.',
      longDescription: 'A secure, user-friendly digital diary application with features for organizing thoughts, adding tags, and searching through entries. Built with Python Flask backend.',
      technologies: ['Python', 'Flask', 'SQLite', 'HTML/CSS'],
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500',
      githubUrl: 'https://github.com/Mahesh-ch06',
      liveUrl: '#',
      category: 'Web Application'
    },
    // Additional projects (hidden by default)
    {
      id: 5,
      title: 'AI Chat Assistant',
      description: 'Intelligent chatbot powered by machine learning for customer support automation.',
      longDescription: 'Advanced AI chatbot system built with natural language processing capabilities. Features include intent recognition, context awareness, and seamless integration with existing customer support workflows.',
      technologies: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
      githubUrl: 'https://github.com/Mahesh-ch06',
      liveUrl: '#',
      category: 'AI/ML'
    },
    {
      id: 6,
      title: 'E-Commerce Dashboard',
      description: 'Comprehensive admin dashboard for e-commerce management with real-time analytics.',
      longDescription: 'Full-featured e-commerce admin panel with inventory management, order tracking, customer analytics, and real-time sales reporting. Built with modern web technologies for optimal performance.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
      githubUrl: 'https://github.com/Mahesh-ch06',
      liveUrl: '#',
      category: 'Web Development'
    },
    {
      id: 7,
      title: 'Weather Prediction Model',
      description: 'Machine learning model for accurate weather forecasting using historical data.',
      longDescription: 'Advanced weather prediction system using ensemble machine learning techniques. Incorporates multiple data sources and provides accurate short-term and long-term weather forecasts.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=500',
      githubUrl: 'https://github.com/Mahesh-ch06',
      liveUrl: '#',
      category: 'AI/ML'
    },
    {
      id: 8,
      title: 'Task Management System',
      description: 'Collaborative project management tool with team coordination features.',
      longDescription: 'Comprehensive task management platform designed for team collaboration. Features include project tracking, deadline management, team communication, and progress visualization.',
      technologies: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500',
      githubUrl: 'https://github.com/Mahesh-ch06',
      liveUrl: '#',
      category: 'Web Application'
    }
  ];

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Show only first 4 projects by default, or all if expanded
  const displayedProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, 4);

  const hasMoreProjects = filteredProjects.length > 4;

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className={`text-center mb-10 sm:mb-14 md:mb-18 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6 px-2 leading-tight">
            Things I've Built
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-3 leading-relaxed font-light">
            A collection of my work showcasing expertise in <span className="font-medium text-indigo-600 dark:text-indigo-400">full-stack development</span>, <span className="font-medium text-purple-600 dark:text-purple-400">web applications</span>, and <span className="font-medium text-blue-600 dark:text-blue-400">practical solutions</span>.
          </p>
        </div>

        {/* CampusConnect Collaboration Banner */}
        <div className={`mb-8 sm:mb-12 bg-gradient-to-r from-slate-800 via-gray-900 to-black rounded-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden border border-gray-700 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-slate-800/30 to-gray-900/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2 sm:mb-3">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  <span className="text-base sm:text-lg font-semibold text-blue-400">Join CampusConnect</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Want to be part of CampusConnect?</h3>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
                  We're building the future of campus life! Join our team and help revolutionize how students interact with campus services. We welcome developers, designers, and innovators.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://mahesh06.me/form/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:shadow-blue-500/25 touch-manipulation text-sm sm:text-base group"
                >
                  <span>Join Our Team</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-2 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAllProjects(false); // Reset to show only 4 when changing category
              }}
              className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base touch-manipulation hover:scale-105 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 dark:border-gray-700 touch-manipulation ${
                project.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationDelay: `${700 + index * 150}ms`,
                transitionDelay: isVisible ? `${700 + index * 150}ms` : '0ms'
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col space-y-1 sm:space-y-2">
                  {project.featured && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium shadow-lg">
                      <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span>Featured</span>
                    </div>
                  )}
                  {project.subtitle && (
                    <span className="bg-blue-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium shadow-lg">
                      {project.subtitle}
                    </span>
                  )}
                  {project.status && (
                    <span className="bg-green-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium shadow-lg">
                      {project.status}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/95 text-gray-900 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-all duration-300 flex items-center space-x-1 touch-manipulation shadow-lg hover:scale-105"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Details</span>
                    </button>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <a
                        href={project.githubUrl}
                        className="bg-white/95 text-gray-900 p-2 sm:p-2.5 rounded-full hover:bg-white transition-all duration-300 touch-manipulation shadow-lg hover:scale-110 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="View GitHub Repository"
                      >
                        <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                      <a
                        href={project.liveUrl}
                        className="bg-white/95 text-gray-900 p-2 sm:p-2.5 rounded-full hover:bg-white transition-all duration-300 touch-manipulation shadow-lg hover:scale-110 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="View Live Demo"
                      >
                        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.releaseDate && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-light">
                        Release: {project.releaseDate} • Demo: {project.demoStatus}
                      </p>
                    )}
                  </div>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full ml-2 flex-shrink-0 font-medium">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMoreProjects && (
          <div className={`text-center mt-8 sm:mt-12 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="group inline-flex items-center space-x-2 sm:space-x-3 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 touch-manipulation text-sm sm:text-base"
            >
              {showAllProjects ? (
                <>
                  <span>Show Less Projects</span>
                  <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform" />
                  <span>Show More Projects ({filteredProjects.length - 4} more)</span>
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
            
            {!showAllProjects && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-3 font-light">
                Showing {displayedProjects.length} of {filteredProjects.length} projects
              </p>
            )}
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-40 sm:h-48 md:h-64 object-cover"
                />
                {/* Fixed Close Button with Better Alignment */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 touch-manipulation hover:scale-110 flex items-center justify-center shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col space-y-1 sm:space-y-2">
                  {selectedProject.featured && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                      <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span>Featured Project</span>
                    </div>
                  )}
                  {selectedProject.subtitle && (
                    <span className="bg-blue-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                      {selectedProject.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h3>
                    {selectedProject.releaseDate && (
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-light">
                        Currently in development • Release: {selectedProject.releaseDate} • Demo: {selectedProject.demoStatus}
                      </p>
                    )}
                  </div>
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {selectedProject.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm md:text-base font-light">
                  {selectedProject.longDescription}
                </p>
                
                {selectedProject.features && (
                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">Key Features:</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Collaboration CTA for CampusConnect */}
                {selectedProject.collaborationUrl && (
                  <div className="mb-4 sm:mb-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg p-3 sm:p-4 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">Join Our Team!</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 leading-relaxed font-light">
                      Want to be part of CampusConnect? We're looking for passionate developers, designers, and innovators to join our mission.
                    </p>
                    <a
                      href={selectedProject.collaborationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium touch-manipulation hover:scale-105 hover:shadow-lg group"
                    >
                      <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Join CampusConnect</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                  <a
                    href={selectedProject.githubUrl}
                    className="flex items-center justify-center space-x-2 bg-gray-900 dark:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 touch-manipulation text-xs sm:text-sm hover:scale-105"
                  >
                    <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>View Code</span>
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 touch-manipulation text-xs sm:text-sm hover:scale-105"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Stats */}
        <div className={`mt-12 sm:mt-16 bg-gradient-to-r from-slate-800 via-gray-900 to-black rounded-2xl p-4 sm:p-6 md:p-8 text-white border border-gray-700 transition-all duration-1000 delay-1200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Project Portfolio</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">{projects.length}</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light">Total Projects</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">1</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light">Startup Project</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">{new Set(projects.flatMap(p => p.technologies)).size}</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light">Technologies Used</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">2026</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base font-light">Next Release</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;