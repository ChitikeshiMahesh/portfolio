import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Download,
  Settings,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const Chatbot = () => {
  // -- State Hooks --
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userName, setUserName] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('default');
  const [fontSize, setFontSize] = useState('normal');
  const [showSettings, setShowSettings] = useState(false);
  const [visitCount, setVisitCount] = useState(1);
  const [messages, setMessages] = useState(() => {
    // Restore conversation from session storage
    const savedMessages = sessionStorage.getItem('maheshChatMessages');
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            id: 1,
            text: "Hi! I'm Mahesh's AI assistant. I can help you learn more about his web development projects, problem-solving approach, or achievements. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date(),
            suggestions: [
              'Tell me about CampusConnect',
              'What are your project highlights?',
              'How can I contact you?'
            ]
          }
        ];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Ask about Mahesh’s projects…");
  const [conversationData, setConversationData] = useState({});
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [typingDots, setTypingDots] = useState(0); // For enhanced typing animation
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick placeholders for input
  const placeholders = [
    "Ask about Mahesh’s projects…",
    "What about his problem-solving approach?",
    "Tell me about CampusConnect…",
    "How can I contact him?",
    "What are his achievements?"
  ];

  // Predefined FAQ suggestions
  const faqSuggestions = [
    "Tell me about CampusConnect",
    "Any big achievements?",
    "How can I contact you?",
    "What are your project highlights?",
    "Tell me about DSA Resource Platform",
    "What’s the Digital Diary App?"
  ];

  // -- Effects --
  useEffect(() => {
    // Cycle placeholder text for fun
    const interval = setInterval(() => {
      setPlaceholderText(
        placeholders[Math.floor(Math.random() * placeholders.length)]
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Name and visit count
    if (userName) {
      setConversationData((prev) => ({
        ...prev,
        userName: userName,
        visitCount: visitCount
      }));
    }
  }, [userName, visitCount]);

  // Save messages to session so user doesn't lose chat on refresh
  useEffect(() => {
    sessionStorage.setItem('maheshChatMessages', JSON.stringify(messages));
  }, [messages]);

  // Enhanced typing dots animation
  useEffect(() => {
    let dotInterval;
    if (isTyping) {
      dotInterval = setInterval(() => {
        setTypingDots((prev) => (prev + 1) % 3);
      }, 400);
    } else {
      setTypingDots(0);
    }
    return () => clearInterval(dotInterval);
  }, [isTyping]);

  // Scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  // -- Utility Functions --
  const playNotificationSound = () => {
    if (soundEnabled) {
      const audio = new Audio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSEFl4Ph8N2QOwkUdMXy2YUwBw5I'
      );
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  const downloadChatTranscript = () => {
    const transcript = messages
      .map((msg) => {
        const senderName = msg.sender === 'user' ? 'You' : "Mahesh's Assistant";
        const cleanText = msg.text.replace(/<[^>]*>/g, '');
        return `[${msg.timestamp.toLocaleString()}] ${senderName}: ${cleanText}`;
      })
      .join('\n\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahesh-portfolio-chat-${new Date()
      .toISOString()
      .split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    sessionStorage.removeItem('maheshChatMessages');
    setMessages([
      {
        id: 1,
        text: `Hi${
          userName ? ` ${userName}` : ''
        }! I'm Mahesh's AI assistant. I can help you learn more about his web projects and problem-solving approach. How can I assist you today?`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          'Tell me about CampusConnect',
          'What are your project highlights?',
          'How can I contact you?'
        ]
      }
    ]);
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

  // -- Conversation Logic --
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    let response = '';
    let suggestions = [];

    // Recognize "my name is" or "call me" to set userName
    const nameMatch = msg.match(/\b(?:my name is|i['’]?m|call me)\s+([a-zA-Z\s]+)/i);
    if (nameMatch) {
      const extractedName = nameMatch[1].trim();
      if (extractedName) {
        const formattedName =
          extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
        setUserName(formattedName);
        return {
          text: `Great to meet you, ${formattedName}! I'm here to share details about Mahesh’s web development work. How may I help you today?`,
          suggestions: [
            'Tell me about CampusConnect',
            'What are his project highlights?',
            'How do I contact him?'
          ]
        };
      }
    }

    // Greet returning user
    if (
      userName &&
      visitCount > 1 &&
      (msg.includes('hi') || msg.includes('hello') || msg.includes('hey'))
    ) {
      response = `Welcome back, ${userName}! I’d love to help you explore more of Mahesh’s web projects. What would you like to see today?`;
      suggestions = [
        'See CampusConnect',
        'Check out his DSA Resource Platform',
        'Contact Mahesh'
      ];
    }
    // Basic greetings
    else if (/^(hi|hello|hey)\b/.test(msg)) {
      response =
        "Hello! I'm Mahesh's assistant. I'm here to share his passion for problem-solving in web development. How can I assist?";
      suggestions = [
        'Tell me about CampusConnect',
        'What are his project highlights?',
        'How can I contact you?'
      ];
    }
    // Who is Mahesh or about Mahesh
    else if (msg.includes('who is mahesh') || msg.includes('about mahesh')) {
      response =
        "Mahesh is a dedicated web developer with a deep passion for solving real-world problems. He’s well-known for projects like CampusConnect, a DSA Resource Platform, and a Digital Diary App. Which project would you like to hear about?";
      suggestions = [
        'Tell me about CampusConnect',
        'What is the DSA Resource Platform?',
        'Any achievements?'
      ];
    }
    // CampusConnect
    else if (msg.includes('campusconnect') || msg.includes('campus connect')) {
      response =
        "CampusConnect is one of Mahesh’s flagship web projects. It aims to transform campus life by simplifying tasks like ordering snacks and requesting essential services. It focuses on a user-friendly interface and robust problem-solving strategies. Would you like to learn more about his other work or how to contact him?";
      suggestions = [
        'How can I join CampusConnect?',
        'Tell me about his other projects',
        'How do I contact Mahesh?'
      ];
    }
    // DSA Resource Platform
    else if (msg.includes('dsa') || msg.includes('data structure')) {
      response =
        "Mahesh’s DSA Resource Platform is an online tool he built for students to practice and learn data structures and algorithms effectively. It emphasizes problem-solving with comprehensive tutorials and coding challenges. Would you like to see more of his projects or contact him?";
      suggestions = [
        'What about the Digital Diary App?',
        'Any achievements?',
        'How do I contact him?'
      ];
    }
    // Digital Diary
    else if (msg.includes('digital diary')) {
      response =
        "The Digital Diary App is a simple, intuitive way to keep track of daily goals, notes, and progress. Mahesh developed it to showcase his knack for solving everyday challenges with web technology. Anything else you’d like to explore about his work or achievements?";
      suggestions = [
        'How do I contact him?',
        'Any major awards?',
        'What is CampusConnect?'
      ];
    }
    // Collaboration or join
    else if (
      msg.includes('join') ||
      msg.includes('collaborate') ||
      msg.includes('team') ||
      msg.includes('work together')
    ) {
      response =
        "Mahesh welcomes collaboration, especially in web development. If you’re passionate about problem-solving, you can reach out to him via email or connect on social media. Would you like contact details or to explore more projects?";
      suggestions = [
        'Show me his contact info',
        'Tell me about his projects',
        'Any achievements?'
      ];
    }
    // Projects
    else if (msg.includes('project') || msg.includes('work')) {
      response =
        "Mahesh has led and contributed to various web development projects like CampusConnect, a DSA Resource Platform, and a Digital Diary App. Each one underscores his flair for problem-solving. Which one interests you most?";
      suggestions = [
        'CampusConnect',
        'DSA Resource Platform',
        'Digital Diary App'
      ];
    }
    // Skills removed references to AI/ML or cloud
    else if (
      msg.includes('skill') ||
      msg.includes('technology') ||
      msg.includes('tech') ||
      msg.includes('expertise')
    ) {
      response =
        "Mahesh specializes in web development and problem-solving. He’s proficient in modern techniques to build responsive, user-friendly websites. He's known for an analytical approach to tackling challenges and delivering effective solutions.";
      suggestions = [
        'Tell me about his achievements',
        'What about his projects?',
        'How to contact him?'
      ];
    }
    // Contact
    else if (msg.includes('contact') || msg.includes('reach') || msg.includes('email')) {
      response =
        "You can connect with Mahesh via email at chitikeshimahesh6@gmail.com or by phone at +91-7013295712. He’s happy to discuss web development collaborations or answer any questions. Would you like to explore other topics?";
      suggestions = [
        'Show me his projects',
        'Any achievements?',
        'Download his resume'
      ];
    }
    // Achievements
    else if (msg.includes('achievement') || msg.includes('award') || msg.includes('hackathon')) {
      response =
        "Mahesh has participated in hackathons and college competitions, winning accolades for his innovative web solutions. This includes multiple awards for user-friendly interfaces and efficient problem-solving approaches.";
      suggestions = [
        'Tell me about CampusConnect',
        'What else can he do?',
        'Contact him'
      ];
    }
    // Off-topic or unclear
    else if (msg.includes('joke') || msg.includes('funny')) {
      response =
        "I focus on Mahesh’s web projects and achievements, but here's one: Why do programmers love dark mode? Because light attracts bugs! How else can I assist you regarding Mahesh's work?";
      suggestions = [
        'Projects',
        'Contact Info',
        'Achievements'
      ];
    }
    else if (msg.includes('thank')) {
      response = `You're welcome${
        userName ? `, ${userName}` : ''
      }! Glad I could help. Feel free to ask more about Mahesh’s projects or achievements.`;
      suggestions = [
        'How can I contact him?',
        'Show me his projects',
        'Download his resume'
      ];
    }
    // Generic fallback
    else {
      response = `That's an interesting query${
        userName ? `, ${userName}` : ''
      }. I specialize in Mahesh’s web development and problem-solving background. Could you clarify what you're looking for?`;
      suggestions = [
        'Tell me about CampusConnect',
        'Achievements?',
        'How to contact him?'
      ];
    }

    return { text: response, suggestions };
  };

  // Send user message & get bot reply
  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;
    const userMsg = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Slight random delay for realism
    const typingDelay = Math.min(Math.max(inputMessage.length * 50, 800), 2500);
    setTimeout(() => {
      const botData = getBotResponse(inputMessage);
      const botMsg = {
        id: userMsg.id + 1,
        text: botData.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botData.suggestions
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playNotificationSound();
    }, typingDelay);
  };

  // Enter key handler
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleFeedback = (messageId, isPositive) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedback: isPositive ? 'positive' : 'negative' } : msg
      )
    );
  };

  // -- Render --
  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
          if (!isOpen) {
            setVisitCount((count) => count + 1);
          }
        }}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 touch-manipulation ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'
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
        <div
          className={`fixed bottom-16 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm md:w-80 ${getThemeClasses()} rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized ? 'h-14' : 'h-[70vh] md:h-96'
          }`}
        >
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
                    {userName ? `Hello, ${userName}!` : 'Ask me about web projects!'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {/* Sound toggle */}
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-1 hover:bg-white/20 rounded">
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                {/* Settings toggle */}
                <button onClick={() => setShowSettings(!showSettings)} className="p-1 hover:bg-white/20 rounded">
                  <Settings className="h-4 w-4" />
                </button>
                {/* Minimize/Maximize */}
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded">
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

          {/* Chat Area */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-800 min-h-0" onScroll={handleScroll}>
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`flex space-x-2 max-w-[85%] ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {message.sender === 'user' ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Bot className="h-3 w-3" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-2 ${
                            message.sender === 'user'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div
                            className={`${getFontSizeClass()} leading-relaxed`}
                            dangerouslySetInnerHTML={{ __html: message.text }}
                          />
                          <div className="flex items-center justify-between mt-1">
                            <p
                              className={`text-xs ${
                                message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
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
                        {/* Pulsing or sliding dots for typing */}
                        <div className="flex space-x-1 items-center">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              style={{
                                animation: `typingDots 1s infinite ease-in-out ${i * 0.2}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* FAQ Suggestions for first message */}
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
              <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900 flex-shrink-0">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholderText}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white text-sm"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isTyping || !inputMessage.trim()}
                    className={`p-2 rounded-lg transition-colors ${
                      isTyping || !inputMessage.trim()
                        ? 'bg-gray-300 text-gray-100 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

// Typing dots animation
// Put this in your global CSS or <style> in the same file:
//
// @keyframes typingDots {
//   0%, 80%, 100% { transform: translateY(0); }
//   40% { transform: translateY(-6px); }
// }

export default Chatbot;