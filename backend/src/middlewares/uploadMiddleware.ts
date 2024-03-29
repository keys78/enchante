import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
    destination: 'src/utils/uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExtension = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
    },
  });

// const storage = multer.memoryStorage();


export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 600 * 1024, // 600KB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    },
});
