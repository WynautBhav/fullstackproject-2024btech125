import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { FiLayout, FiServer, FiCpu } from 'react-icons/fi';
import Section, { fadeUp } from './Section.jsx';
import { skills } from '../data/portfolio.js';
import { spotlight } from '../hooks/useSpotlight.js';

const ICONS = { Frontend: FiLayout, Backend: FiServer, 'Tools & Technologies': FiCpu };
const BLURB = {
  Frontend: 'Interfaces, design systems & motion',
  Backend: 'APIs, data models & databases',
  'Tools & Technologies': 'Automation, AI workflows & tooling',
};
const SEGMENTS = 20;

const levelLabel = (n) => (n >= 85 ? 'Expert' : n >= 70 ? 'Advanced' : n >= 55 ? 'Proficient' : 'Learning');

function SkillCard({ category, list, i }) {
  const ref = useRef(null);
  const Icon = ICONS[category] || FiCpu;

  // anime.js: light each skill's LED segments in sequence when the card enters view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let anims = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      anims = [...el.querySelectorAll('.skill')].map((row, j) =>
        animate(row.querySelectorAll('.seg.on'), {
          opacity: [0.14, 1],
          scaleY: [0.35, 1],
          duration: 420,
          delay: stagger(28, { start: 150 + j * 90 }),
          ease: 'outBack(2)',
        })
      );
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); anims.forEach((a) => a.revert()); };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="card spotlight skill-card"
      onMouseMove={spotlight}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="skill-head">
        <span className="skill-icon"><Icon /></span>
        <div>
          <h3>{category}</h3>
          <p className="muted">{BLURB[category]}</p>
        </div>
        <span className="mono skill-count">{String(list.length).padStart(2, '0')}</span>
      </div>
      <ul>
        {list.map((s) => {
          const lit = Math.round((s.level / 100) * SEGMENTS);
          return (
            <li key={s.name} className="skill" tabIndex={0} aria-label={`${s.name}: ${levelLabel(s.level)}, ${s.level} out of 100`}>
              <div className="skill-row">
                <span>{s.name}</span>
                <span className="mono skill-pct">{s.level}</span>
              </div>
              <div className="segs" aria-hidden="true">
                {Array.from({ length: SEGMENTS }, (_, k) => (
                  <span key={k} className={`seg ${k < lit ? 'on' : ''}`} />
                ))}
              </div>
              <span className="tooltip" role="tooltip">
                <strong>{levelLabel(s.level)}</strong> · {s.level}/100
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title={<>The <em className="serif">toolkit.</em></>}
      lede="Self-assessed proficiency across the stack. Hover or focus a skill to see where it sits."
      className="alt"
    >
      <div className="skills-grid">
        {Object.entries(skills).map(([category, list], i) => (
          <SkillCard key={category} category={category} list={list} i={i} />
        ))}
      </div>
    </Section>
  );
}
