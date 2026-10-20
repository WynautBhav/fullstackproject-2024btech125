import { useEffect, useRef } from 'react';
import { animate, splitText, stagger } from 'animejs';
import { FiGithub, FiMail, FiArrowUp, FiArrowUpRight } from 'react-icons/fi';
import { profile, gmailCompose } from '../data/portfolio.js';

// Giant "Say hello" CTA that opens Gmail compose — letters ripple on hover (anime.js)
function SayHello() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current?.querySelector('.hello-text');
    if (!el) return;
    const split = splitText(el, { chars: true });
    let anim;
    let running = false;
    const wave = () => {
      if (running) return;
      running = true;
      anim = animate(split.chars, {
        y: [{ to: '-0.18em', duration: 260, ease: 'outQuad' }, { to: 0, duration: 520, ease: 'outElastic(1, .5)' }],
        delay: stagger(32),
        onComplete: () => { running = false; },
      });
    };
    const link = ref.current;
    link.addEventListener('pointerenter', wave);
    link.addEventListener('focus', wave);
    return () => {
      link.removeEventListener('pointerenter', wave);
      link.removeEventListener('focus', wave);
      anim?.revert();
      split.revert();
    };
  }, []);

  return (
    <a ref={ref} className="say-hello" href={gmailCompose()} target="_blank" rel="noreferrer" data-cursor="Open Gmail">
      <span className="hello-kicker mono">Got an idea? ✦ Let's make it real</span>
      <span className="hello-line">
        <span className="hello-text">Say hello</span>
        <span className="hello-arrow"><FiArrowUpRight /></span>
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <SayHello />
        <div className="footer-inner">
          <p className="muted">© {new Date().getFullYear()} {profile.name} · Built with MongoDB, Express, React & Node.js</p>
          <div className="footer-links">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
            <a href={gmailCompose()} target="_blank" rel="noreferrer" aria-label="Email via Gmail"><FiMail /></a>
            <button className="icon-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
              <FiArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
