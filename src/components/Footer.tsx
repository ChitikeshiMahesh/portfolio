import React from 'react';
import { Code, Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Mahesh-ch06', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mahesh-chitikeshi-b7a0982b9/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:chitikeshimahesh6@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold">Mahesh</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Computer Science & Engineering student specializing in AI & ML at SR University. 
              Passionate about building intelligent solutions and exploring the frontiers of technology.
            </p>
            {/* Fixed Social Links - Proper Mobile Alignment */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group p-3 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-indigo-600 transition-all duration-300 hover:scale-105 hover:-translate-y-1 touch-manipulation flex items-center justify-center"
                >
                  <social.icon className="h-5 w-5 group-hover:rotate-6 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-2 text-gray-300">
              <p>Warangal, Telangana, India</p>
              <p>chitikeshimahesh6@gmail.com</p>
              <p>+91 7013295712</p>
            </div>
            <div className="mt-4 p-4 bg-gray-800 dark:bg-gray-900 rounded-lg">
              <h4 className="font-medium mb-2 text-indigo-400">Currently Seeking</h4>
              <p className="text-sm text-gray-300">
                AI/ML Engineering roles, Software Development positions, and Research opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Fixed Copyright Alignment */}
        <div className="border-t border-gray-800 dark:border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Fixed Copyright Text with Proper Alignment */}
            <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm sm:text-base">
              <span>© {currentYear} Mahesh. Made with</span>
              <Heart className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span>using React & Tailwind CSS</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 touch-manipulation"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;