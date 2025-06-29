import React, { useState, useEffect } from 'react';
import { Menu, X, Code, User, Briefcase, Award, Mail, BookOpen, Trophy } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'home', icon: Code },
    { name: 'About', id: 'about', icon: User },
    { name: 'Projects', id: 'projects', icon: Briefcase },
    { name: 'Skills', id: 'skills', icon: Award },
    { name: 'Achievements', id: 'certifications', icon: Trophy },
    { name: 'Blog', id: 'blog', icon: BookOpen },
    { name: 'Contact', id: 'contact', icon: Mail },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">Mahesh</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-sm lg:text-base px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button and Theme Toggle - Fixed Alignment */}
          <div className="md:hidden flex items-center justify-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-3 rounded-b-lg shadow-lg mx-1">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-left touch-manipulation rounded-lg mx-2"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;