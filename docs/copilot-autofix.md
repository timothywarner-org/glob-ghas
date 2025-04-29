# GitHub Copilot Autofix for CodeQL Alerts

This document explains how GitHub Copilot can automatically fix common CodeQL alerts, including the "missing workflow permissions" issue.

## Missing Workflow Permissions

### Alert Description

When a GitHub Actions workflow doesn't specify explicit permissions, it inherits permissions from the repository or organization settings. This can lead to excessive permissions that don't follow the principle of least privilege.

### How Copilot Autofixes It

GitHub Copilot can automatically add the appropriate permissions block to your workflow file. For example, it will transform:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
```

Into:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
```

### When to Use Autofix

Copilot's autofix is particularly useful when:

- You're creating new workflows
- You're updating existing workflows
- You want to ensure your workflows follow security best practices

### Best Practices for Permissions

1. **Use the principle of least privilege**: Only grant the permissions your workflow needs
2. **Be specific**: Use granular permissions like `contents: read` instead of broad ones
3. **Review before applying**: Always review Copilot's suggestions before accepting them

## Other CodeQL Alerts Copilot Can Fix

1. **Hardcoded credentials**: Copilot can suggest using GitHub Secrets
2. **SQL injection**: Copilot can suggest parameterized queries
3. **Command injection**: Copilot can suggest safer alternatives

## How to Use Copilot for CodeQL Alerts

1. Open the file with the alert
2. Click on the alert in the Problems panel
3. Look for the "Fix with Copilot" option
4. Review the suggested fix
5. Apply the fix if it looks correct

## Example Workflow with Proper Permissions

```yaml
name: 'Example Workflow'

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm run build
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Build completed successfully!'
            })
```

In this example, the workflow needs:

- `contents: read` to checkout the code
- `pull-requests: write` to comment on PRs
