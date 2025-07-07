import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/ui/chat-bubble';
import { ChatInput } from '@/components/ui/chat-input';
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from '@/components/ui/expandable-chat';
import { ChatMessageList } from '@/components/ui/chat-message-list';

const Chatbot = () => {
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
      return "Mr. Chitikeshi Mahesh is a skilled developer passionate about AI, machine learning, and modern web technologies. He is the founder of CampusConnect, an innovative student life platform. Would you like to explore his projects or skill set?";
    }

    // CampusConnect specific
    if (message.includes("campusconnect") || message.includes("campus connect")) {
      return "CampusConnect is Mahesh's flagship startup project! It's a smart solution to simplify everyday student life on campus. The platform allows students to place food and snack orders, request Xerox services, and access other campus essentials - all in one place, eliminating queues and manual requests. It features Firebase authentication, role-based access for students and admins, and is currently in development with a planned release in 2026. Demo coming soon! 🚀 Want to join the team? Visit: https://mahesh06.me/form/";
    }

    // Join/Collaboration
    if (message.includes("join") || message.includes("collaborate") || message.includes("team") || message.includes("work together")) {
      return `Exciting! Mahesh is always looking for passionate individuals to join CampusConnect. Whether you're a developer, designer, or innovator, there's a place for you! 🎯 Join CampusConnect: https://mahesh06.me/form/ Fill out the form and Mahesh will get back to you about collaboration opportunities!`;
    }

    // Startup/Business
    if (message.includes("startup") || message.includes("business") || message.includes("entrepreneur")) {
      return "Yes! Mahesh is working on CampusConnect, an innovative startup that aims to revolutionize student life on campus. The platform is currently in development with a planned release in 2026. It's designed to eliminate traditional queues and manual processes by providing a centralized digital solution for all campus services. Interested in joining? Check out: https://mahesh06.me/form/";
    }

    // Hiring
    if (message.includes("hire")) {
      return `That's wonderful! You can express your interest by filling out this short form: https://mahesh06.me/form/. Mr. Mahesh will get back to you promptly.`;
    }

    // Learning/Mentorship
    if (message.includes("learn from") || message.includes("learn")) {
      return `Mr. Mahesh regularly shares insights through projects and open-source code. Feel free to explore his GitHub or reach out for mentorship via this form: https://mahesh06.me/form/.`;
    }

    // Projects
    if (message.includes('project') || message.includes('work')) {
      return "Mahesh has worked on several exciting projects! His flagship project is CampusConnect - a startup solution for campus life management. Other notable projects include his Personal Portfolio Website, DSA Resource Platform, and Digital Diary App. Each showcases different aspects of full-stack development and problem-solving. Would you like to know more about any specific project?";
    }
    
    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      return "Mahesh's technical skills span across multiple areas: Programming (Java, Python, JavaScript, SQL, HTML/CSS), Technologies (Git, VS Code, Linux, AWS Cloud, Firebase, React.js, Node.js), and specialized areas like Data Structures & Algorithms, Full-Stack Development, AI/ML, and Cloud Computing. He maintains a strong academic record with a 9.0 GPA in his CSE program.";
    }
    
    // Contact
    if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      return `You can reach Mahesh through several channels: Email at chitikeshimahesh6@gmail.com, phone at +91-7013295712, or connect with him on LinkedIn and GitHub. He's always open to discussing new opportunities or collaborations!`;
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

  const handleSendMessage = (e) => {
    e.preventDefault();
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
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h1 className="text-xl font-semibold">Mahesh's AI Assistant ✨</h1>
        <p className="text-sm text-indigo-100">
          Ask me anything about Mahesh's work and projects
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === 'user' ? 'sent' : 'received'}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                fallback={message.sender === 'user' ? 'U' : 'AI'}
              />
              <div className="flex flex-col">
                <ChatBubbleMessage
                  variant={message.sender === 'user' ? 'sent' : 'received'}
                >
                  {message.text}
                </ChatBubbleMessage>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-right text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </ChatBubble>
          ))}

          {isTyping && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>

        {/* FAQ Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
            <div className="grid grid-cols-1 gap-2">
              {faqSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left text-xs p-2 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-200 dark:border-gray-700 touch-manipulation"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSendMessage}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            style={{ fontSize: '16px' }} // Prevents zoom on iOS
          />
          <div className="flex items-center p-3 pt-0 justify-end">
            <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={!inputMessage.trim()}>
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default Chatbot;