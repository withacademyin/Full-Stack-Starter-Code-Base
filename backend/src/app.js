import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import api_routes from './routes/index.js';
import { error_handler, not_found_handler } from './middlewares/error_handler.js';

const app = express();

const allowed_origins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

app.use(
  cors({
    origin: allowed_origins,
    credentials: true,
  }),
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    data: { docs: '/api/v1/health' },
  });
});

app.use('/api/v1', api_routes);

app.use(not_found_handler);
app.use(error_handler);

export default app;
