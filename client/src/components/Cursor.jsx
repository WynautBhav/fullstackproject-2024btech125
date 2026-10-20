import { useEffect, useRef, useState } from 'react';
import { createAnimatable } from 'animejs';

const INTERACTIVE = 'a, button, select, input, textarea, label, [data-cursor]';

// Custom cursor: a precise dot plus a lagging ring that grows over interactive
// elements and shows a label for anything with data-cursor="…". Fine pointers only.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled] = useState(() =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [label, setLabel] = useState('');
  const [state, setState] = useState('idle'); // idle | hover | label | down | hidden

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const d = createAnimatable(dot.current, { x: 0, y: 0 });
    const r = createAnimatable(ring.current, { x: 500, y: 500, ease: 'out(4)' });

    const last = { x: -100, y: -100 };
    const inspect = (target) => {
      const t = target?.closest?.(INTERACTIVE);
      const text = t?.closest('[data-cursor]')?.dataset.cursor || '';
      setLabel(text);
      setState((s) => (s === 'down' ? s : text ? 'label' : t ? 'hover' : 'idle'));
    };
    const move = (e) => {
      last.x = e.clientX; last.y = e.clientY;
      d.x(e.clientX); d.y(e.clientY);
      r.x(e.clientX); r.y(e.clientY);
      inspect(e.target);
    };
    // Content moves under a still pointer while scrolling — re-check what's beneath it
    const onScroll = () => inspect(document.elementFromPoint(last.x, last.y));
    const down = () => setState('down');
    const up = () => setState('idle');
    const leave = () => setState('hidden');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
      d.revert(); r.revert();
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className={`cursor-ring is-${state}`} aria-hidden="true">
        <span className="cursor-label mono">{label}</span>
      </div>
      <div ref={dot} className={`cursor-dot is-${state}`} aria-hidden="true" />
    </>
  );
}
