import multer from 'multer';
import ApiError from '../utils/ApiError.js';
import { MAX_IMAGE_BYTES } from '../services/storageService.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_IMAGE_BYTES, files: 1 } }).single('file');

/** Parses one image (field `file`, max 3 MB); the real file type is verified later from its signature. */
export default function imageUpload(req, res, next) {
  upload(req, res, (err) => {
    if (!err) return next();
    if (err.code === 'LIMIT_FILE_SIZE') return next(ApiError.badRequest('The image must be 3 MB or smaller.'));
    return next(ApiError.badRequest('Invalid upload.'));
  });
}
