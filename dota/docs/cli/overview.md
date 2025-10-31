---
sidebar_position: 1
---

# CLI - Overview

The **DOTA CLI** is a Node.js command-line application that allows users to deploy and manage over-the-air updates for React Native applications from the terminal or CI/CD pipelines.

## What is the DOTA CLI?

The DOTA CLI (`code-push-standalone`) is a powerful command-line tool that enables automated deployment workflows for your React Native apps. It provides full control over OTA updates directly from your terminal or continuous integration systems.

## Why Use the CLI?

### 🚀 Automation-First
- Integrate with CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins)
- Script complex deployment workflows
- Automate release processes

### ⚡ Fast and Efficient
- Deploy updates in seconds from the command line
- No need to open a web browser
- Perfect for terminal-focused developers

### 🎯 Full Feature Set
- Everything the Web Panel can do, but scriptable
- Patch bundle releases for smaller updates
- Advanced deployment options

### 🔌 Flexible Integration
- Works with any CI/CD system
- Supports multiple package managers (npm, yarn, npx)
- Cross-platform (Windows, macOS, Linux)

## Key Features

### Release Management
- Deploy full bundles or patch bundles
- Target specific app versions with semver
- Configure mandatory updates
- Control rollout percentages
- Promote updates between environments

### Bundle Optimization
- Support for patch bundles (diff-based updates)
- Multiple compression algorithms (deflate, brotli)
- Smaller bundle sizes for faster downloads

### Deployment Control
- Staging and production deployments
- Gradual rollouts
- Update descriptions and release notes
- Disable/enable updates on demand

### CI/CD Integration
- GitHub Actions ready
- GitLab CI compatible
- Jenkins support
- Azure DevOps integration

## Installation

### Global Installation

Install once, use anywhere:

```bash
npm install -g @d11/delivr-cli
```

After global installation, use directly:

```bash
code-push-standalone <command>
```

### Project Installation

Install as a dev dependency in your project:

**Using npm:**
```bash
npm install --save-dev @d11/delivr-cli
```

**Using yarn:**
```bash
yarn add --dev @d11/delivr-cli
```

After project installation, use through package manager:

```bash
# Using npm
npm run code-push-standalone <command>

# Using yarn
yarn code-push-standalone <command>

# Using npx (no installation needed)
npx code-push-standalone <command>
```

## Quick Start

### 1. Authenticate

Login with your access key from the DOTA Dashboard:

```bash
code-push-standalone login --accessKey <your-access-key>
```

### 2. Deploy an Update

Release a full bundle:

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Staging \
  --description "Bug fixes and improvements"
```

### 3. Promote to Production

After testing in staging:

```bash
code-push-standalone promote MyApp-iOS Staging Production
```

## Common Commands

### Authentication

```bash
# Login
code-push-standalone login --accessKey <key>

# Check current user
code-push-standalone whoami

# Logout
code-push-standalone logout
```

### Deployment

```bash
# Release full bundle
code-push-standalone release <appName> <bundle-path> <version>

# Create and release patch bundle
code-push-standalone create-patch <old-bundle> <new-bundle> <output>
code-push-standalone release <appName> <patch-path> <version> --isPatch true

# Promote between environments
code-push-standalone promote <appName> <from> <to>
```

### Monitoring

```bash
# View deployment history
code-push-standalone deployment history <appName> <deployment>

# List deployments
code-push-standalone deployment list <appName>
```

## Use Cases

### Local Development
Quick deployments during development and testing:

```bash
# Deploy to staging for testing
code-push-standalone release MyApp-iOS ./bundle 1.0.0 -d Staging
```

### CI/CD Pipelines
Automate releases in your pipeline:

```yaml
# GitHub Actions example
- name: Deploy to Production
  run: |
    code-push-standalone release MyApp-iOS ./bundle ${{ github.ref }} \
      --deploymentName Production \
      --description "Release ${{ github.ref }}"
```

### Team Workflows
Consistent deployment process across team members:

```bash
# Deploy script in package.json
{
  "scripts": {
    "deploy:staging": "code-push-standalone release MyApp ./bundle ^1.0.0 -d Staging",
    "deploy:prod": "code-push-standalone release MyApp ./bundle ^1.0.0 -d Production --mandatory"
  }
}
```

### Multi-Platform Releases
Deploy to both iOS and Android:

```bash
# iOS
code-push-standalone release MyApp-iOS ./ios-bundle 1.0.0 -d Production

# Android
code-push-standalone release MyApp-Android ./android-bundle 1.0.0 -d Production
```

## Comparison: CLI vs Web Panel

| Feature | CLI | Web Panel |
|---------|-----|-----------|
| **Automation** | ✅ Full CI/CD integration | ❌ Manual only |
| **Patch Bundles** | ✅ Supported | ❌ Not available |
| **Speed** | ⚡ Instant from terminal | 🖱️ Requires browser |
| **Visual Monitoring** | ❌ Text-based | ✅ Charts and graphs |
| **Ease of Use** | 💻 Technical users | 👥 Non-technical friendly |
| **Scripting** | ✅ Fully scriptable | ❌ Manual interaction |
| **Release History** | ✅ View in terminal | ✅ Visual timeline |

:::tip Best Practice
Use **CLI** for automation and development, **Web Panel** for monitoring and team collaboration.
:::

## Requirements

- **Node.js**: 14 or higher
- **Access Key**: Generated from DOTA Dashboard
- **Bundle Files**: JavaScript bundle and assets ready for deployment

## Getting Access Keys

To use the CLI, you need an API access key:

1. Navigate to the **DOTA Dashboard**
2. Go to **Settings → Tokens**
3. Click **"Generate New Token"**
4. Enter a descriptive name
5. Select access level (Read/Write/All)
6. Copy the generated token
7. Use with `login` command

[Learn more about API tokens →](/web-panel/api-tokens)

## Next Steps

- [Install the CLI](/cli/installation)
- [Learn authentication](/cli/authentication)
- [Master release management](/cli/release-management)
- [Create patch bundles](/cli/patch-bundles)
- [Set up CI/CD integration](/cli/ci-cd-integration)

## Resources

- [GitHub Repository](https://github.com/ds-horizon/delivr-cli)
- [API Reference](/cli/api-reference)
- [CI/CD Examples](/cli/ci-cd-integration)
- [Troubleshooting Guide](/cli/troubleshooting)

