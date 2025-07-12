import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

// Memoized Chatbot component for better performance
const Chatbot = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Mahesh's AI assistant. I can help you learn more about his projects, skills, or experience. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqSuggestions = [
    "Tell me about CampusConnect",
    "How can I join CampusConnect?",
    "What are your technical skills?",
    "How can I contact you?"
  ];

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Name recognition
    const nameMatch = message.match(/\bmy name is ([a-zA-Z ]+)/i) || message.match(/\bi['']?m ([a-zA-Z ]+)/i);
    if (nameMatch) {
      const extractedName = nameMatch[1].trim().replace(/\bmahesh\b/i, "").trim();
      if (message.includes("mahesh") && extractedName === "") {
        return "What a pleasant coincidence! Always a pleasure to meet another Mahesh. How may I assist you with Mr. Chitikeshi Mahesh's portfolio?";
      } else {
        const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
        return `It's great to meet you, ${formattedName}! I'm the AI assistant for Mr. Chitikeshi Mahesh. How may I assist you with his professional portfolio today?`;
      }
    }

    // Greetings
    if (/^(hi|hello|hey|hii)\b/.test(message)) {
      return "Hello! I'm Mr. Mahesh's professional AI assistant. How may I assist you with his portfolio today?";
    }

    // About Mahesh
    if (message.includes("who is mahesh") || message.includes("about mahesh")) {
      return "Mr. Chitikeshi Mahesh is a skilled developer passionate about AI, machine learning, and modern web technologies. He is the founder of <strong>CampusConnect</strong>, an innovative student life platform. Would you like to explore his projects or skill set?";
    }

    // CampusConnect specific
    if (message.includes("campusconnect") || message.includes("campus connect")) {
      return "CampusConnect is Mahesh's flagship startup project! It's a smart solution to simplify everyday student life on campus. The platform allows students to place food and snack orders, request Xerox services, and access other campus essentials - all in one place, eliminating queues and manual requests. It features Firebase authentication, role-based access for students and admins, and is currently in development with a planned release in 2026. Demo coming soon! <br><br>🚀 <strong>Want to join the team?</strong> Visit: <a href='https://mahesh06.me/form/' target='_blank' style='color: #4f46e5; text-decoration: underline;'>https://mahesh06.me/form/</a>";
    }

    // Join/Collaboration
    if (message.includes("join") || message.includes("collaborate") || message.includes("team") || message.includes("work together")) {
      return `Exciting! Mahesh is always looking for passionate individuals to join CampusConnect. Whether you're a developer, designer, or innovator, there's a place for you! <br><br>🎯 <strong>Join CampusConnect:</strong> <a href='https://mahesh06.me/form/' target='_blank' style='color: #4f46e5; text-decoration: underline;'>https://mahesh06.me/form/</a><br><br>Fill out the form and Mahesh will get back to you about collaboration opportunities!`;
    }

    // Startup/Business
    if (message.includes("startup") || message.includes("business") || message.includes("entrepreneur")) {
      return "Yes! Mahesh is working on CampusConnect, an innovative startup that aims to revolutionize student life on campus. The platform is currently in development with a planned release in 2026. It's designed to eliminate traditional queues and manual processes by providing a centralized digital solution for all campus services. <br><br>Interested in joining? Check out: <a href='https://mahesh06.me/form/' target='_blank' style='color: #4f46e5; text-decoration: underline;'>https://mahesh06.me/form/</a>";
    }

    // Hiring
    if (message.includes("hire")) {
      return `That's wonderful! You can express your interest by filling out this short form: <a href="https://mahesh06.me/form/" target="_blank" style="color: #4f46e5; text-decoration: underline;">https://mahesh06.me/form/</a>. Mr. Mahesh will get back to you promptly.`;
    }

    // Learning/Mentorship
    if (message.includes("learn from") || message.includes("learn")) {
      return `Mr. Mahesh regularly shares insights through projects and open-source code. Feel free to explore his GitHub or reach out for mentorship via this form: <a href="https://mahesh06.me/form/" target="_blank" style="color: #4f46e5; text-decoration: underline;">https://mahesh06.me/form/</a>.`;
    }

    // Projects
    if (message.includes('project') || message.includes('work')) {
      return "Mahesh has worked on several exciting projects! His flagship project is <strong>CampusConnect</strong> - a startup solution for campus life management. Other notable projects include his Personal Portfolio Website, DSA Resource Platform, and Digital Diary App. Each showcases different aspects of full-stack development and problem-solving. Would you like to know more about any specific project?";
    }
    
    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      return "Mahesh's technical skills span across multiple areas: Programming (Java, Python, JavaScript, SQL, HTML/CSS), Technologies (Git, VS Code, Linux, AWS Cloud, Firebase, React.js, Node.js), and specialized areas like Data Structures & Algorithms, Full-Stack Development, AI/ML, and Cloud Computing. He maintains a strong academic record with a 9.0 GPA in his CSE program.";
    }
    
    // Contact
    if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      return `You can reach Mahesh through several channels: Email at <a href="mailto:chitikeshimahesh6@gmail.com" style="color: #4f46e5; text-decoration: underline;">chitikeshimahesh6@gmail.com</a>, phone at <a href="tel:+917013295712" style="color: #4f46e5; text-decoration: underline;">+91-7013295712</a>, or connect with him on <a href="https://www.linkedin.com/in/chitikeshimahesh/" target="_blank" style="color: #4f46e5; text-decoration: underline;">LinkedIn</a> and <a href="https://github.com/Mahesh-ch06" target="_blank" style="color: #4f46e5; text-decoration: underline;">GitHub</a>. He's always open to discussing new opportunities or collaborations!`;
    }
    
    // Education
    if (message.includes('education') || message.includes('study') || message.includes('university')) {
      return "Mahesh is currently pursuing B.Tech in Computer Science and Engineering with a specialization in AI & ML at SR University, Warangal (2023-2027). He maintains a strong academic record with a 9.0 GPA and has completed courses in Data Structures, Algorithms, Operating Systems, Computer Networks, Machine Learning, Python Programming, and Database Systems.";
    }
    
    // Certifications
    if (message.includes('certification') || message.includes('course') || message.includes('learning')) {
      return "Mahesh has several professional certifications including AWS Academy Cloud Foundations, Foundations of AI and Machine Learning from Google AI, Computer Networking Certificate from Cisco, Operating Systems & Computer Networks from Saylor Academy, and Java (Intermediate) from HackerRank. He believes in continuous learning!";
    }
    
    // Experience/AI/ML
    if (message.includes('experience') || message.includes('ai') || message.includes('ml') || message.includes('machine learning')) {
      return "Mahesh's AI/ML experience includes building intelligent systems, working with modern web technologies, and developing scalable applications. He's worked with Firebase, React, Node.js, and has hands-on experience with data structures, algorithms, and full-stack development workflows. He's particularly passionate about the intersection of AI and software engineering.";
    }

    // Hackathons/Achievements
    if (message.includes('hackathon') || message.includes('achievement') || message.includes('award')) {
      return "Mahesh has participated in several prestigious hackathons including the Anveshan International Hackathon 2025 at Chitkara University, Punjab, and secured 2nd place in the Anveshan Hackathon (Zonal) 2024 at M. S. Ramaiah University, Bangalore. He's also received the Academic Excellence Award as the top-ranked student in the AI & ML Department for 2024-2025.";
    }

    // Thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! I'm happy to help. If you have any other questions about Mahesh's work, projects, or experience, feel free to ask!";
    }
    
    // Default response
    return "That's an interesting question! While I can provide information about Mahesh's projects, skills, education, and experience, I might not have specific details about that topic. You can always contact Mahesh directly for more detailed discussions. Is there anything else about his background or work you'd like to know?";
  };

  const handleSendMessage = React.useCallback(() => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  }, [inputMessage, messages.length]);

  const handleSuggestionClick = React.useCallback((suggestion) => {
    setInputMessage(suggestion);
  }, []);

  const formatTime = React.useCallback((timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 touch-manipulation will-change-transform ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white hover:shadow-xl transform hover:scale-105`}
      >
        {isOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm md:w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[70vh] md:h-96">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Mahesh's AI Assistant</h3>
                <p className="text-xs text-indigo-100">Ask me anything about Mahesh!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-800 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-2 max-w-[85%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-3 w-3" />
                    ) : (
                      <Bot className="h-3 w-3" />
                    )}
                  </div>
                  <div className={`rounded-lg p-2 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                  }`}>
                    <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: message.text }} />
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-2 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                    <Bot className="h-3 w-3" />
                  </div>
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* FAQ Suggestions */}
          {messages.length === 1 && (
            <div className="px-3 pb-2 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="grid grid-cols-1 gap-1">
                {faqSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left text-xs p-2 bg-white dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-200 dark:border-gray-700 touch-manipulation"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900 flex-shrink-0">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                style={{ fontSize: '16px' }} // Prevents zoom on iOS
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors touch-manipulation"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Chatbot.displayName = 'Chatbot';

export default Chatbot;