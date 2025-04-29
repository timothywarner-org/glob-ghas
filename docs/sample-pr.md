# Sample PR: Fix Missing Workflow Permissions

## Description

This PR addresses the CodeQL alert "Workflow does not contain permissions" by adding explicit permissions to our GitHub Actions workflows. This follows the principle of least privilege and improves our security posture.

## Changes

### Before (with alert)

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run lint
```

### After (fixed by Copilot)

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run lint
```

## How This Was Fixed

1. GitHub Copilot detected the missing permissions in our workflow
2. Copilot suggested adding `permissions: contents: read` to the job
3. This follows the principle of least privilege by only granting the minimum permissions needed

## Testing

- [x] Verified that the workflow still runs successfully with the new permissions
- [x] Confirmed that CodeQL no longer reports the "missing permissions" alert

## Related Issues

- Fixes #123 (CodeQL alert: Workflow does not contain permissions)

## Screenshots

### Before (with alert)

![Before](https://example.com/before.png)

### After (fixed)

![After](https://example.com/after.png)
