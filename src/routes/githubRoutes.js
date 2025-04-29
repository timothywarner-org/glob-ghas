const express = require('express');
const router = express.Router();
const { scanRepo } = require('../controllers/githubController');

router.post('/scan', scanRepo);

module.exports = router;
