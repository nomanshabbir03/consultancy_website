import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import { corsPolicy, readLimiter, securityHeaders } from './middleware/security.js';
import apiRoutes from './routes/index.js';
import seoRoutes from './routes/seo.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1); // behind Vercel's proxy: needed for per-client rate limiting and the real host/protocol

// Crawler-facing pages (sitemap.xml, robots.txt, per-article metadata). They carry their own headers.
app.use(seoRoutes);

app.use(securityHeaders);
app.use(corsPolicy);
app.use(express.json({ limit: '100kb' }));

app.use('/api', readLimiter, apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
