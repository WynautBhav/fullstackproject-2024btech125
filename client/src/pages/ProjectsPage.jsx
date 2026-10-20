import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Projects from '../components/Projects.jsx';

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Work — Vaibhav Sharma';
    return () => { document.title = 'Vaibhav Sharma — Full-Stack Developer & Automation Engineer'; };
  }, []);

  return (
    <div className="page">
      <div className="container">
        <Link to="/" className="back-link"><FiArrowLeft /> Back home</Link>
      </div>
      <Projects />
    </div>
  );
}
