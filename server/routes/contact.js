import { Router } from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import Message from '../models/Message.js';
import { notifyNewMessage } from '../config/mailer.js';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { success: false, error: 'Too many messages. Please try again later.' },
});

// POST /api/contact — validate and store a contact form submission
router.post('/', limiter, async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (![name, email, message].every((v) => typeof v === 'string' && v.trim())) {
    return res.status(400).json({ success: false, error: 'Name, email and message are required.' });
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, error: 'Database unavailable. Please try again later.' });
  }

  try {
    const saved = await Message.create({ name, email, message });
    notifyNewMessage(saved).catch((err) => console.error('Email notification failed:', err.message));
    res.status(201).json({ success: true, message: 'Thanks! Your message has been received.' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const error = Object.values(err.errors)[0]?.message || 'Invalid input.';
      return res.status(400).json({ success: false, error });
    }
    console.error(err);
    res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
  }
});

export default router;
