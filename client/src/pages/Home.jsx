import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Timeline from '../components/Timeline.jsx';
import Achievements from '../components/Achievements.jsx';
import Marquee from '../components/Marquee.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  const { hash } = useLocation();

  // Smooth-scroll to #section when navigating via /#about etc.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(hash.slice(1));
    if (!el) return;
    const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects limit={6} showAllLink />
      <Timeline />
      <Achievements />
      <Contact />
    </>
  );
}
