import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Download, Settings, Volume2, VolumeX, Minimize2, Maximize2, ThumbsUp, ThumbsDown } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userName, setUserName] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('default');
  const [fontSize, setFontSize] = useState('normal');
  const [showSettings, setShowSettings] = useState(false);
  const [visitCount, setVisitCount] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Mahesh's AI assistant. I can help you learn more about his projects, skills, or experience. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ["Tell me about CampusConnect", "What are your technical skills?", "How can I contact you?"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Type your message...');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const placeholders = [
    "Ask about Mahesh's projects...",
    "What technologies does he use?",
    "Tell me about CampusConnect...",
    "How can I contact him?",
    "What are his achievements?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderText(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load conversation from localStorage
    const savedConversation = localStorage.getItem('mahesh-chatbot-conversation');
    const savedUserName = localStorage.getItem('mahesh-chatbot-username');
    const savedVisitCount = localStorage.getItem('mahesh-chatbot-visits');
    
    if (savedConversation) {
      try {
        const parsed = JSON.parse(savedConversation);
        setMessages(parsed.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (e) {
        console.log('Error loading conversation:', e);
      }
    }
    
    if (savedUserName) {
      setUserName(savedUserName);
    }
    
    if (savedVisitCount) {
      setVisitCount(parseInt(savedVisitCount) + 1);
      localStorage.setItem('mahesh-chatbot-visits', visitCount.toString());
    } else {
      localStorage.setItem('mahesh-chatbot-visits', '1');
    }
  }, []);

  useEffect(() => {
    // Save conversation to localStorage
    localStorage.setItem('mahesh-chatbot-conversation', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('mahesh-chatbot-username', userName);
    }
  }, [userName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsAtBottom(scrollHeight - scrollTop === clientHeight);
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const playNotificationSound = () => {
    if (soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSEFl4Ph8N2QOwkUdMXy2YUwBw5I');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  const faqSuggestions = [
    "Tell me about CampusConnect",
    "How can I join CampusConnect?",
    "What are your technical skills?",
    "How can I contact you?",
    "What are your achievements?",
    "Tell me about your education"
  ];

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    let response = "";
    let suggestions = [];
    
    // Name recognition with improved pattern
    const nameMatch = message.match(/\b(?:my name is|i['']?m|call me)\s+([a-zA-Z\s]+)/i);
    if (nameMatch) {
      const extractedName = nameMatch[1].trim().replace(/\bmahesh\b/i, "").trim();
      if (message.includes("mahesh") && extractedName === "") {
        setUserName("Mahesh");
        return {
          text: "What a pleasant coincidence! Always a pleasure to meet another Mahesh. How may I assist you with Mr. Chitikeshi Mahesh's portfolio?",
          suggestions: ["Tell me about CampusConnect", "What are your technical skills?", "How can I contact you?"]
        };
      } else if (extractedName) {
        const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
        setUserName(formattedName);
        return {
          text: `It's great to meet you, ${formattedName}! I'm the AI assistant for Mr. Chitikeshi Mahesh. How may I assist you with his professional portfolio today?`,
          suggestions: ["Tell me about CampusConnect", "What are your technical skills?", "Show me his projects"]
        };
      }
    }

    // Welcome back message
    if (userName && visitCount > 1 && (message.includes("hi") || message.includes("hello") || message.includes("hey"))) {
      response = `Welcome back, ${userName}! Great to see you again. How can I help you explore more of Mahesh's work today?`;
      suggestions = ["What's new with CampusConnect?", "Show me his latest projects", "How can I collaborate?"];
    }
    // First time greeting
    else if (/^(hi|hello|hey|hii)\b/.test(message)) {
      response = "Hello! I'm Mr. Mahesh's professional AI assistant. How may I assist you with his portfolio today?";
      suggestions = ["Tell me about CampusConnect", "What are your technical skills?", "How can I contact you?"];
    }
    // About Mahesh
    else if (message.includes("who is mahesh") || message.includes("about mahesh")) {
      response = "Mr. Chitikeshi Mahesh is a skilled developer passionate about AI, machine learning, and modern web technologies. He is the founder of <strong>CampusConnect</strong>, an innovative student life platform. Would you like to explore his projects or skill set?";
      suggestions = ["Tell me about CampusConnect", "What are his technical skills?", "Show me his achievements"];
    }
    // CampusConnect specific with enhanced response
    else if (message.includes("campusconnect") || message.includes("campus connect")) {
      response = "CampusConnect is Mahesh's flagship startup project! 🚀 It's a smart solution to simplify everyday student life on campus. The platform allows students to place food and snack orders, request Xerox services, and access other campus essentials - all in one place, eliminating queues and manual requests. It features Firebase authentication, role-based access for students and admins, and is currently in development with a <strong>planned release in 2026</strong>. Demo coming soon! <br><br>🌟 <strong>Want to join the team?</strong> Visit: <a href='https://mahesh06.me/form/' target='_blank' style='color: #4f46e5; text-decoration: underline;'>https://mahesh06.me/form/</a>";
      suggestions = ["How can I join the team?", "When will it launch?", "What technologies are used?"];
    }
    // Join/Collaboration
    else if (message.includes("join") || message.includes("collaborate") || message.includes("team") || message.includes("work together")) {
      response = `Exciting! 🎉 Mahesh is always looking for passionate individuals to join CampusConnect. Whether you're a developer, designer, or innovator, there's a place for you! <br><br>🎯 <strong>Join CampusConnect:</strong> <a href='https://mahesh06.me/form/' target='_blank' style='color: #4f46e5; text-decoration: underline;'>https://mahesh06.me/form/</a><br><br>Fill out the form and Mahesh will get back to you about collaboration opportunities!`;
      suggestions = ["What skills are needed?", "Tell me about the team", "How can I contact Mahesh?"];
    }
    // Projects with better follow-up
    else if (message.includes('project') || message.includes('work')) {
      response = "Mahesh has worked on several exciting projects! 💻 His flagship project is <strong>CampusConnect</strong> - a startup solution for campus life management. Other notable projects include his Personal Portfolio Website, DSA Resource Platform, and Digital Diary App. Each showcases different aspects of full-stack development and problem-solving.";
      suggestions = ["Tell me about CampusConnect", "What about the DSA Platform?", "Show me his portfolio"];
    }
    // Skills with enhanced formatting
    else if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      response = "Mahesh's technical skills span across multiple areas: <br><br>💻 <strong>Programming:</strong> Java, Python, JavaScript, SQL, HTML/CSS<br>🛠️ <strong>Technologies:</strong> Git, VS Code, Linux, AWS Cloud, Firebase, React.js, Node.js<br>🚀 <strong>Specializations:</strong> Data Structures & Algorithms, Full-Stack Development, AI/ML, Cloud Computing<br><br>He maintains a strong academic record with a 9.0 GPA in his CSE program.";
      suggestions = ["Tell me about his projects", "What about AI/ML experience?", "Show me his certifications"];
    }
    // Contact
    else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      response = `You can reach Mahesh through several channels: 📧 Email at <a href="mailto:chitikeshimahesh6@gmail.com" style="color: #4f46e5; text-decoration: underline;">chitikeshimahesh6@gmail.com</a>, 📱 phone at <a href="tel:+917013295712" style="color: #4f46e5; text-decoration: underline;">+91-7013295712</a>, or connect with him on <a href="https://www.linkedin.com/in/chitikeshimahesh/" target="_blank" style="color: #4f46e5; text-decoration: underline;">LinkedIn</a> and <a href="https://github.com/Mahesh-ch06" target="_blank" style="color: #4f46e5; text-decoration: underline;">GitHub</a>. He's always open to discussing new opportunities or collaborations!`;
      suggestions = ["Schedule a meeting", "Join CampusConnect", "View his portfolio"];
    }
    // Achievements
    else if (message.includes('hackathon') || message.includes('achievement') || message.includes('award')) {
      response = "Mahesh has an impressive track record! 🏆 He participated in the Anveshan International Hackathon 2025 at Chitkara University, Punjab, and secured <strong>2nd place</strong> in the Anveshan Hackathon (Zonal) 2024 at M. S. Ramaiah University, Bangalore. He's also received the <strong>Academic Excellence Award</strong> as the top-ranked student in the AI & ML Department for 2024-2025.";
      suggestions = ["Tell me about his skills", "What about his education?", "How can I contact him?"];
    }
    // Easter eggs
    else if (message.includes('open sesame') || message.includes('easter egg')) {
      response = "🎉 You found an easter egg! Here's a fun fact: Mahesh once debugged a complex algorithm at 3 AM fueled by nothing but determination and coffee! ☕ He believes the best solutions come when you're passionate about the problem you're solving.";
      suggestions = ["Tell me more about his projects", "What are his technical skills?", "How can I join his team?"];
    }
    // Jokes
    else if (message.includes('joke') || message.includes('funny')) {
      response = "😄 I focus on Mahesh's professional work, but here's one: Why do programmers prefer dark mode? Because light attracts bugs! 🐛 Speaking of bugs, Mahesh is excellent at debugging complex problems!";
      suggestions = ["Tell me about his problem-solving skills", "What projects has he worked on?", "How can I contact him?"];
    }
    // Thanks
    else if (message.includes('thank') || message.includes('thanks')) {
      response = `You're very welcome${userName ? `, ${userName}` : ''}! 😊 I'm happy to help. If you have any other questions about Mahesh's work, projects, or experience, feel free to ask!`;
      suggestions = ["Download chat transcript", "Contact Mahesh", "Join CampusConnect"];
    }
    // Default with better guidance
    else {
      response = `That's an interesting question${userName ? `, ${userName}` : ''}! While I specialize in sharing details about Mahesh's projects, skills, education, and achievements, I might not have specific information about that topic. Here's what I can help you with:`;
      suggestions = ["Tell me about CampusConnect", "What are his technical skills?", "Show me his achievements", "How can I contact him?"];
    }

    return { text: response, suggestions };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate more realistic typing delay
    const typingDelay = Math.min(Math.max(inputMessage.length * 50, 800), 2500);
    
    setTimeout(() => {
      const botResponseData = getBotResponse(inputMessage);
      const botResponse = {
        id: messages.length + 2,
        text: botResponseData.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botResponseData.suggestions
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      playNotificationSound();
    }, typingDelay);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleFeedback = (messageId, isPositive) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, feedback: isPositive ? 'positive' : 'negative' }
        : msg
    ));
  };

  const downloadChatTranscript = () => {
    const transcript = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.sender === 'user' ? 'You' : 'Mahesh\'s Assistant'}: ${msg.text.replace(/<[^>]*>/g, '')}`
    ).join('\n\n');
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahesh-portfolio-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: `Hi${userName ? ` ${userName}` : ''}! I'm Mahesh's AI assistant. I can help you learn more about his projects, skills, or experience. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ["Tell me about CampusConnect", "What are your technical skills?", "How can I contact you?"]
    }]);
    localStorage.removeItem('mahesh-chatbot-conversation');
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getThemeClasses = () => {
    const themes = {
      default: 'bg-white dark:bg-gray-900',
      dark: 'bg-gray-900',
      minimal: 'bg-gray-50 dark:bg-gray-800',
      gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800'
    };
    return themes[theme] || themes.default;
  };

  const getFontSizeClass = () => {
    const sizes = {
      small: 'text-xs',
      normal: 'text-sm',
      large: 'text-base'
    };
    return sizes[fontSize] || sizes.normal;
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 touch-manipulation ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white hover:shadow-xl transform hover:scale-105 relative`}
      >
        {isOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />}
        {!isOpen && visitCount > 1 && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            !
          </div>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className={`fixed bottom-16 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm md:w-80 ${getThemeClasses()} rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-[70vh] md:h-96'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Mahesh's AI Assistant</h3>
                  <p className="text-xs text-indigo-100">
                    {userName ? `Hello, ${userName}!` : 'Ask me anything about Mahesh!'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && !isMinimized && (
            <div className="bg-gray-100 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full mt-1 text-xs p-1 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="default">Default</option>
                    <option value="dark">Dark</option>
                    <option value="minimal">Minimal</option>
                    <option value="gradient">Gradient</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Font Size</label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full mt-1 text-xs p-1 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="small">Small</option>
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadChatTranscript}
                    className="flex-1 bg-indigo-600 text-white text-xs py-1 px-2 rounded hover:bg-indigo-700 flex items-center justify-center space-x-1"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download Chat</span>
                  </button>
                  <button
                    onClick={clearChat}
                    className="flex-1 bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700"
                  >
                    Clear Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isMinimized && (
            <>
              {/* Messages */}
              <div 
                className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-800 min-h-0"
                onScroll={handleScroll}
              >
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
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
                          <div className={`${getFontSizeClass()} leading-relaxed`} dangerouslySetInnerHTML={{ __html: message.text }} />
                          <div className="flex items-center justify-between mt-1">
                            <p className={`text-xs ${
                              message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                            {message.sender === 'bot' && (
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => handleFeedback(message.id, true)}
                                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                    message.feedback === 'positive' ? 'text-green-600' : 'text-gray-400'
                                  }`}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleFeedback(message.id, false)}
                                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                    message.feedback === 'negative' ? 'text-red-600' : 'text-gray-400'
                                  }`}
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1 justify-start">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
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
                    {faqSuggestions.slice(0, 4).map((suggestion, index) => (
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
              <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-