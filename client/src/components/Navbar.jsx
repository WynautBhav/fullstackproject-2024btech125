import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { useActiveSection } from '../hooks/useActiveSection.js';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'achievements', label: 'Awards' },
];
const IDS = ['home', ...LINKS.map((l) => l.id), 'contact'];

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const active = useActiveSection(IDS, onHome);
  const current = onHome ? active : location.pathname === '/projects' ? 'projects' : '';

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  // Same-hash clicks don't change the route, so scroll manually
  const goTo = (id) => (e) => {
    if (onHome && location.hash === `#${id}`) {
      e.preventDefault();
      setOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav-inner" aria-label="Main">
          <Link to="/" className="logo" aria-label="Vaibhav Sharma — home">
            <span className="logo-mark">vs</span>
            <span className="logo-text">Vaibhav Sharma</span>
          </Link>

          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.id}>
                <Link to={`/#${l.id}`} onClick={goTo(l.id)} className={current === l.id ? 'active' : ''}>
                  {current === l.id && (
                    <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="nav-label">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  className="icon-swap"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Link to="/#contact" onClick={goTo('contact')} className="btn btn-primary btn-sm nav-cta">
              Let's talk <FiArrowUpRight />
            </Link>
            <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {[...LINKS, { id: 'contact', label: 'Contact' }].map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <Link to={`/#${l.id}`} onClick={goTo(l.id)}>
                    <span className="mono">0{i + 1}</span> {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
