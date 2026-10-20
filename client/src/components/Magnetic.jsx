import { useEffect, useRef } from 'react';
import { createAnimatable } from 'animejs';

// Pulls its child toward the cursor (anime.js animatable), springs back on leave.
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const zone = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    const el = inner.current;
    const area = zone.current;
    if (!el || !area || window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;

    const anim = createAnimatable(el, { x: 450, y: 450, ease: 'out(3)' });
    const move = (e) => {
      const r = area.getBoundingClientRect();
      anim.x((e.clientX - (r.left + r.width / 2)) * strength);
      anim.y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      anim.x(0, 1000, 'outElastic(1, .45)');
      anim.y(0, 1000, 'outElastic(1, .45)');
    };
    area.addEventListener('pointermove', move);
    area.addEventListener('pointerleave', leave);
    return () => {
      area.removeEventListener('pointermove', move);
      area.removeEventListener('pointerleave', leave);
      anim.revert();
    };
  }, [strength]);

  return (
    <span ref={zone} className={`magnetic ${className}`}>
      <span ref={inner} className="magnetic-inner">{children}</span>
    </span>
  );
}
