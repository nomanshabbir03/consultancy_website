import env from '../config/env.js';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  // Malformed JSON bodies surface from express.json() with a status already set.
  const status = err.status || err.statusCode || 500;
  const isServerError = status >= 500;

  if (isServerError) console.error(err);

  res.status(status).json({
    success: false,
    message: isServerError && env.nodeEnv === 'production' ? 'Internal server error' : err.message,
    ...(err.errors ? { errors: err.errors } : {}),
  });
}
