import { Fragment } from 'react';
import { FiDownload, FiFileText } from 'react-icons/fi';
import { API_URL } from '../config.js';
import Magnetic from './Magnetic.jsx';

// Both files are served by the Express backend: GET /api/cv/pdf and /api/cv/docx
export default function CVButtons({ className = '', magnetic = false }) {
  const Wrap = magnetic ? Magnetic : Fragment;
  return (
    <div className={`cv-buttons ${className}`}>
      <Wrap>
        <a className="btn btn-primary" href={`${API_URL}/api/cv/pdf`} download>
          <FiDownload /> Download CV <span className="btn-tag">PDF</span>
        </a>
      </Wrap>
      <Wrap>
        <a className="btn btn-ghost" href={`${API_URL}/api/cv/docx`} download>
          <FiFileText /> Word <span className="btn-tag">DOCX</span>
        </a>
      </Wrap>
    </div>
  );
}
