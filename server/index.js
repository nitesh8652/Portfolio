import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: clientOrigin }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/contact', contactRoutes);

app.listen(port, () => console.log(`Portfolio API running on http://localhost:${port}`));
