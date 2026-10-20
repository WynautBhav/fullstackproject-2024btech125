import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import Section from './Section.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects } from '../data/portfolio.js';

const STATUS_ORDER = { Live: 0, Private: 1, Concept: 2 };
const SORTS = {
  featured: { label: 'Featured', fn: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) },
  status: { label: 'Status', fn: (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] },
  az: { label: 'Name A–Z', fn: (a, b) => a.title.localeCompare(b.title) },
};

// Filter chips: technologies used by 3+ projects, most common first (any badge can still filter)
const COMMON_TECH = Object.entries(
  projects.flatMap((p) => p.tech).reduce((acc, t) => ({ ...acc, [t]: (acc[t] || 0) + 1 }), {})
)
  .filter(([, n]) => n >= 3)
  .sort((a, b) => b[1] - a[1])
  .map(([t]) => t);

export default function Projects({ limit, showAllLink = false }) {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('featured');

  const chips = useMemo(
    () => ['All', ...COMMON_TECH, ...(filter !== 'All' && !COMMON_TECH.includes(filter) ? [filter] : [])],
    [filter]
  );

  const matching = useMemo(
    () => projects.filter((p) => filter === 'All' || p.tech.includes(filter)).sort(SORTS[sort].fn),
    [filter, sort]
  );
  const visible = limit ? matching.slice(0, limit) : matching;
  const toggle = (t) => setFilter((f) => (f === t ? 'All' : t));

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Selected work"
      title={<>Things I've <em className="serif">built.</em></>}
      lede="Client work from my roles, plus personal products and concepts. Filter by technology or click any badge."
    >
      <div className="project-controls">
        <div className="filters" role="group" aria-label="Filter projects by technology">
          {chips.map((t) => (
            <button key={t} className={`chip ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)} aria-pressed={filter === t}>
              {filter === t && <motion.span layoutId="chip-pill" className="chip-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="chip-label">{t}</span>
            </button>
          ))}
        </div>
        <div className="controls-right">
          <span className="mono count">{matching.length} / {projects.length}</span>
          <label className="select">
            <span className="sr-only">Sort projects</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>Sort: {v.label}</option>)}
            </select>
            <FiChevronDown aria-hidden="true" />
          </label>
        </div>
      </div>

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={projects.indexOf(p)}
              activeTech={filter}
              onTagClick={toggle}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {showAllLink && matching.length > visible.length && (
        <div className="center">
          <Link to="/projects" className="btn btn-ghost">
            View all {matching.length} projects <FiArrowRight />
          </Link>
        </div>
      )}
    </Section>
  );
}
