import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { FiBriefcase, FiBookOpen } from 'react-icons/fi';
import Section, { ease } from './Section.jsx';
import { timeline } from '../data/portfolio.js';

const TABS = [
  { key: 'all', label: 'Everything' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
];

export default function Timeline() {
  const [tab, setTab] = useState('all');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const items = timeline.filter((t) => tab === 'all' || t.type === tab);

  return (
    <Section
      id="journey"
      index="04"
      eyebrow="Experience & Education"
      title={<>The <em className="serif">journey</em> so far.</>}
      className="alt"
    >
      <div className="tabs" role="tablist" aria-label="Filter timeline">
        {TABS.map((t) => (
          <button key={t.key} role="tab" aria-selected={tab === t.key} className={`tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            {tab === t.key && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="timeline" ref={ref}>
        <div className="tl-rail" aria-hidden="true">
          <motion.span className="tl-rail-fill" style={{ scaleY: fill }} />
        </div>

        <ol>
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((t) => {
              const Icon = t.type === 'experience' ? FiBriefcase : FiBookOpen;
              return (
                <motion.li
                  layout
                  key={t.org + t.title}
                  className="tl-item"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <div className="tl-when">
                    <span className="mono">{t.period}</span>
                    {t.current && <span className="tl-now"><span className="pulse-dot" /> Current</span>}
                  </div>
                  <span className={`tl-node ${t.current ? 'current' : ''}`} aria-hidden="true"><Icon /></span>
                  <div className="card tl-card">
                    <div className="tl-top">
                      <div>
                        <h3>{t.org}</h3>
                        <p className="tl-role">{t.title}</p>
                      </div>
                      <span className={`tl-tag ${t.type}`}>{t.type}</span>
                    </div>
                    {t.place && <p className="tl-place mono">{t.place}</p>}
                    <ul className="tl-points">
                      {t.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      </div>
    </Section>
  );
}
