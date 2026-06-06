import fs from 'fs';
import path from 'path';
import multer from 'multer';
import ClientError from '../../../exceptions/client-error.js';

export const UPLOAD_FOLDER = path.resolve(process.cwd(), 'src/services/uploads/files/images');

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  //di mana file akan disimpan
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),

  //nama file yang akan digunakan setelah di-upload
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  //menggunakan konfigurasi yang baru saja kita buat
  storage,

  //membatasi ukuran file maksimum, dalam contoh ini 5 MB
  limits: { fileSize: 5 * 1024 * 1024 },

  //menyaring jenis file agar hanya gambar yang boleh di-upload
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new ClientError('Only image files are allowed'), false);
  },
});

export default { UPLOAD_FOLDER, storage, upload };
