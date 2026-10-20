import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiMapPin, FiUser, FiZap } from 'react-icons/fi';
import Section, { fadeUp, ease } from './Section.jsx';
import CountUp from './CountUp.jsx';
import ScrollRevealText from './ScrollRevealText.jsx';
import { profile, stats } from '../data/portfolio.js';

function PortraitCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className="portrait"
      style={{ rotateX, rotateY }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease }}
    >
      {profile.photo ? (
        <img src={profile.photo} alt={`Portrait of ${profile.name}`} loading="lazy" />
      ) : (
        <div className="portrait-mono" role="img" aria-label={profile.name}>
          <span className="serif">vs</span>
        </div>
      )}
      <div className="portrait-caption">
        <span className="mono">{profile.name}</span>
        <span className="mono muted">Jaipur · IN</span>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title={<>Building useful software, <em className="serif">end to end.</em></>}>
      <div className="about-grid">
        <PortraitCard />

        <motion.div className="about-text" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <ScrollRevealText text={profile.bio[0]} className="about-lead" />
          {profile.bio.slice(1).map((p, i) => (
            <motion.p key={i} variants={fadeUp} custom={i + 1}>{p}</motion.p>
          ))}

          <motion.ul className="facts" variants={fadeUp} custom={2}>
            <li><FiMapPin /><div><span className="fact-k">Location</span><span>{profile.location}</span></div></li>
            <li><FiUser /><div><span className="fact-k">Status</span><span>{profile.status}</span></div></li>
            <li><FiZap /><div><span className="fact-k">Open to</span><span>{profile.openTo}</span></div></li>
          </motion.ul>

          <motion.div className="stats" variants={fadeUp} custom={3}>
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value"><CountUp to={s.value} suffix={s.suffix} /></span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
