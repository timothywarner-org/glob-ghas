const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Unsafe file storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    // No directory existence check
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Unsafe filename handling - allows path traversal
    cb(null, file.originalname);
  },
});

// No file type validation
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB - too large
  },
});

// Unsafe file deletion
const deleteFile = (filename) => {
  const filepath = path.join('./uploads', filename);
  fs.unlinkSync(filepath); // No error handling
};

// Unsafe file reading
const readFile = (filename) => {
  const filepath = path.join('./uploads', filename);
  return fs.readFileSync(filepath); // No error handling
};

module.exports = {
  upload,
  deleteFile,
  readFile,
};
