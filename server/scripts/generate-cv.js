// Generates files/Vaibhav_Sharma_CV.pdf and files/Vaibhav_Sharma_CV.docx from data/resume.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, TabStopType,
} from 'docx';
import cv from '../data/resume.js';

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'files');
const baseName = cv.name.replace(/\s+/g, '_') + '_CV';
const ACCENT = 'C2410C';
const contactLine = Object.values(cv.contact).filter(Boolean).join('  |  ');

/* ---------------- PDF ---------------- */
function buildPdf() {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margin: 48 });
    const out = fs.createWriteStream(path.join(outDir, `${baseName}.pdf`));
    out.on('finish', resolve);
    doc.pipe(out);
    const width = doc.page.width - 96;

    doc.font('Helvetica-Bold').fontSize(24).fillColor('#111').text(cv.name, { align: 'center' });
    doc.font('Helvetica').fontSize(11).fillColor(`#${ACCENT}`).text(cv.title, { align: 'center' });
    doc.moveDown(0.3).fontSize(9).fillColor('#444').text(contactLine, { align: 'center' });

    const heading = (title) => {
      doc.moveDown(0.9).font('Helvetica-Bold').fontSize(12).fillColor(`#${ACCENT}`).text(title.toUpperCase());
      const y = doc.y + 2;
      doc.moveTo(48, y).lineTo(48 + width, y).lineWidth(0.8).strokeColor(`#${ACCENT}`).stroke();
      doc.moveDown(0.4).fillColor('#111');
    };
    const row = (left, right) => {
      const y = doc.y;
      doc.font('Helvetica-Bold').fontSize(10.5).text(left, 48, y, { width: width - 130 });
      const after = doc.y;
      doc.font('Helvetica').fontSize(9.5).fillColor('#555').text(right, 48 + width - 130, y, { width: 130, align: 'right' });
      doc.fillColor('#111').y = Math.max(after, doc.y);
      doc.x = 48;
    };
    const body = (text, opts = {}) => doc.font('Helvetica').fontSize(10).fillColor('#333').text(text, 48, doc.y, { width, ...opts });

    heading('Summary');
    body(cv.summary);

    if (cv.experience.length) {
      heading('Experience');
      cv.experience.forEach((x) => {
        row(`${x.role} — ${x.org}`, x.period);
        if (x.location) doc.font('Helvetica-Oblique').fontSize(9).fillColor('#666').text(x.location, 48, doc.y, { width });
        x.points.forEach((p) => body(`•  ${p}`, { indent: 8 }));
        doc.moveDown(0.4);
      });
    }

    heading('Education');
    cv.education.forEach((e) => {
      row(e.degree, e.period);
      body(`${e.institution}${e.detail ? ' — ' + e.detail : ''}`);
      doc.moveDown(0.3);
    });

    heading('Projects');
    cv.projects.forEach((p) => {
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor('#111').text(p.name, 48, doc.y, { continued: true })
        .font('Helvetica-Oblique').fontSize(9.5).fillColor('#555').text(`   ${p.stack}`);
      body(p.desc);
      doc.moveDown(0.4);
    });

    heading('Skills');
    Object.entries(cv.skills).forEach(([k, v]) => {
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#111').text(`${k}: `, 48, doc.y, { continued: true })
        .font('Helvetica').fillColor('#333').text(v);
    });

    const awards = [...(cv.achievements || []), ...cv.certifications];
    if (awards.length) {
      heading(cv.certifications.length ? 'Certifications & Achievements' : 'Achievements');
      awards.forEach((c) => body(`•  ${c}`));
    }

    doc.end();
  });
}

/* ---------------- DOCX ---------------- */
async function buildDocx() {
  const RIGHT_TAB = 9638; // A4 text width in twips at 0.75in margins
  const heading = (t) =>
    new Paragraph({
      spacing: { before: 240, after: 80 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
      children: [new TextRun({ text: t.toUpperCase(), bold: true, color: ACCENT, size: 24 })],
    });
  const row = (left, right) =>
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
      children: [new TextRun({ text: left, bold: true, size: 21 }), new TextRun({ text: `\t${right}`, color: '555555', size: 19 })],
    });
  const body = (t) => new Paragraph({ children: [new TextRun({ text: t, size: 20 })] });
  const bullet = (t) => new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: t, size: 20 })] });
  const gap = () => new Paragraph({ spacing: { after: 60 }, children: [] });

  const children = [
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cv.name, bold: true, size: 48 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cv.title, color: ACCENT, size: 22 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: contactLine, color: '444444', size: 18 })] }),
    heading('Summary'),
    body(cv.summary),
  ];

  if (cv.experience.length) {
    children.push(heading('Experience'));
    cv.experience.forEach((x) =>
      children.push(
        row(`${x.role} — ${x.org}`, x.period),
        ...(x.location ? [new Paragraph({ children: [new TextRun({ text: x.location, italics: true, color: '666666', size: 18 })] })] : []),
        ...x.points.map(bullet),
        gap()
      )
    );
  }

  children.push(heading('Education'));
  cv.education.forEach((e) => children.push(row(e.degree, e.period), body(`${e.institution}${e.detail ? ' — ' + e.detail : ''}`), gap()));

  children.push(heading('Projects'));
  cv.projects.forEach((p) =>
    children.push(
      new Paragraph({ children: [new TextRun({ text: p.name, bold: true, size: 21 }), new TextRun({ text: `   ${p.stack}`, italics: true, color: '555555', size: 19 })] }),
      body(p.desc),
      gap()
    )
  );

  children.push(heading('Skills'));
  Object.entries(cv.skills).forEach(([k, v]) =>
    children.push(new Paragraph({ children: [new TextRun({ text: `${k}: `, bold: true, size: 20 }), new TextRun({ text: v, size: 20 })] }))
  );

  const awards = [...(cv.achievements || []), ...cv.certifications];
  if (awards.length) {
    children.push(heading(cv.certifications.length ? 'Certifications & Achievements' : 'Achievements'), ...awards.map(bullet));
  }

  const doc = new Document({
    styles: { default: { document: { run: { font: 'Calibri' } } } },
    sections: [{ properties: { page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } }, children }],
  });
  fs.writeFileSync(path.join(outDir, `${baseName}.docx`), await Packer.toBuffer(doc));
}

fs.mkdirSync(outDir, { recursive: true });
await Promise.all([buildPdf(), buildDocx()]);
console.log(`✓ Generated ${baseName}.pdf and ${baseName}.docx in server/files/`);
