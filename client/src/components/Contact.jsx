import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSend, FiCopy, FiCheck, FiGithub, FiPhone, FiMapPin, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Section, { fadeUp } from './Section.jsx';
import CVButtons from './CVButtons.jsx';
import { profile, gmailCompose } from '../data/portfolio.js';
import { API_URL } from '../config.js';

const EMPTY = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', text: '' });
  const [copied, setCopied] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.open(gmailCompose(), '_blank', 'noopener');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', text: '' });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');
      setStatus({ state: 'success', text: data.message });
      setForm(EMPTY);
    } catch (err) {
      const text = err instanceof TypeError ? 'Could not reach the server. Please try again shortly.' : err.message;
      setStatus({ state: 'error', text });
    }
  };

  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title={<>Let's build something <em className="serif">memorable.</em></>}
      className="alt"
    >
      <div className="contact-grid">
        <motion.div className="contact-info" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.p className="contact-lead" variants={fadeUp}>
            Have a product to build, a workflow to automate, or an opportunity to share? Send a note — I usually reply within a day.
          </motion.p>

          <motion.button className="email-chip" onClick={copyEmail} variants={fadeUp} custom={1} aria-label={`Copy email address ${profile.email}`}>
            <span className="email-text">{profile.email}</span>
            <span className="email-icon">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={copied ? 'ok' : 'copy'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                  {copied ? <FiCheck /> : <FiCopy />}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="sr-only" aria-live="polite">{copied ? 'Email copied' : ''}</span>
          </motion.button>

          <motion.ul className="contact-list" variants={fadeUp} custom={2}>
            <li><FiPhone /><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></li>
            <li><FiGithub /><a href={profile.socials.github} target="_blank" rel="noreferrer">github.com/WynautBhav</a></li>
            <li><FiMapPin /><span>{profile.location}</span></li>
          </motion.ul>

          <motion.div variants={fadeUp} custom={3}>
            <CVButtons className="contact-cv" />
          </motion.div>
        </motion.div>

        <motion.form
          className="card contact-form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          noValidate={false}
        >
          <div className="field-row">
            <div className="field">
              <input id="name" name="name" value={form.name} onChange={onChange} required maxLength={100} placeholder=" " autoComplete="name" />
              <label htmlFor="name">Your name</label>
            </div>
            <div className="field">
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required maxLength={200} placeholder=" " autoComplete="email" />
              <label htmlFor="email">Email address</label>
            </div>
          </div>
          <div className="field">
            <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} required maxLength={5000} placeholder=" " />
            <label htmlFor="message">Tell me about your project</label>
            <span className="mono char-count">{form.message.length}/5000</span>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? <span className="spinner" /> : <FiSend />}
            {status.state === 'loading' ? 'Sending…' : 'Send message'}
          </button>

          <AnimatePresence>
            {status.text && (
              <motion.p
                key={status.text}
                className={`form-status ${status.state}`}
                role="status"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status.state === 'success' ? <FiCheckCircle /> : <FiAlertCircle />} {status.text}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </Section>
  );
}
