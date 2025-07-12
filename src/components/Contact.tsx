import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download, Eye, X, Check } from 'lucide-react';

// Memoized Contact component for better performance
const Contact = React.memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const formDataToSend = new FormData();
      
      // Add the access key
      formDataToSend.append("access_key", "63fd6017-7d0b-452d-989b-935be400eea1");
      
      // Add form fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);
      
      // Add honeypot field for spam protection
      formDataToSend.append("botcheck", "");
      
      // Add additional metadata
      formDataToSend.append("from_name", "Portfolio Contact Form");
      formDataToSend.append("to_name", "Mahesh");

      console.log("Submitting form data:", Object.fromEntries(formDataToSend));

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Show success screen with animation
        setShowSuccessScreen(true);
        
        // Auto-hide success screen after 4 seconds
        setTimeout(() => {
          setShowSuccessScreen(false);
        }, 4000);
      } else {
        console.error("Form submission failed:", data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Auto-hide status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  }, [formData]);

  const handleDownloadResume = React.useCallback(() => {
    const link = document.createElement('a');
    link.href = '/Resume_Mahesh.pdf';
    link.download = 'Mahesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleViewResume = React.useCallback(() => {
    setIsResumeOpen(true);
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'chitikeshimahesh6@gmail.com',
      href: 'mailto:chitikeshimahesh6@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7013295712',
      href: 'tel:+917013295712'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Warangal, Telangana, India',
      href: 'https://maps.google.com/?q=Warangal,Telangana,India'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Mahesh-ch06',
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mahesh-chitikeshi-b7a0982b9/',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <>
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-3 leading-relaxed">
              I'm always open to discussing new opportunities, collaborations, or just having a conversation about technology and AI.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">Let's Connect</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I'd love to hear from you. I'm currently seeking opportunities in AI/ML engineering, 
                  software development, and research positions.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 group touch-manipulation"
                  >
                    <div className="p-1.5 sm:p-2 md:p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <info.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">{info.label}</div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base break-all">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links - Enhanced Mobile Layout */}
              <div className="w-full">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Follow Me</h4>
                <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`group p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 dark:text-gray-300 ${social.color} hover:scale-105 hover:-translate-y-1 touch-manipulation flex items-center justify-center`}
                      title={social.label}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-6 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Enhanced Resume Download Section */}
              <div className="bg-gradient-to-r from-slate-800 via-gray-900 to-black rounded-xl p-3 sm:p-4 md:p-6 text-white border border-gray-700">
                <h4 className="font-semibold mb-2 text-blue-400 text-sm sm:text-base">Download My Resume</h4>
                <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  Get a detailed overview of my skills, experience, and projects.
                </p>
                <div className="flex flex-col space-y-2 sm:space-y-3">
                  <button 
                    onClick={handleViewResume}
                    className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors touch-manipulation text-xs sm:text-sm w-full"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>View Resume</span>
                  </button>
                  <button 
                    onClick={handleDownloadResume}
                    className="flex items-center justify-center space-x-2 bg-white text-gray-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors touch-manipulation text-xs sm:text-sm w-full"
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm md:text-base"
                      placeholder="Enter your name"
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm md:text-base"
                      placeholder="Enter your email"
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm md:text-base"
                    placeholder="What's this about?"
                    style={{ fontSize: '16px' }} // Prevents zoom on iOS
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm md:text-base"
                    placeholder="Tell me about your project or just say hello..."
                    style={{ fontSize: '16px' }} // Prevents zoom on iOS
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5 hover:shadow-lg'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                  <p className="text-red-800 dark:text-red-300 font-medium text-xs sm:text-sm md:text-base">
                    ❌ Sorry, there was an error sending your message. Please try again or contact me directly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Success Screen */}
      {showSuccessScreen && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="text-center max-w-md mx-auto animate-fade-in">
            {/* Animated Check Icon */}
            <div className="relative mb-6 sm:mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-teal-600 rounded-full flex items-center justify-center animate-bounce">
                <Check className="h-10 w-10 sm:h-12 sm:w-12 text-white animate-pulse" />
              </div>
              {/* Ripple Effect */}
              <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-teal-600/30 rounded-full animate-ping"></div>
            </div>

            {/* Success Message */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Thank You!
              </h2>
              <p className="text-base sm:text-lg text-blue-200 leading-relaxed px-2">
                Thank you for reaching out to Mr. Mahesh. Your message has been received and will be reviewed promptly.
              </p>
            </div>

            {/* Auto-close indicator */}
            <div className="mt-6 sm:mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-24 sm:w-32 h-1 bg-blue-800 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full animate-progress"></div>
              </div>
              <p className="text-xs sm:text-sm text-blue-300 mt-2">Closing automatically...</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Resume Viewer Modal */}
      {isResumeOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl">
            {/* Compact Header with Logo Only */}
            <div className="flex items-center justify-between p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700">
              {/* Left Section - Just Logo and Title */}
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">Resume</span>
              </div>
              
              {/* Right Section - Compact Action Buttons */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={handleDownloadResume}
                  className="flex items-center justify-center space-x-1 bg-blue-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium touch-manipulation"
                  title="Download Resume"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="flex items-center justify-center p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors touch-manipulation bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  title="Close"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 relative">
              <iframe
                src="/Resume_Mahesh.pdf"
                className="w-full h-full border-0"
                title="Mahesh Resume"
              />
            </div>

            {/* Minimal Bottom Banner */}
            <div className="bg-gray-900 px-3 py-2 flex items-center justify-between text-white text-xs">
              <div className="flex items-center space-x-2">
                <Download className="h-3 w-3" />
                <span>Can't view?</span>
              </div>
              <button
                onClick={handleDownloadResume}
                className="text-gray-300 hover:text-white underline transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Contact.displayName = 'Contact';

export default Contact;