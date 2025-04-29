# Globomantics Code Review Assistant

A deliberately vulnerable application for teaching GitHub Advanced Security (GHAS) and CodeQL analysis.

## 🎓 Course Overview

This repository is designed as a hands-on learning environment for understanding:

- CodeQL analysis
- Security vulnerabilities in Node.js applications
- GitHub Advanced Security features
- Common code smells and anti-patterns

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- GitHub account with access to Advanced Security features

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/glob-ghas.git
cd glob-ghas

# Install dependencies
npm install

# Create uploads directory
mkdir uploads

# Start the application
npm start
```

## 🔍 Security Issues to Discover

### 1. SQL Injection Vulnerabilities

- Location: `src/routes/reviewRoutes.js`
- Issue: Unsanitized user input in SQL queries
- Impact: Potential data breach and unauthorized access

### 2. Command Injection

- Location: `src/controllers/githubController.js`
- Issue: Unsafe command execution with user input
- Impact: Remote code execution

### 3. Path Traversal

- Location: `src/routes/reviewRoutes.js`
- Issue: Unsafe file path handling
- Impact: Unauthorized file access

### 4. Authentication Issues

- Location: `src/utils/auth.js`
- Issue: Weak password hashing and token management
- Impact: Account compromise

### 5. File Upload Vulnerabilities

- Location: `src/utils/upload.js`
- Issue: Insufficient file validation
- Impact: Malicious file uploads

## 📚 Learning Modules

### Module 1: CodeQL Basics

- Understanding CodeQL syntax
- Writing basic queries
- Analyzing query results

### Module 2: Security Vulnerabilities

- SQL Injection detection
- Command Injection prevention
- Path Traversal mitigation
- Secure file handling

### Module 3: Code Quality

- Code smell detection
- Best practices implementation
- Refactoring patterns

### Module 4: GitHub Advanced Security

- Setting up CodeQL
- Understanding alerts
- Managing security policies

## 🛠️ Development

### Running Tests

```bash
npm test
```

### CodeQL Analysis

```bash
# Initialize CodeQL
codeql database create db --language=javascript

# Run analysis
codeql database analyze db javascript-security-and-quality.ql --format=sarif-latest
```

## 📝 Course Exercises

1. **Basic CodeQL Query**

   - Write a query to detect SQL injection vulnerabilities
   - Analyze the results in the GitHub Security tab

2. **Security Fix**

   - Identify and fix the SQL injection in `reviewRoutes.js`
   - Verify the fix with CodeQL

3. **Advanced Analysis**
   - Create custom CodeQL queries for specific vulnerabilities
   - Implement security best practices

## 🔒 Security Notice

⚠️ **This application contains deliberate security vulnerabilities for educational purposes. DO NOT deploy to production.**

## 📚 Resources

- [GitHub Advanced Security Documentation](https://docs.github.com/en/enterprise-cloud@latest/code-security)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)

## 📝 License

MIT License - See LICENSE file for details
