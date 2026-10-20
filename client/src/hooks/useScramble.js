import { useEffect } from 'react';
import { animate, scrambleText } from 'animejs';

// Decodes the element's text with an anime.js scramble the first time it scrolls into view.
export function useScramble(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let anim;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        anim = animate(el, { innerHTML: scrambleText({ chars: 'uppercase', cursor: true }), duration: 1100, ease: 'out(2)' });
      },
      { threshold: 1 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      anim?.revert();
    };
  }, [ref]);
}
