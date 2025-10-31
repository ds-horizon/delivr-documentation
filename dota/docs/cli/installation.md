---
sidebar_position: 2
---

# Installation

This guide covers the different ways to install and use the DOTA CLI.

## Prerequisites

Before installing the CLI, ensure you have:

- **Node.js** 14 or higher
- **npm** or **yarn** package manager
- **Access Key** from DOTA Dashboard (for authentication)

## Installation Methods

### Method 1: Global Installation (Recommended)

Install the CLI globally to use it from anywhere:

```bash
npm install -g @d11/delivr-cli
```

**Benefits:**
- Available in any directory
- Shorter command syntax
- Persistent across projects

**Usage:**
```bash
code-push-standalone <command>
```

**Example:**
```bash
code-push-standalone login --accessKey your-key
code-push-standalone release MyApp-iOS ./bundle 1.0.0
```

### Method 2: Project Installation

Install as a development dependency in your project:

**Using npm:**
```bash
npm install --save-dev @d11/delivr-cli
```

**Using yarn:**
```bash
yarn add --dev @d11/delivr-cli
```

**Benefits:**
- Version controlled with your project
- Consistent versions across team
- Works in CI/CD without global install

**Usage:**

Via package.json scripts:
```json
{
  "scripts": {
    "deploy:staging": "code-push-standalone release MyApp ./bundle 1.0.0 -d Staging",
    "deploy:prod": "code-push-standalone release MyApp ./bundle 1.0.0 -d Production"
  }
}
```

Then run:
```bash
npm run deploy:staging
# or
yarn deploy:staging
```

Via npx (no installation needed):
```bash
npx code-push-standalone <command>
```

Via npm/yarn:
```bash
npm run code-push-standalone <command>
yarn code-push-standalone <command>
```

### Method 3: Using npx (No Installation)

Run the CLI without installing:

```bash
npx @d11/delivr-cli <command>
```

**Benefits:**
- No installation required
- Always uses latest version
- Great for one-off commands

**Example:**
```bash
npx @d11/delivr-cli login --accessKey your-key
npx @d11/delivr-cli release MyApp ./bundle 1.0.0
```

## Verification

Verify the installation:

```bash
code-push-standalone --version
```

You should see the installed version number.

## Getting an Access Key

Before you can use the CLI, you need an access key from the DOTA Dashboard.

### Steps to Get Access Key:

1. **Open DOTA Dashboard**: Navigate to your DOTA web panel
2. **Go to Tokens Page**: Find it in the sidebar under Settings
3. **Create New Token**: Click "Create Token" or "Generate New Token"
4. **Configure Token**:
   - Enter a descriptive name (e.g., "CLI Access", "CI/CD Pipeline")
   - Select access level:
     - **All**: Full read and write access
     - **Write**: Create and update deployments
     - **Read**: View deployments and app info only
5. **Copy Token**: The token is shown once - copy it immediately
6. **Store Securely**: Save the token in a secure location

:::warning Important
You won't be able to see the token again after creation. If you lose it, you'll need to generate a new one.
:::

## Recommended Setup

For most workflows, we recommend:

### For Individual Developers

**Global Installation:**
```bash
# Install globally
npm install -g @d11/delivr-cli

# Login once
code-push-standalone login --accessKey your-key

# Use anywhere
code-push-standalone release MyApp ./bundle 1.0.0
```

### For Teams

**Project Installation with Scripts:**

1. Install as dev dependency:
```bash
npm install --save-dev @d11/delivr-cli
```

2. Add scripts to `package.json`:
```json
{
  "scripts": {
    "deploy:ios:staging": "code-push-standalone release MyApp-iOS ./ios-bundle ^1.0.0 -d Staging",
    "deploy:ios:prod": "code-push-standalone release MyApp-iOS ./ios-bundle ^1.0.0 -d Production --mandatory",
    "deploy:android:staging": "code-push-standalone release MyApp-Android ./android-bundle ^1.0.0 -d Staging",
    "deploy:android:prod": "code-push-standalone release MyApp-Android ./android-bundle ^1.0.0 -d Production --mandatory"
  }
}
```

3. Team members use:
```bash
npm run deploy:ios:staging
npm run deploy:android:prod
```

### For CI/CD

**npx in Pipeline:**

```yaml
# GitHub Actions example
- name: Deploy to Production
  run: |
    npx @d11/delivr-cli login --accessKey ${{ secrets.DELIVR_ACCESS_KEY }}
    npx @d11/delivr-cli release MyApp-iOS ./bundle $VERSION -d Production
```

**Benefits:**
- No global installation needed
- Always uses specified version
- Clean CI environment

## Updating the CLI

### Global Installation

```bash
npm update -g @d11/delivr-cli
```

### Project Installation

```bash
# npm
npm update @d11/delivr-cli

# yarn
yarn upgrade @d11/delivr-cli
```

### Check Current Version

```bash
code-push-standalone --version
```

### Check Latest Version

```bash
npm view @d11/delivr-cli version
```

## Uninstalling

### Global Installation

```bash
npm uninstall -g @d11/delivr-cli
```

### Project Installation

```bash
# npm
npm uninstall @d11/delivr-cli

# yarn
yarn remove @d11/delivr-cli
```

## Troubleshooting

### Command Not Found

**Problem:** `code-push-standalone: command not found`

**Solutions:**

1. **Check global installation:**
```bash
npm list -g @d11/delivr-cli
```

2. **Reinstall globally:**
```bash
npm install -g @d11/delivr-cli
```

3. **Use npx instead:**
```bash
npx @d11/delivr-cli <command>
```

4. **Check PATH:**
```bash
echo $PATH
# Ensure npm global bin directory is in PATH
```

### Permission Errors (macOS/Linux)

**Problem:** Permission denied when installing globally

**Solution:** Use sudo (not recommended) or fix npm permissions:

```bash
# Option 1: Use npx instead (recommended)
npx @d11/delivr-cli <command>

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Then install globally
npm install -g @d11/delivr-cli
```

### Version Conflicts

**Problem:** Different CLI versions causing issues

**Solution:**

```bash
# Check installed version
code-push-standalone --version

# Update to latest
npm update -g @d11/delivr-cli

# Or install specific version
npm install -g @d11/delivr-cli@1.2.3
```

### npx Slow or Hanging

**Problem:** npx takes a long time to run

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Or install globally for better performance
npm install -g @d11/delivr-cli
```

## Next Steps

- [Authenticate with the CLI](/cli/authentication)
- [Learn release management](/cli/release-management)
- [Create patch bundles](/cli/patch-bundles)
- [Set up CI/CD integration](/cli/ci-cd-integration)

