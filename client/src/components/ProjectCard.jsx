import { motion } from 'framer-motion';
import { FiGithub, FiArrowUpRight, FiLock, FiEdit3, FiInfo } from 'react-icons/fi';
import { spotlight } from '../hooks/useSpotlight.js';

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

// Screenshot (or generated cover) inside a minimal browser chrome
function BrowserFrame({ project }) {
  const { image, cover, title, live } = project;
  return (
    <a
      className="frame"
      href={live}
      target="_blank"
      rel="noreferrer"
      data-cursor="Visit ↗"
      aria-label={`Open ${title} live site`}
      tabIndex={-1}
    >
      <div className="frame-bar">
        <span className="frame-dots"><i /><i /><i /></span>
        <span className="frame-url mono">{host(live)}</span>
      </div>
      <div className="frame-view">
        {image ? (
          <img src={image} alt={`Screenshot of the ${title} website`} loading="lazy" />
        ) : (
          <div className={`cover cover-${cover?.hue || 'ember'}`}>
            <span className="cover-mark serif">{cover?.mark || title[0]}</span>
            <span className="cover-name">{title}</span>
            <span className="cover-sub mono">{project.category}</span>
          </div>
        )}
      </div>
    </a>
  );
}

export default function ProjectCard({ project, index, activeTech, onTagClick }) {
  const { title, category, description, tech, github, live, status, type } = project;
  const showcase = Boolean(project.image || project.cover);

  return (
    <motion.article
      layout
      className={`card spotlight project-card ${showcase ? 'showcase' : 'compact'}`}
      onMouseMove={spotlight}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
    >
      {showcase && <BrowserFrame project={project} />}

      <div className="project-meta">
        <span className="mono project-index">{String(index + 1).padStart(2, '0')}</span>
        <span className={`status status-${status.toLowerCase()}`}>
          <span className="status-dot" /> {status}
        </span>
        <span className="mono project-type">{type}</span>
      </div>

      <div className="project-body">
        <p className="project-category mono">{category}</p>
        <h3>
          {live ? (
            <a href={live} target="_blank" rel="noreferrer" className="project-title-link">
              {title} <FiArrowUpRight className="title-arrow" />
            </a>
          ) : title}
        </h3>
        <p className="project-desc">{description}</p>
        {project.highlights && (
          <ul className="highlights">
            {project.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
        {project.note && <p className="project-note"><FiInfo /> {project.note}</p>}
      </div>

      <ul className="badges" aria-label="Tech stack">
        {tech.map((t) => (
          <li key={t}>
            <button className={`badge ${activeTech === t ? 'active' : ''}`} onClick={() => onTagClick?.(t)} title={`Filter by ${t}`}>
              {t}
            </button>
          </li>
        ))}
      </ul>

      <div className="project-actions">
        {live && (
          <a className="link-btn primary" href={live} target="_blank" rel="noreferrer">
            <FiArrowUpRight /> Live site
          </a>
        )}
        {github && (
          <a className="link-btn" href={github} target="_blank" rel="noreferrer" aria-label={`${title} source on GitHub`}>
            <FiGithub /> Source
          </a>
        )}
        {!github && (
          <span className="link-btn muted-btn">
            {status === 'Concept' ? <><FiEdit3 /> In design</> : <><FiLock /> Private repository</>}
          </span>
        )}
      </div>
    </motion.article>
  );
}
