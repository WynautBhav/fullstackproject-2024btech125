import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { createTimeline } from 'animejs';
import { FiArrowUpRight } from 'react-icons/fi';
import Section, { fadeUp } from './Section.jsx';
import { achievements, certifications } from '../data/portfolio.js';

// Hackathon "event pass" — the WINNER stamp slams down when it scrolls into view (anime.js)
function EventPass({ a }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stamp = el.querySelector('.stamp');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stamp.style.opacity = '0';
    let tl;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      tl = createTimeline()
        .add(stamp, { opacity: [0, 1], scale: [2.6, 1], rotate: [-32, -12], duration: 520, ease: 'inQuart' }, 350)
        .add(el, { x: [0, -6, 5, -3, 2, 0], y: [0, 3, -2, 1, 0], duration: 420, ease: 'outQuad' }, 860)
        .add(el.querySelector('.stamp-ink'), { scale: [0.6, 1.6], opacity: [0.5, 0], duration: 700, ease: 'outExpo' }, 860);
    }, { threshold: 0.55 });
    io.observe(el);
    return () => {
      io.disconnect();
      tl?.revert();
    };
  }, []);

  return (
    <motion.article
      className="pass"
      initial={{ opacity: 0, y: 40, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8 }}
    >
      <div className="pass-inner" ref={ref}>
        <div className="pass-main">
          <div className="pass-top mono">
            <span>Hackathon pass</span>
            <span>No. 001</span>
          </div>
          <h3 className="pass-title">
            {a.title}
            <span className="serif"> {a.edition}</span>
          </h3>
          <dl className="pass-fields">
            <div><dt className="mono">Venue</dt><dd>{a.venue}</dd></div>
            <div><dt className="mono">City</dt><dd>{a.city}</dd></div>
            <div><dt className="mono">Year</dt><dd>{a.date}</dd></div>
            <div><dt className="mono">Result</dt><dd className="accent">{a.result}</dd></div>
          </dl>
          <p className="pass-detail">{a.detail}</p>
          <div className="pass-barcode" aria-hidden="true" />
          <div className="stamp" aria-label={a.result}>
            <span className="stamp-ink" aria-hidden="true" />
            <span className="stamp-top mono">Pre Hack · {a.edition}</span>
            <span className="stamp-word">{a.result}</span>
            <span className="stamp-top mono">JKLU · Jaipur</span>
          </div>
        </div>

        <div className="pass-stub">
          <span className="stub-label mono">Admit one</span>
          <span className="stub-rank serif">1<sup>st</sup></span>
          <span className="stub-label mono">Place</span>
        </div>

      </div>
    </motion.article>
  );
}

export default function Achievements() {
  return (
    <Section
      id="achievements"
      index="05"
      eyebrow={certifications.length ? 'Certifications & Achievements' : 'Achievements'}
      title={<>Wins & <em className="serif">recognition.</em></>}
    >
      <div className="awards">
        {achievements.map((a) => <EventPass key={a.title + a.edition} a={a} />)}
      </div>

      {certifications.length > 0 && (
        <div className="cert-grid">
          {certifications.map((c, i) => (
            <motion.a
              key={c.title + c.issuer}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="card cert-card"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {c.image && <img src={c.image} alt={`${c.title} certificate`} loading="lazy" />}
              <div className="cert-body">
                <span className="mono cert-issuer">{c.issuer} · {c.date}</span>
                <h3>{c.title}</h3>
                <span className="cert-link">View credential <FiArrowUpRight /></span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </Section>
  );
}
