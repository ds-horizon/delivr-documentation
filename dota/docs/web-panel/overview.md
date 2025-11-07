---
sidebar_position: 1
---

# Overview

A modern web interface for the DOTA platform, enabling seamless application deployment and release management.

## What is the DOTA Web Panel?

The DOTA Dashboard is a comprehensive web application that provides a visual interface for managing your OTA updates. It offers an intuitive way to deploy updates, monitor releases, and manage your React Native applications without touching the command line.

## Key Features

### 📱 Application Management
- Create and manage multiple apps
- Configure deployment keys for staging and production
- Track app versions and compatibility

### 🚀 Deploy Updates Effortlessly
Push updates to users without app store delays - perfect for React Native apps.

### 📊 Real-Time Monitoring
- Track deployment progress and adoption rates
- Monitor update success/failure rates
- View version distribution across users
- Real-time analytics and metrics

### 🎯 Advanced Release Control
- **Mandatory Updates**: Force users to install critical updates
- **Gradual Rollouts**: Control release percentage (10% → 50% → 100%)
- **Conditional Releases**: Target specific app versions or OS versions
- **Pause/Resume**: Temporarily halt deployments without rollback

### 🔐 Secure Authentication
- Google OAuth integration
- Token-based API authentication
- Role-based access control (RBAC)

### 👥 Team Collaboration
- Organization management
- Multiple team members
- Permission-based access

## What You Can Do

### Deploy Mobile Apps Effortlessly
Push updates to users without app store delays. Perfect for React Native apps with:
- Instant bug fixes
- Feature rollouts
- A/B testing
- Emergency hotfixes

### Manage Deployments Visually
- Upload bundles through drag-and-drop interface
- Configure rollout settings with sliders and toggles
- Monitor deployment progress with real-time charts
- Review and approve releases before publishing

### Track and Analyze
- View adoption metrics and install rates
- Monitor error rates and performance
- Analyze version distribution
- Track rollout progress

## Getting Started (5 Minutes)

### Step 1: Install DOTA SDK in Your Mobile App

Integrate the SDK to enable over-the-air updates.
[View SDK Documentation →](/sdk/overview)

### Step 2: Set Up Your Dashboard Account

1. Sign in with your Google account
2. Create your organization (company workspace)
3. Create your first app inside the organization
4. Generate deployment keys for your app

### Step 3: Configure Your App

1. Copy the deployment keys from the dashboard
2. **Important**: Burn these keys into your mobile app code
3. Release your app to App Store/Play Store with the embedded keys
4. Now you're ready to send OTA updates!

### Step 4: Deploy Updates

You can deploy updates in two ways:

#### Via Web Dashboard

1. **Click "Create Release"**
2. **Upload Bundle** - Drag and drop your application bundle
3. **Configure Details** - Set app version and deployment settings
4. **Rollout Settings** - Configure percentage and flags
5. **Review & Publish** - Review changes and deploy

#### Via CLI

Deploy from your terminal or CI/CD pipeline:
```bash
code-push-standalone release MyApp-iOS ./bundle 1.0.0 --deploymentName Production
```
[Learn more about CLI →](/cli/overview)

:::tip
The dashboard shows **all deployments** regardless of how they were created (web or CLI).
:::

## Common Workflows

### 🔄 Deploying a New OTA Update

**Your workflow**: Code → Build → Upload to DOTA → Deploy

1. **Make Changes**: Update your React Native code (JS/assets only)
2. **Choose Method**:
   - **Web Dashboard**: Upload bundle directly through the UI
   - **CLI**: Deploy from your build pipeline
3. **Target Deployment**: Select staging or production
4. **Monitor**: Track adoption and rollout progress

### 🔧 Managing Multiple Deployments

- **Staging Deployment**: For internal testing and QA
- **Production Deployment**: Live updates to end users

Each deployment key represents a different update channel for your app.

### 🎯 Gradual Rollout Strategy

1. Deploy to **10%** of users
2. Monitor for 24-48 hours
3. Increase to **50%** if stable
4. Complete rollout to **100%**

## Advanced Features

### Deployment Control Options

- **🔒 Mandatory Updates**: Force installation before app usage
- **⏸️ Disabled Updates**: Temporarily pause without rollback
- **📊 Gradual Rollouts**: Manage risk with percentage control
- **🎯 Conditional Releases**: Target specific versions or segments

### Versioning

- **📦 Binary Compatibility**: Updates only work with compatible app versions
- **📱 Multi-Version Support**: Different updates for different base versions
- **🔗 Version Targeting**: Deploy to specific version ranges

### Analytics & Monitoring

- **📈 Adoption Metrics**: Real-time install rates and user adoption
- **🚨 Error Reporting**: Monitor update failures and crash rates
- **⏱️ Performance Data**: Download times and success rates by region
- **📊 Version Distribution**: See which versions users are running

## Key Benefits

- **⚡ Instant Updates**: Deploy without app store approval
- **🎯 Targeted Releases**: Deploy to specific user segments
- **🔄 Easy Rollbacks**: Revert to previous versions instantly
- **📊 Real-time Monitoring**: See deployment progress live
- **🔒 Secure**: Enterprise-grade security with RBAC

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

## Common Questions

**Q: What are deployment keys?**  
A: Secure tokens that identify where OTA updates should be delivered. Generate them in the dashboard, embed them in your app, and use them to target deployments.

**Q: Do I need to update the app store every time?**  
A: No! Once your app is in the store with the SDK and deployment keys, you can send JavaScript/asset updates instantly without store approval.

**Q: Can I deploy from both dashboard and CLI?**  
A: Yes! The dashboard shows all deployments whether they came from the UI or CLI.

**Q: How do I rollback an update?**  
A: Deploy a previous working version using the same deployment key. Users will receive it like any other update.

## Prerequisites

Before using the Web Panel:

- Node.js 18.18.0 (exact version required)
- Corepack enabled
- pnpm 10.17.0+
- Running instance of [DOTA Server](/server/overview)

## Next Steps

- [Install and configure the Web Panel](/web-panel/installation)
- [Learn about release management](/web-panel/releases)
- [Explore API token management](/web-panel/api-tokens)
- [Set up the CLI for automation](/cli/overview)

## Resources

- [GitHub Repository](https://github.com/ds-horizon/delivr-web-panel)
- [Backend Documentation](/server/overview)
- [SDK Documentation](/sdk/overview)
- [CLI Documentation](/cli/overview)

