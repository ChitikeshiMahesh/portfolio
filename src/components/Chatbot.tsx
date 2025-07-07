import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Volume2, VolumeX,
  Download, Settings, Palette, Type, Moon, Sun, Mic, MicOff, Copy, 
  ThumbsUp, ThumbsDown, Calendar, QrCode, FileText, ExternalLink,
  Sparkles, Trophy, Coffee, Zap, Heart, Star
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [conversationCount, setConversationCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [botPersonality, setBotPersonality] = useState('professional');
  const [fontSize, setFontSize] = useState('medium');
  const [compactMode, setCompactMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [chatTheme, setChatTheme] = useState('gradient');
  const [inputHistory, setInputHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [badges, setBadges] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const recognition = useRef(null);

  const { isDark, toggleTheme } = useTheme();

  // Initialize chatbot
  useEffect(() => {
    // Load saved data
    const savedMessages = localStorage.getItem('chatbot-messages');
    const savedUserName = localStorage.getItem('chatbot-username');
    const savedSettings = localStorage.getItem('chatbot-settings');
    const savedBadges = localStorage.getItem('chatbot-badges');
    const hasOpened = localStorage.getItem('chatbot-opened-before');
    
    if (hasOpened) {
      setHasOpenedBefore(true);
    }
    
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      // Convert timestamp strings back to Date objects
      const messagesWithDateObjects = parsedMessages.map(message => ({
        ...message,
        timestamp: new Date(message.timestamp)
      }));
      setMessages(messagesWithDateObjects);
    } else {
      // Initial welcome message
      const welcomeMessage = {
        id: 1,
        text: getWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ['Tell me about CampusConnect', 'What are your skills?', 'How can I contact you?', 'Show me your projects']
      };
      setMessages([welcomeMessage]);
    }
    
    if (savedUserName) {
      setUserName(savedUserName);
    }
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setBotPersonality(settings.personality || 'professional');
      setFontSize(settings.fontSize || 'medium');
      setCompactMode(settings.compactMode || false);
      setSoundEnabled(settings.soundEnabled !== false);
      setChatTheme(settings.chatTheme || 'gradient');
    }
    
    if (savedBadges) {
      const parsedBadges = JSON.parse(savedBadges);
      // Convert earned timestamp strings back to Date objects
      const badgesWithDateObjects = parsedBadges.map(badge => ({
        ...badge,
        earned: new Date(badge.earned)
      }));
      setBadges(badgesWithDateObjects);
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';
      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognition.current.onerror = () => {
        setIsListening(false);
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Handle opening chatbot
  const handleOpenChat = () => {
    setIsOpen(true);
    if (!hasOpenedBefore) {
      localStorage.setItem('chatbot-opened-before', 'true');
      setHasOpenedBefore(true);
    }
  };

  // Save data when changed
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('chatbot-username', userName);
    }
  }, [userName]);

  useEffect(() => {
    const settings = {
      personality: botPersonality,
      fontSize,
      compactMode,
      soundEnabled,
      chatTheme
    };
    localStorage.setItem('chatbot-settings', JSON.stringify(settings));
  }, [botPersonality, fontSize, compactMode, soundEnabled, chatTheme]);

  useEffect(() => {
    localStorage.setItem('chatbot-badges', JSON.stringify(badges));
  }, [badges]);

  // Auto-scroll with smart behavior
  const scrollToBottom = () => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAtBottom]);

  // Handle scroll to detect if user is at bottom
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsAtBottom(atBottom);
    }
  };

  // Personality configurations
  const personalities = {
    professional: {
      name: '🎩 Professional',
      greeting: "Hello! I'm Mahesh's professional AI assistant. How may I assist you with his portfolio today?",
      style: 'formal and informative'
    },
    casual: {
      name: '😎 Casual',
      greeting: "Hey there! I'm Mahesh's AI buddy. What would you like to know about him?",
      style: 'friendly and relaxed'
    },
    technical: {
      name: '🤖 Technical',
      greeting: "Greetings! I'm Mahesh's technical assistant. Ready to dive into his projects and skills?",
      style: 'detailed and technical'
    }
  };

  // Theme configurations with professional gradient
  const themes = {
    blue: { 
      primary: 'bg-blue-600', 
      secondary: 'bg-blue-50 dark:bg-blue-900/20', 
      accent: 'text-blue-600',
      gradient: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    purple: { 
      primary: 'bg-purple-600', 
      secondary: 'bg-purple-50 dark:bg-purple-900/20', 
      accent: 'text-purple-600',
      gradient: 'bg-gradient-to-r from-purple-600 to-purple-700'
    },
    green: { 
      primary: 'bg-green-600', 
      secondary: 'bg-green-50 dark:bg-green-900/20', 
      accent: 'text-green-600',
      gradient: 'bg-gradient-to-r from-green-600 to-green-700'
    },
    gradient: { 
      primary: 'bg-gradient-to-r from-indigo-600 to-purple-600', 
      secondary: 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20', 
      accent: 'text-indigo-600',
      gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600'
    }
  };

  const currentTheme = themes[chatTheme];

  // Font size configurations
  const fontSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const getWelcomeMessage = () => {
    if (hasOpenedBefore && userName) {
      return `Welcome back, ${userName}! What would you like to explore today?`;
    } else if (hasOpenedBefore) {
      return "Hi! How can I assist you with Mahesh's projects today?";
    } else {
      return "Hello! I'm Mahesh's AI assistant. I can help you learn more about his projects, skills, or experience. How can I assist you today?";
    }
  };

  // Enhanced response system with context awareness
  const getBotResponse = (userMessage, context = {}) => {
    const message = userMessage.toLowerCase();
    let response = '';
    let newSuggestions = [];
    let emoji = '';
    
    // Handle name extraction
    const nameMatch = message.match(/\bmy name is ([a-zA-Z ]+)/i) || message.match(/\bi['']?m ([a-zA-Z ]+)/i);
    if (nameMatch) {
      const extractedName = nameMatch[1].trim().replace(/\bmahesh\b/i, "").trim();
      if (message.includes("mahesh") && extractedName === "") {
        setUserName("Mahesh");
        return {
          text: "What a pleasant coincidence! Always a pleasure to meet another Mahesh. How may I assist you with Mr. Chitikeshi Mahesh's portfolio?",
          suggestions: ['Tell me about CampusConnect', 'What are your skills?', 'Show me achievements'],
          emoji: '🤝'
        };
      } else if (extractedName) {
        const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
        setUserName(formattedName);
        return {
          text: `It's great to meet you, ${formattedName}! I'm the AI assistant for Mr. Chitikeshi Mahesh. How may I assist you with his professional portfolio today?`,
          suggestions: ['Show me projects', 'Tell me about skills', 'Contact information'],
          emoji: '👋'
        };
      }
    }

    // Greetings with personality
    if (/^(hi|hello|hey|hii|namaste)\b/.test(message)) {
      const personalizedGreeting = userName ? `Hello again, ${userName}! ` : "Hello! ";
      response = personalizedGreeting + "I'm Mahesh's AI assistant. How can I help you learn about his work today?";
      newSuggestions = ['Tell me about CampusConnect', 'What are your skills?', 'Show me projects', 'Contact info'];
      emoji = '👋';
    }

    // CampusConnect with enhanced details
    else if (message.includes("campusconnect") || message.includes("campus connect")) {
      response = "CampusConnect is Mahesh's flagship startup project! 🚀 It's a smart solution to simplify everyday student life on campus. The platform allows students to place food and snack orders, request Xerox services, and access other campus essentials - all in one place, eliminating queues and manual requests. It features Firebase authentication, role-based access for students and admins, and is currently in development with a planned release in 2026. Demo coming soon! <br><br>🌟 <strong>Want to join the team?</strong> Visit: <a href='https://mahesh06.me/form/' target='_blank' style='color: #6C63FF; text-decoration: underline;'>https://mahesh06.me/form/</a>";
      newSuggestions = ['How to join CampusConnect?', 'When will it launch?', 'What technologies are used?', 'Show other projects'];
      emoji = '🚀';
      checkAndAwardBadge('project_explorer');
    }

    // Projects with follow-up guidance
    else if (message.includes('project') || message.includes('work')) {
      response = "Mahesh has worked on several exciting projects! His flagship project is <strong>CampusConnect</strong> - a startup solution for campus life management. Other notable projects include his Personal Portfolio Website, DSA Resource Platform, and Digital Diary App. Each showcases different aspects of full-stack development and problem-solving.";
      newSuggestions = ['Tell me about CampusConnect', 'Show DSA Resource Platform', 'Personal Portfolio details', 'Digital Diary App'];
      emoji = '💻';
      checkAndAwardBadge('project_explorer');
    }

    // Skills with detailed breakdown
    else if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      response = "Mahesh's technical expertise spans multiple domains: <br><br><strong>Programming:</strong> Java, Python, JavaScript, SQL, HTML/CSS<br><strong>Technologies:</strong> Git, VS Code, Linux, AWS Cloud, Firebase, React.js, Node.js<br><strong>Specializations:</strong> Data Structures & Algorithms, Full-Stack Development, AI/ML, Cloud Computing<br><br>He maintains a strong academic record with a 9.0 GPA in his CSE program.";
      newSuggestions = ['Show projects using these skills', 'Tell me about certifications', 'Academic achievements', 'Contact for collaboration'];
      emoji = '🛠️';
      checkAndAwardBadge('skill_seeker');
    }

    // Contact with multiple options
    else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      response = `You can reach Mahesh through several channels:<br><br>📧 <strong>Email:</strong> <a href="mailto:chitikeshimahesh6@gmail.com" style="color: #6C63FF; text-decoration: underline;">chitikeshimahesh6@gmail.com</a><br>📱 <strong>Phone:</strong> <a href="tel:+917013295712" style="color: #6C63FF; text-decoration: underline;">+91-7013295712</a><br>💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/chitikeshimahesh/" target="_blank" style="color: #6C63FF; text-decoration: underline;">Connect on LinkedIn</a><br>💻 <strong>GitHub:</strong> <a href="https://github.com/Mahesh-ch06" target="_blank" style="color: #6C63FF; text-decoration: underline;">View GitHub Profile</a><br><br>He's always open to discussing new opportunities or collaborations!`;
      newSuggestions = ['Schedule a meeting', 'Download resume', 'Join CampusConnect', 'View portfolio'];
      emoji = '📞';
    }

    // Education details
    else if (message.includes('education') || message.includes('study') || message.includes('university')) {
      response = "Mahesh is currently pursuing B.Tech in Computer Science and Engineering with a specialization in AI & ML at SR University, Warangal (2023-2027). He maintains an impressive 9.0 GPA and has completed courses in Data Structures, Algorithms, Operating Systems, Computer Networks, Machine Learning, Python Programming, and Database Systems.";
      newSuggestions = ['Show academic achievements', 'Tell me about projects', 'Certifications earned', 'Skills developed'];
      emoji = '🎓';
    }

    // Hackathons and achievements
    else if (message.includes('hackathon') || message.includes('achievement') || message.includes('award')) {
      response = "Mahesh has an impressive track record in competitive programming and hackathons! 🏆 He participated in the Anveshan International Hackathon 2025 at Chitkara University, Punjab, and secured 2nd place in the Anveshan Hackathon (Zonal) 2024 at M. S. Ramaiah University, Bangalore. He's also received the Academic Excellence Award as the top-ranked student in the AI & ML Department for 2024-2025.";
      newSuggestions = ['Tell me about certifications', 'Show technical skills', 'View projects', 'Academic performance'];
      emoji = '🏆';
      checkAndAwardBadge('achievement_hunter');
    }

    // Join/Collaboration
    else if (message.includes("join") || message.includes("collaborate") || message.includes("team") || message.includes("work together")) {
      response = `Exciting! Mahesh is always looking for passionate individuals to join CampusConnect. Whether you're a developer, designer, or innovator, there's a place for you! <br><br>🎯 <strong>Join CampusConnect:</strong> <a href='https://mahesh06.me/form/' target='_blank' style='color: #6C63FF; text-decoration: underline;'>https://mahesh06.me/form/</a><br><br>Fill out the form and Mahesh will get back to you about collaboration opportunities!`;
      newSuggestions = ['Tell me about CampusConnect', 'What skills are needed?', 'Contact Mahesh directly', 'View other projects'];
      emoji = '🤝';
    }

    // Thanks with personality
    else if (message.includes('thank') || message.includes('thanks')) {
      response = "You're very welcome! I'm happy to help. If you have any other questions about Mahesh's work, projects, or experience, feel free to ask!";
      newSuggestions = ['Ask another question', 'Download resume', 'Contact Mahesh', 'Explore more projects'];
      emoji = '😊';
    }

    // Easter eggs
    else if (message.includes('open sesame')) {
      response = "🎉 Easter egg found! Here's a fun fact: Mahesh once debugged a complex algorithm at 3 AM with nothing but coffee and determination. The bug? A missing semicolon! ☕";
      newSuggestions = ['Tell me more fun facts', 'Show me projects', 'What are your skills?'];
      emoji = '🎉';
      checkAndAwardBadge('easter_egg_hunter');
    }

    else if (message.includes('joke')) {
      response = "😄 I focus on Mahesh's work, but here's one: Why do programmers prefer dark mode? Because light attracts bugs! 🐛";
      newSuggestions = ['Tell me about Mahesh', 'Show me projects', 'What are your skills?'];
      emoji = '😄';
    }

    // Handle vague queries
    else if (message.includes('tell me more') || message.includes('more info')) {
      response = "I'd be happy to share more! What specifically interests you?";
      newSuggestions = ['Mahesh\'s projects', 'Technical skills', 'Achievements & awards', 'Contact information'];
      emoji = '🤔';
    }

    // Default response with suggestions
    else {
      response = "I specialize in providing information about Mahesh's professional background, projects, and expertise. What would you like to learn about today?";
      newSuggestions = ['Show me projects', 'Tell me about skills', 'Contact information', 'Achievements & awards'];
      emoji = '🤖';
    }

    return { text: response, suggestions: newSuggestions, emoji };
  };

  // Badge system
  const checkAndAwardBadge = (badgeType) => {
    const badgeDefinitions = {
      project_explorer: { name: 'Project Explorer', icon: '🔍', description: 'Explored Mahesh\'s projects' },
      skill_seeker: { name: 'Skill Seeker', icon: '🛠️', description: 'Learned about technical skills' },
      achievement_hunter: { name: 'Achievement Hunter', icon: '🏆', description: 'Discovered achievements' },
      easter_egg_hunter: { name: 'Easter Egg Hunter', icon: '🥚', description: 'Found hidden features' },
      conversation_master: { name: 'Conversation Master', icon: '💬', description: 'Had 10+ exchanges' }
    };

    if (!badges.find(b => b.type === badgeType)) {
      const newBadge = { ...badgeDefinitions[badgeType], type: badgeType, earned: new Date() };
      setBadges(prev => [...prev, newBadge]);
      
      // Show badge notification
      setTimeout(() => {
        if (soundEnabled) {
          playNotificationSound();
        }
      }, 1000);
    }
  };

  // Sound notification
  const playNotificationSound = () => {
    if (soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.play().catch(() => {}); // Ignore errors
    }
  };

  // Handle message sending
  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Add to input history
    setInputHistory(prev => [inputMessage, ...prev.slice(0, 9)]);
    setHistoryIndex(-1);
    
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    setSuggestions([]);
    setConversationCount(prev => prev + 1);

    // Check for conversation master badge
    if (conversationCount >= 9) {
      checkAndAwardBadge('conversation_master');
    }

    // Simulate typing delay with enhanced animation
    const typingDelay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const botResponseData = getBotResponse(currentInput);
      const botResponse = {
        id: messages.length + 2,
        text: botResponseData.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botResponseData.suggestions,
        emoji: botResponseData.emoji
      };
      
      setMessages(prev => [...prev, botResponse]);
      setSuggestions(botResponseData.suggestions || []);
      setIsTyping(false);
      
      // Show feedback after certain interactions
      if (conversationCount > 0 && conversationCount % 5 === 0) {
        setShowFeedback(true);
      }
      
      if (soundEnabled) {
        playNotificationSound();
      }
    }, typingDelay);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Voice input
  const toggleVoiceInput = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      recognition.current?.start();
      setIsListening(true);
    }
  };

  // Input history navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < inputHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputMessage(inputHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputMessage(inputHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputMessage('');
      }
    }
  };

  // Export chat
  const exportChat = () => {
    const chatData = {
      messages,
      userName,
      timestamp: new Date(),
      badges
    };
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahesh-chat-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([{
      id: 1,
      text: getWelcomeMessage(),
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['Tell me about CampusConnect', 'What are your skills?', 'How can I contact you?', 'Show me your projects']
    }]);
    setConversationCount(0);
    setSuggestions(['Tell me about CampusConnect', 'What are your skills?', 'How can I contact you?', 'Show me your projects']);
    localStorage.removeItem('chatbot-messages');
  };

  // Format time
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get placeholder text
  const getPlaceholder = () => {
    const placeholders = [
      "Ask about Mahesh's projects...",
      "What would you like to know?",
      "Type your question here...",
      "Ask about CampusConnect...",
      "Inquire about skills..."
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpenChat}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-500 touch-manipulation ${currentTheme.gradient} text-white hover:shadow-xl transform hover:scale-110 group animate-pulse-glow`}
        style={{
          marginBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
          marginRight: 'max(1.5rem, env(safe-area-inset-right))'
        }}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
        {badges.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce font-bold">
            {badges.length}
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 ${isMinimized ? 'w-72' : 'w-[calc(100vw-3rem)] max-w-sm md:w-80'} chatbot-container rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden flex flex-col ${isMinimized ? 'h-14' : 'h-[75vh] md:h-[28rem]'} transition-all duration-500 animate-slide-up`}
      style={{
        marginBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        marginRight: 'max(1.5rem, env(safe-area-inset-right))',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      
      {/* Header with Professional Gradient */}
      <div className={`${currentTheme.gradient} text-white p-4 flex-shrink-0 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative backdrop-blur-sm border border-white/30">
              <Bot className="h-5 w-5" />
              {isTyping && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-sm flex items-center">
                Mahesh's AI Assistant
                {badges.length > 0 && <Sparkles className="h-3 w-3 ml-2 animate-pulse" />}
              </h3>
              <p className="text-xs text-white/90">
                {isTyping ? 'Typing...' : 'Online • Ready to help'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 p-4 space-y-3 settings-slide">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Personality</label>
                  <select
                    value={botPersonality}
                    onChange={(e) => setBotPersonality(e.target.value)}
                    className="w-full text-xs p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    {Object.entries(personalities).map(([key, personality]) => (
                      <option key={key} value={key}>{personality.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Theme</label>
                  <select
                    value={chatTheme}
                    onChange={(e) => setChatTheme(e.target.value)}
                    className="w-full text-xs p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <option value="gradient">🌈 Professional</option>
                    <option value="blue">🔵 Blue</option>
                    <option value="purple">🟣 Purple</option>
                    <option value="green">🟢 Green</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFontSize(fontSize === 'small' ? 'medium' : fontSize === 'medium' ? 'large' : 'small')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 btn-hover-lift"
                    title="Font Size"
                  >
                    <Type className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setCompactMode(!compactMode)}
                    className={`p-2 rounded-lg transition-all duration-200 btn-hover-lift ${compactMode ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    title="Compact Mode"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 btn-hover-lift"
                    title="Sound"
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={exportChat}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 btn-hover-lift export-glow"
                    title="Export Chat"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={clearChat}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-500 transition-all duration-200 btn-hover-lift clear-warning"
                    title="Clear Chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Badges Display */}
          {badges.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50/90 to-orange-50/90 dark:from-yellow-900/20 dark:to-orange-900/20 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 p-3">
              <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar">
                <Trophy className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 bg-yellow-100/90 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs whitespace-nowrap backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50 badge-notification"
                    title={badge.description}
                  >
                    <span>{badge.icon}</span>
                    <span className="font-medium">{badge.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div 
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-800/50 min-h-0 ${fontSizes[fontSize]} custom-scrollbar backdrop-blur-sm`}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-animation`}
              >
                <div className={`flex space-x-3 max-w-[85%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    message.sender === 'user' 
                      ? currentTheme.gradient + ' text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`rounded-2xl ${compactMode ? 'p-3' : 'p-4'} shadow-sm hover:shadow-md transition-all duration-300 message-bubble ${
                    message.sender === 'user'
                      ? currentTheme.gradient + ' text-white'
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50'
                  } backdrop-blur-sm`}>
                    <div className="flex items-start space-x-2">
                      {message.emoji && message.sender === 'bot' && (
                        <span className="text-lg flex-shrink-0">{message.emoji}</span>
                      )}
                      <div className={`${fontSizes[fontSize]} leading-relaxed flex-1`} 
                           dangerouslySetInnerHTML={{ __html: message.text }} />
                    </div>
                    <p className={`text-xs mt-2 opacity-70 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start message-animation">
                <div className="flex space-x-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center border border-gray-200 dark:border-gray-600 shadow-sm">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 shadow-sm backdrop-blur-sm">
                    <div className="enhanced-typing">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && !isTyping && (
            <div className="px-4 pb-3 bg-gray-50/50 dark:bg-gray-800/50 flex-shrink-0 backdrop-blur-sm">
              <div className="grid grid-cols-1 gap-2">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`text-left text-xs p-3 bg-white/90 dark:bg-gray-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all duration-200 ${currentTheme.accent} border border-gray-200/50 dark:border-gray-700/50 touch-manipulation hover:shadow-md suggestion-btn backdrop-blur-sm font-medium`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="bg-blue-50/90 dark:bg-blue-900/20 border-t border-gray-200/50 dark:border-gray-700/50 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Was this helpful?</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-all duration-200 feedback-btn"
                  >
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                  </button>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-all duration-200 feedback-btn"
                  >
                    <ThumbsDown className="h-4 w-4 text-red-600" />
                  </button>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-all duration-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-4 bg-white/90 dark:bg-gray-900/90 flex-shrink-0 backdrop-blur-sm">
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getPlaceholder()}
                disabled={isTyping}
                className={`flex-1 px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${fontSizes[fontSize]} bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white disabled:opacity-50 transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md`}
                style={{ fontSize: '16px' }}
              />
              
              {recognition.current && (
                <button
                  onClick={toggleVoiceInput}
                  disabled={isTyping}
                  className={`p-3 rounded-xl transition-all duration-200 touch-manipulation shadow-sm hover:shadow-md ${
                    isListening 
                      ? 'bg-red-600 text-white voice-pulse' 
                      : 'bg-gray-200/90 dark:bg-gray-700/90 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  } disabled:opacity-50 backdrop-blur-sm`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}
              
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`p-3 ${currentTheme.gradient} text-white rounded-xl hover:opacity-90 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 touch-manipulation shadow-sm hover:shadow-md backdrop-blur-sm`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {inputHistory.length > 0 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 opacity-75">
                Use ↑↓ arrows to navigate history
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;