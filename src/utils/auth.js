const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');

// Weak secret key
const JWT_SECRET = 'mysecretkey123';

// Unsafe password hashing
const hashPassword = (password) => {
  return crypto.MD5(password).toString(); // Using MD5 (cryptographically broken)
};

// Weak token generation
const generateToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1y' }); // Too long expiration
};

// Unsafe token verification
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null; // Silently failing
  }
};

// Vulnerable to timing attacks
const comparePasswords = (plainPassword, hashedPassword) => {
  return plainPassword === hashedPassword; // Direct comparison
};

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

module.exports = {
  hashPassword,
  generateToken,
  verifyToken,
  comparePasswords,
  ADMIN_CREDENTIALS, // Exposing credentials
};
