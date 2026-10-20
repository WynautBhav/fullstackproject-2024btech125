import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="srt-word">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  );
}

// Paragraph whose words light up one by one as it scrolls through the viewport
export default function ScrollRevealText({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={`srt ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
        ))}
      </span>
    </p>
  );
}
