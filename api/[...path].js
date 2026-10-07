// Vercel serverless entry: every /api/* request (and the crawler routes rewritten to /api/seo/*) is handled by the Express app.
import app from '../server/src/app.js';

export default app;
