import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import env from '../config/env.js';

/** Helmet for the API (JSON responses): no scripts are ever served from here, so the CSP is locked down. */
export const securityHeaders = helmet({
  contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } },
  crossOriginResourcePolicy: { policy: 'same-site' },
});

/** CORS: only the configured browser origin(s). Same-origin requests (the Vercel default) need no CORS headers. */
export const corsPolicy = cors({ origin: env.clientOrigins.length ? env.clientOrigins : false });

const limiter = ({ windowMs, limit, message }) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (req, res) => res.status(429).json({ success: false, message }),
  });

// Best effort on serverless: counters live in each function instance's memory.
export const contactLimiter = limiter({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  message: 'Too many messages sent. Please try again in a few minutes.',
});

export const applyLimiter = limiter({
  windowMs: 60 * 60 * 1000,
  limit: 6,
  message: 'Too many applications submitted. Please try again later.',
});

export const readLimiter = limiter({
  windowMs: 60 * 1000,
  limit: 240,
  message: 'Too many requests. Please slow down.',
});

export const loginLimiter = limiter({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  message: 'Too many attempts. Please try again in a few minutes.',
});

export const adminLimiter = limiter({
  windowMs: 60 * 1000,
  limit: 300,
  message: 'Too many requests. Please slow down.',
});
