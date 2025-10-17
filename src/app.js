import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/index.js';
import { notfoundHandler, errorHandler } from './utils/errorHandler.js';

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// Register all routes
//app.use('/api/v1', routes);

// Error handling
app.use(notfoundHandler);
app.use(errorHandler);

export default app;
