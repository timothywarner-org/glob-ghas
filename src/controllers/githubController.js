const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Unsafe command execution
exports.scanRepo = async (repoUrl) => {
  try {
    // Command injection vulnerability
    const { stdout, stderr } = await execAsync(
      `codeql database create db --source-root=${repoUrl}`
    );

    // Unsafe command execution for analysis
    const { stdout: analysisOutput } = await execAsync(
      `codeql database analyze db ${repoUrl}/ql/queries/security-and-quality.ql --format=sarif-latest`
    );

    return {
      status: 'success',
      results: analysisOutput,
    };
  } catch (error) {
    console.error('Scan error:', error);
    return {
      status: 'error',
      message: error.message,
    };
  }
};

// Unsafe file reading
exports.getRepoConfig = async (repoPath) => {
  const fs = require('fs');
  try {
    // Path traversal vulnerability
    const config = fs.readFileSync(`${repoPath}/config.json`, 'utf8');
    return JSON.parse(config);
  } catch (error) {
    console.error('Config error:', error);
    return null;
  }
};
