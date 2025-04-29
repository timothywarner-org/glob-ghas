const express = require('express');
const router = express.Router();
const { upload } = require('../utils/upload');
const { executeQuery } = require('../utils/db');
const { verifyToken } = require('../utils/auth');

// Unsafe file upload endpoint
router.post('/upload', upload.single('code'), async (req, res) => {
  try {
    // No file type validation
    const file = req.file;
    const reviewId = await executeQuery(
      `INSERT INTO reviews (filename, status) VALUES ('${file.originalname}', 'pending')`
    );
    res.json({ reviewId, message: 'Code review uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Vulnerable to SQL injection
router.get('/search', async (req, res) => {
  const { query } = req.query;
  const results = await executeQuery(
    `SELECT * FROM reviews WHERE title LIKE '%${query}%' OR description LIKE '%${query}%'`
  );
  res.json(results);
});

// Unsafe token verification
router.get('/my-reviews', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const reviews = await executeQuery(
    `SELECT * FROM reviews WHERE user_id = ${user.id}`
  );
  res.json(reviews);
});

// Unsafe file download
router.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  res.download(`./uploads/${filename}`); // Path traversal vulnerability
});

module.exports = router;
