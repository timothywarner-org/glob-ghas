const express = require('express');
const chalk = require('chalk');
const githubRoutes = require('./routes/githubRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { connect } = require('./utils/db');
const { ADMIN_CREDENTIALS } = require('./utils/auth');

// Global error handler (bad practice)
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err);
  // No proper error handling
});

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files (if any) from /public
app.use(express.static(__dirname + '/public'));

// Unsafe JSON parsing with no size limit
app.use(express.json({ limit: '50mb' }));

// CORS misconfiguration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Hardcoded API key middleware
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'globomantics-dev-key-2024') {
    // Hardcoded API key
    next();
  } else {
    res.status(401).json({ error: 'Invalid API key' });
  }
};

// Debug information exposure
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body,
  });
  next();
});

// Business website routes
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/products', (req, res) => res.render('products'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/security-demos', (req, res) => res.render('security-demos'));

// 404 handler for unknown pages
app.use((req, res, next) => {
  if (req.accepts('html')) {
    res.status(404).render('404');
  } else {
    next();
  }
});

// API routes
app.use('/api/github', apiKeyMiddleware, githubRoutes);
app.use('/api/reviews', apiKeyMiddleware, reviewRoutes);

// Unsafe error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    chalk.green(`Globomantics Code Review Assistant running on port ${PORT}`)
  );
  console.log('Admin credentials:', ADMIN_CREDENTIALS); // Logging sensitive info
  connect(); // Unsafe database connection
});
