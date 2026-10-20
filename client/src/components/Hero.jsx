import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { animate, set, splitText, stagger } from 'animejs';
import { onIntroDone } from '../intro.js';
import { FiGithub, FiArrowDown, FiMapPin, FiBriefcase, FiBookOpen, FiClock } from 'react-icons/fi';
import { profile } from '../data/portfolio.js';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { ease } from './Section.jsx';
import CVButtons from './CVButtons.jsx';
import LocalTime from './LocalTime.jsx';
import Magnetic from './Magnetic.jsx';

const HeroScene = lazy(() => import('./HeroScene.jsx'));

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.7 + i * 0.1, ease } }),
};

function canRender3D() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

// Isolated so the typewriter's frequent state updates don't re-render the whole hero
function TypedRole() {
  const role = useTypewriter(profile.roles);
  return <span aria-hidden="true">{role}</span>;
}

export default function Hero() {
  const titleRef = useRef(null);
  const [show3D] = useState(canRender3D);
  const [ready, setReady] = useState(false);

  useEffect(() => onIntroDone(() => setReady(true)), []);

  // anime.js: split the name into characters, hold them below the line, rise in once the intro ends
  useEffect(() => {
    const lines = titleRef.current?.querySelectorAll('.line');
    if (!lines?.length) return;
    const splits = [...lines].map((l) => splitText(l, { chars: { wrap: 'clip' } }));
    const chars = splits.flatMap((s) => s.chars);
    set(chars, { y: '115%' });
    let anim;
    const stop = onIntroDone(() => {
      anim = animate(chars, {
        y: ['115%', '0%'],
        rotate: [12, 0],
        duration: 1300,
        delay: stagger(42, { start: 120 }),
        ease: 'outExpo',
      });
    });
    return () => {
      stop();
      anim?.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-glow" />
        <span className="hero-grid" />
        {show3D && (
          <Suspense fallback={null}>
            <HeroScene ready={ready} />
          </Suspense>
        )}
      </div>

      <motion.div className="container hero-layout" initial="hidden" animate={ready ? 'show' : 'hidden'}>
        <div className="hero-main">
          <motion.p className="status-pill" variants={fade} custom={0}>
            <span className="pulse-dot" /> {profile.openTo}
          </motion.p>

          <h1 className="hero-title" ref={titleRef} aria-label={profile.name}>
            <span className="line" aria-hidden="true">{profile.firstName}</span>
            <span className="line serif" aria-hidden="true">{profile.lastName}</span>
          </h1>

          <motion.p className="hero-role" variants={fade} custom={1} aria-label={profile.roles.join(', ')}>
            <span className="role-slash">/</span>
            <TypedRole />
            <span className="caret" aria-hidden="true" />
          </motion.p>

          <motion.p className="hero-tagline" variants={fade} custom={2}>{profile.tagline}</motion.p>

          <motion.div className="hero-cta" variants={fade} custom={3}>
            <CVButtons magnetic />
            <Magnetic strength={0.4}>
              <a className="btn btn-icon" href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <FiGithub />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.aside className="now-card" variants={fade} custom={4} aria-label="At a glance">
          <p className="now-head mono"><span className="rec-dot" /> Right now</p>
          <dl>
            <div><dt><FiBriefcase /> Working</dt><dd>{profile.current.role} <span className="muted">@</span> {profile.current.org}</dd></div>
            <div><dt><FiBookOpen /> Studying</dt><dd>B.Tech CSE, JKLU</dd></div>
            <div><dt><FiMapPin /> Based in</dt><dd>Jaipur, India</dd></div>
            <div><dt><FiClock /> Local time</dt><dd><LocalTime timezone={profile.timezone} /></dd></div>
          </dl>
        </motion.aside>
      </motion.div>

      <Link to="/#about" className="scroll-cue" aria-label="Scroll to About">
        <span className="mono">Scroll</span>
        <FiArrowDown />
      </Link>
    </section>
  );
}
