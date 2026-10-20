import { useEffect, useRef, useState } from 'react';
import { createTimeline, stagger } from 'animejs';
import { markIntroDone } from '../intro.js';

const WORDS = ['Design', 'Develop', 'Automate', 'Ship'];
const KEY = 'vs-intro-seen';

function shouldPlay() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
}

// First-visit intro: counter 000→100 while words flash, then the curtain lifts (anime.js timeline).
export default function Preloader() {
  const [active, setActive] = useState(shouldPlay);
  const root = useRef(null);

  useEffect(() => {
    if (!active) {
      markIntroDone();
      return;
    }
    const el = root.current;
    const counter = el.querySelector('.pl-count');
    const words = el.querySelectorAll('.pl-word');
    const progress = { v: 0 };
    document.documentElement.style.overflow = 'hidden';

    const tl = createTimeline({
      defaults: { ease: 'outExpo' },
      onComplete: () => {
        try { sessionStorage.setItem(KEY, '1'); } catch { /* private mode */ }
        document.documentElement.style.overflow = '';
        setActive(false);
      },
    });

    tl.add(el.querySelectorAll('.pl-meta'), { opacity: [0, 1], y: [12, 0], duration: 600, delay: stagger(80) }, 0)
      .add(progress, {
        v: [0, 100],
        duration: 1700,
        ease: 'inOutQuart',
        onUpdate: () => {
          counter.textContent = String(Math.round(progress.v)).padStart(3, '0');
        },
      }, 100)
      .add(el.querySelector('.pl-bar'), { scaleX: [0, 1], duration: 1700, ease: 'inOutQuart' }, 100);

    words.forEach((w, i) => {
      const at = 150 + i * 400;
      tl.add(w, { y: ['100%', '0%'], opacity: [0, 1], duration: 380 }, at);
      if (i < words.length - 1) tl.add(w, { y: ['0%', '-100%'], opacity: [1, 0], duration: 300, ease: 'inQuad' }, at + 330);
    });

    tl.call(() => markIntroDone(), 2050)
      .add(el.querySelector('.pl-inner'), { opacity: [1, 0], y: [0, -40], duration: 500, ease: 'inQuad' }, 1850)
      .add(el, { y: ['0%', '-100%'], duration: 900, ease: 'inOutQuart' }, 1950);

    return () => {
      tl.revert();
      document.documentElement.style.overflow = '';
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-inner">
        <div className="pl-row">
          <span className="pl-meta mono">Vaibhav Sharma</span>
          <span className="pl-meta mono">Portfolio — {new Date().getFullYear()}</span>
        </div>
        <div className="pl-words">
          {WORDS.map((w, i) => (
            <span key={w} className="pl-word serif">
              {w}<span className="accent">{i === WORDS.length - 1 ? '.' : ','}</span>
            </span>
          ))}
        </div>
        <div className="pl-row pl-bottom">
          <span className="pl-meta mono">Jaipur, IN</span>
          <span className="pl-count mono">000</span>
        </div>
        <span className="pl-bar" />
      </div>
    </div>
  );
}
