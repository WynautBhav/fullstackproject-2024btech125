import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db.js';
import contactRoutes from './routes/contact.js';
import cvRoutes from './routes/cv.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.set('trust proxy', 1); // Render/Railway sit behind a proxy
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

app.get('/', (_req, res) => res.json({ status: 'ok', service: 'Vaibhav Sharma Portfolio API' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.use('/api/contact', contactRoutes);
app.use('/api/cv', cvRoutes);

app.use((_req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

connectDB(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`));
