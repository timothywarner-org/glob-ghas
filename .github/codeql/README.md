# CodeQL Configuration for Globomantics

This directory contains custom CodeQL configurations for enhanced security analysis of the Globomantics application.

## Files

- **codeql-config.yml**: Main configuration file used by GitHub Actions workflow
- **javascript-custom-queries.qls**: Custom query suite with extended security checks

## Usage

### GitHub Actions

The repository is configured to run CodeQL analysis automatically via GitHub Actions. The workflow is defined in `.github/workflows/codeql-analysis.yml` and uses the configuration in this directory.

### Local Analysis

For local analysis, use the npm scripts defined in `package.json`:

```bash
# Standard analysis
npm run codeql

# Custom analysis with extended security queries
npm run codeql:custom
```

## Customizing

### Adding Custom Queries

To add custom queries:

1. Create a new `.ql` file in this directory
2. Add the query to the `javascript-custom-queries.qls` file

### Modifying Analysis Scope

To change what files are analyzed:

1. Edit the `paths` and `paths-ignore` sections in `codeql-config.yml`

## Security Findings

The analysis will identify various security issues including:

- SQL injection
- Cross-site scripting (XSS)
- Command injection
- Path traversal
- Insecure dependencies
- Hardcoded credentials
- And many more

## Output

Analysis results are saved as SARIF files:
- `codeql-results.sarif` - Standard analysis
- `codeql-custom-results.sarif` - Custom analysis with extended security queries

These files can be uploaded to GitHub Security or viewed with any SARIF viewer.
