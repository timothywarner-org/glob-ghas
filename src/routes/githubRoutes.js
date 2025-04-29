const express = require('express');
const router = express.Router();
const { scanRepo } = require('../controllers/githubController');
const { executeQuery } = require('../utils/db');

// Vulnerable to command injection
router.post('/scan', async (req, res) => {
  const { repoUrl } = req.body;
  try {
    // Unsafe command execution
    const result = await scanRepo(repoUrl);

    // SQL injection vulnerability
    await executeQuery(
      `INSERT INTO scan_results (repo_url, status, timestamp) 
       VALUES ('${repoUrl}', '${result.status}', '${new Date().toISOString()}')`
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Scan failed' });
  }
});

// Unsafe parameter handling
router.get('/repos/:org', async (req, res) => {
  const { org } = req.params;
  try {
    // SQL injection vulnerability
    const repos = await executeQuery(
      `SELECT * FROM repositories WHERE organization = '${org}'`
    );
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

module.exports = router;
