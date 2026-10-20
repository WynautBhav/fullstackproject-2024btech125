import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <section className="page not-found">
      <motion.div className="container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <p className="mono muted">Error 404</p>
        <h1 className="serif">Lost the <em>thread.</em></h1>
        <p className="muted">This page doesn't exist — but the rest of the site does.</p>
        <Link to="/" className="btn btn-primary"><FiArrowLeft /> Take me home</Link>
      </motion.div>
    </section>
  );
}
