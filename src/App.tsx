import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import AlternativeHero from './components/AlternativeHero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { Eye, EyeOff } from 'lucide-react';

function App() {
  const [useAlternativeHero, setUseAlternativeHero] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Toggle Button */}
        <button
          onClick={() => setUseAlternativeHero(!useAlternativeHero)}
          className="fixed top-20 right-4 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 touch-manipulation flex items-center space-x-2"
          title={`Switch to ${useAlternativeHero ? 'Original' : 'Alternative'} Hero`}
        >
          {useAlternativeHero ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          <span className="hidden sm:inline text-sm font-medium">
            {useAlternativeHero ? 'Original' : 'Alternative'}
          </span>
        </button>

        {/* Conditional Hero Rendering */}
        {useAlternativeHero ? (
          <AlternativeHero />
        ) : (
          <>
            <Header />
            <Hero />
          </>
        )}
        
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Blog />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}

export default App;