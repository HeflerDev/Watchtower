import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';
const MASTER_API_KEY = process.env.MASTER_API_KEY || '';

// Simple API key middleware
function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== MASTER_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  next();
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Protected route example
app.get('/health', apiKeyAuth, (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
