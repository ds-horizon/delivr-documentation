---
sidebar_position: 1
---

# Overview

A modern dashboard for managing DOTA OTA releases across your apps — deploy, monitor, and control updates without the command line.

## What is the DOTA Web Panel?

The DOTA Web Panel is your control center for OTA updates. Use it to upload bundles, target deployments, monitor adoption, and govern rollouts — all from an intuitive UI.

## Key Features

### 📱 Application Management
- Create and manage multiple apps
- Configure deployment keys for staging and production
- Track app versions and compatibility

### 🚀 Deploy Updates Effortlessly
- Push updates to users without app store delays — ideal for React Native apps.

### 📊 Real-Time Monitoring
- Track deployment progress and adoption rates
- Monitor update success/failure rates
- View version distribution across users
- Real-time analytics and metrics

### 🎯 Advanced Release Control
- **Mandatory Updates**: Force installation for critical fixes
- **Gradual Rollouts**: Control release percentage (10% → 50% → 100%)
- **Conditional Releases**: Target specific app or OS versions
- **Pause/Resume**: Temporarily halt deployments without rollback

### 🔐 Secure Authentication
- Google OAuth integration
- Token-based API authentication
- Role-based access control (RBAC)

### 👥 Team Collaboration
- Organization management
- Multiple team members
- Permission-based access

## 

## Key Benefits

- **⚡ Instant updates**: Ship without app store review delays
- **🎯 Safe rollouts**: Target segments and control rollout % with easy rollback
- **📊 Live visibility**: Monitor adoption and health in real time
- **🔒 Enterprise-ready**: OAuth, API tokens, and RBAC

## System Architecture

### Complete DOTA Ecosystem

The web panel is part of a comprehensive ecosystem:

1. **Mobile App**: React Native app with DOTA SDK
2. **Web Dashboard**: Visual interface (you are here)
3. **Backend API**: Core server managing deployments
4. **CLI Tool**: Command-line interface for automation
5. **CDN**: Global content delivery for bundles

### How It Works End-to-End

1. **App Release**: Publish app with DOTA SDK to stores
2. **OTA Creation**: Create update via dashboard or CLI
3. **Bundle Storage**: Update stored in DOTA infrastructure
4. **Update Check**: App checks for updates via backend
5. **Download & Apply**: App downloads and applies updates instantly

[Complete DOTA Setup Guide →](/dota/full-setup)

## Next Steps

- [Install and configure the Web Panel](/dota/web-panel/installation)
- [Learn about release management](/dota/web-panel/action-and-workflows#deploy-updates)
- [Explore API token management](/dota/web-panel/action-and-workflows)
- [Set up the CLI for automation](/dota/cli/overview)

## Resources

- [GitHub Repository](https://github.com/dream-horizon-org/delivr/tree/main/delivr-web-panel)
- [Backend Documentation](/dota/server/overview)
- [SDK Documentation](/dota/sdk/overview)
- [CLI Documentation](/dota/cli/overview)

