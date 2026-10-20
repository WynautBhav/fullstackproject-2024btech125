import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScramble } from '../hooks/useScramble.js';

export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease } }),
};

// Page section with an editorial header ("02 / Skills") and a scroll-triggered entrance.
export default function Section({ id, index, eyebrow, title, lede, children, className = '' }) {
  const eyebrowRef = useRef(null);
  useScramble(eyebrowRef);

  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        <motion.header
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            {index && <span className="eyebrow-index">{index}</span>}
            <span ref={eyebrowRef}>{eyebrow}</span>
          </motion.span>
          <motion.h2 variants={fadeUp}>{title}</motion.h2>
          {lede && <motion.p className="lede" variants={fadeUp}>{lede}</motion.p>}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
