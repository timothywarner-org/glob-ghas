const request = require('supertest');
const app = require('../app');
const { executeQuery } = require('../utils/db');
const { verifyToken } = require('../utils/auth');
const path = require('path');
const fs = require('fs');

describe('Security Vulnerabilities Tests', () => {
  // SQL Injection Test
  describe('SQL Injection Vulnerability', () => {
    it('should be vulnerable to SQL injection in search', async () => {
      const maliciousQuery = "'; DROP TABLE users; --";
      const response = await request(app).get(
        `/api/reviews/search?query=${maliciousQuery}`
      );
      expect(response.status).toBe(200);
    });
  });

  // Command Injection Test
  describe('Command Injection Vulnerability', () => {
    it('should be vulnerable to command injection in repo scanning', async () => {
      const maliciousUrl = 'https://github.com/org/repo; rm -rf /';
      const response = await request(app)
        .post('/api/github/scan')
        .send({ repoUrl: maliciousUrl });
      expect(response.status).toBe(200);
    });
  });

  // Path Traversal Test
  describe('Path Traversal Vulnerability', () => {
    it('should be vulnerable to path traversal in file download', async () => {
      const maliciousPath = '../../../etc/passwd';
      const response = await request(app).get(
        `/api/reviews/download/${maliciousPath}`
      );
      expect(response.status).toBe(200);
    });
  });

  // Authentication Test
  describe('Authentication Vulnerabilities', () => {
    it('should use weak password hashing', () => {
      const password = 'test123';
      const hashed = require('../utils/auth').hashPassword(password);
      expect(hashed).toBe(require('crypto-js').MD5(password).toString());
    });

    it('should have weak token verification', () => {
      const token = 'invalid-token';
      const result = verifyToken(token);
      expect(result).toBeNull(); // Silently fails
    });
  });

  // File Upload Test
  describe('File Upload Vulnerabilities', () => {
    it('should accept malicious file types', async () => {
      const response = await request(app)
        .post('/api/reviews/upload')
        .attach('code', path.join(__dirname, 'malicious.exe'));
      expect(response.status).toBe(200);
    });
  });
});
