---
sidebar_position: 1
---

# Overview

The **DOTA CLI** is a Node.js command-line application that allows users to deploy and manage over-the-air updates for React Native applications from the terminal or CI/CD pipelines.

## What is the DOTA CLI?

The DOTA CLI is a powerful command-line tool that enables automated deployment workflows for your React Native apps. It provides full control over OTA updates directly from your terminal or continuous integration systems.

## Why Use the CLI?

- **Automation-first**: Integrates with any CI/CD and supports scripted releases.
- **Fast**: Ship updates from the terminal in seconds.
- **Full control**: Patch bundles, rollouts, mandatory flags, promotions.
- **Flexible**: Works on macOS/Linux/Windows with npm, yarn, or npx.

## Key Features

| Area | What you can do |
|---|---|
| Releases | Ship full or patch (delta) bundles; promote between environments |
| Targeting | Specify target binary versions using semver ranges |
| Rollout & control | Mark updates mandatory; gradual rollouts; enable/disable releases |
| Optimization | Use Brotli/deflate compression for smaller downloads |
| Environments | Work with distinct Staging and Production deployments |
| CI/CD | Integrate with GitHub Actions, GitLab CI, Jenkins, Azure DevOps |
| Tooling | Use npm, yarn, or npx on macOS/Linux/Windows |

## Get Started

Ready to use the CLI? Follow the [setup guide](/dota/cli/installation).

## CLI vs Web Panel

| Capability | CLI | Web Panel |
|---|---|---|
| Automation | ✅ CI/CD, scripts | ❌ Manual |
| Patch bundles | ✅ | ❌ |
| Speed | ⚡ Terminal | 🖱️ Browser |
| Monitoring | ❌ Text-based | ✅ Visual dashboards |
| Ease of use | 💻 Dev-centric | 👥 Non-technical friendly |

