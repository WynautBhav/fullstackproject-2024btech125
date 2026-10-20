import { Router } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const router = Router();
const filesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'files');

const FORMATS = {
  pdf: { file: 'Vaibhav_Sharma_CV.pdf', type: 'application/pdf' },
  docx: {
    file: 'Vaibhav_Sharma_CV.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
};

// GET /api/cv/:format — download resume as PDF or Word (.docx)
router.get('/:format', (req, res) => {
  const format = FORMATS[req.params.format?.toLowerCase()];
  if (!format) {
    return res.status(400).json({ success: false, error: 'Format must be "pdf" or "docx".' });
  }

  const filePath = path.join(filesDir, format.file);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: 'CV file not found.' });
  }

  res.type(format.type);
  res.download(filePath, format.file);
});

export default router;
