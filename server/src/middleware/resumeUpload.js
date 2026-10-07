import multer from 'multer';
import ApiError from '../utils/ApiError.js';

// Vercel rejects request bodies above ~4.5 MB, so the practical resume limit is 4 MB.
export const MAX_RESUME_BYTES = 4 * 1024 * 1024;

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_RESUME_BYTES, files: 1 } }).single('upload_file');

/** Parses the multipart application form (field `upload_file`, max 4 MB) and maps multer errors to 400s. */
export default function resumeUpload(req, res, next) {
  upload(req, res, (err) => {
    if (!err) return next();
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(ApiError.badRequest('Please correct the highlighted fields.', { upload_file: 'The file must be 4 MB or smaller.' }));
    }
    return next(ApiError.badRequest('Invalid upload.'));
  });
}
