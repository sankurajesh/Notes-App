import cors from 'cors';
import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// ✅ Mount the /api/auth route
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
