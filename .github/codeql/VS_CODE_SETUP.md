# Using CodeQL with VS Code

This guide explains how to use the CodeQL extension in VS Code with this repository.

## Setup

1. Install the [CodeQL extension for VS Code](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-codeql)
2. Open the workspace file: `codeql-workspace.code-workspace`
3. Ensure the CodeQL CLI is installed and in your PATH

## Creating a CodeQL Database

To analyze the code, you first need to create a CodeQL database:

1. Open the Command Palette (Ctrl+Shift+P)
2. Select "CodeQL: Create Database"
3. Choose JavaScript as the language
4. Select the root directory of this repository
5. Wait for the database creation to complete

## Running Queries

### Using Pre-built Queries

1. In VS Code, open the Command Palette
2. Select "CodeQL: Run Query"
3. Choose from the custom queries in `.github/codeql/queries/javascript/`

### Writing Custom Queries

1. Create a new `.ql` file in the `.github/codeql/queries/javascript/` directory
2. Write your query using CodeQL
3. Run it using "CodeQL: Run Query" from the Command Palette

## Viewing Results

Query results will appear in the CodeQL Query Results view:

1. Results are displayed with source and sink information for path queries
2. Double-click on results to navigate to the relevant code
3. Use the path explorer to understand the data flow

## Sample Queries Included

- `xss-detection.ql`: Finds cross-site scripting vulnerabilities
- `sql-injection.ql`: Detects SQL injection vulnerabilities
- `command-injection.ql`: Identifies command injection issues
- `hardcoded-credentials.ql`: Locates hardcoded credentials

## Debugging Queries

To debug a query:

1. Set breakpoints in your query file
2. Use "CodeQL: Debug Query" from the Command Palette
3. Step through the query execution

## Saving and Sharing Results

1. Export results using "CodeQL: Save Query Results"
2. Choose SARIF format for compatibility with security tools
3. Results can be imported into GitHub Security or other SARIF viewers
