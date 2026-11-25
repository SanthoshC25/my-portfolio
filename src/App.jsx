import { useState, useEffect } from 'react';
import useTheme from './hooks/useTheme';
import InfiniteStars from './components/InfiniteStars';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Capabilities from './sections/Capabilities';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Services from './sections/Services';
import Workflow from './sections/Workflow';
import Contact from './sections/Contact';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  // Fallback: always reveal content after 4s even if preloader callback fails
  useEffect(() => {
    const fallback = setTimeout(() => {
      setLoading(false);
      setVisible(true);
    }, 4000);
    return () => clearTimeout(fallback);
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    // small delay so the preloader can fade out gracefully
    setTimeout(() => setVisible(true), 100);
  };

  return (
    <>
      {/* Infinite Starfield across the entire website */}
      <InfiniteStars />

      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        <Navbar />

        <main>
          <Hero />

          <div className="section-divider" />
          <About />

          <div className="section-divider" />
          <Skills />

          <div className="section-divider" />
          <Capabilities />

          <div className="section-divider" />
          <Projects />

          <div className="section-divider" />
          <Experience />

          <div className="section-divider" />
          <Services />

          <div className="section-divider" />
          <Workflow />

          <div className="section-divider" />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
