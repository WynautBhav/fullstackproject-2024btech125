import { marquee } from '../data/portfolio.js';

export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-label="Technologies I use">
      <ul className="marquee-track">
        {items.map((t, i) => (
          <li key={i} aria-hidden={i >= marquee.length}>
            {t}
            <span className="marquee-sep">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
