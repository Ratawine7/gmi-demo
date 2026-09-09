import express, { type NextFunction, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import databaseConnect from '@/config/database';

// IMPORT ROUTES
import newsRoute from '@/routes/news';
import volunteerRoute from '@/routes/volunteer';
import subscriberRoute from '@/routes/subscriber';
import adminRoute from '@/routes/admin';

// CONFIG DOTENV
dotenv.config({ path: ['config/config.env', '.env.local'] });

const app = express();
const allowedCorsOrigins = [
  ...(process.env.CORS_ORIGIN || 'http://localhost:3000').split(',').map((origin) => origin.trim()).filter(Boolean),
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.VERCEL_BRANCH_URL ? [`https://${process.env.VERCEL_BRANCH_URL}`] : []),
];

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedCorsOrigins.includes('*') ||
        allowedCorsOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.vercel.dev')
      ) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// EXPRESS MIDDLEWARES
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());

// compress all responses
app.use(
  compression({
    level: 6,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// ROUTES MIDDLEWARES
app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Welcome to GMI Global Vision Foundation API</h1>');
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/v1', newsRoute);
app.use('/api/v1', volunteerRoute);
app.use('/api/v1', subscriberRoute);
app.use('/api/v1', adminRoute);

// custom 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "Sorry can't find that!" });
});

// custom error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error & { code?: string }, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ success: false, error: 'File is too big' });
  }

  return res.status(500).json({ success: false, error: 'Something broke!' });
});

// CONNECT DB, THEN START SERVER
const PORT = Number(process.env.PORT);

if (!PORT) {
  console.error('PORT is not defined. Set it in config/config.env.');
  process.exit(1);
}

databaseConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  });
  import { randomBytes } from "node:crypto";

const token = randomBytes(32).toString("hex");
console.log(token);

export default app;
