---
id: intro
sidebar_position: 1
title: Welcome to DOTA
---

# DOTA Documentation

**DOTA (Delivr Over-The-Air)** enables seamless OTA updates for React Native applications. Push JavaScript and asset updates instantly to your users without waiting for app store approval.

## What is DOTA?

DOTA provides a complete ecosystem for managing and deploying OTA updates to your React Native apps:

- **🚀 Instant Updates**: Deploy bug fixes and features without app store delays
- **🏗️ Self-Hostable**: Run locally, on-premise, or in your preferred cloud
- **🔌 Flexible Architecture**: Plugin-based system for storage, database, and authentication
- **📊 Full Control**: Web dashboard, CLI tools, and comprehensive API
- **🎯 Targeted Deployments**: Deploy to specific user segments, versions, or environments
- **🔒 Secure**: Enterprise-grade security with role-based access control

## Getting Started

The DOTA ecosystem consists of four main components:

### [SDK (React Native Module)](/dota/sdk/overview)
The React Native module that you integrate into your mobile app to receive OTA updates.

### [Server (Backend API)](/dota/server/overview)
The core backend service that manages apps, deployments, and update delivery.

### [Web Panel (Dashboard)](/dota/web-panel/overview)
A modern web interface for managing applications, deployments, and monitoring releases.

### [CLI (Command Line Interface)](/dota/cli/overview)
A powerful command-line tool for deploying updates from your terminal or CI/CD pipelines.

## Quick Start Guide

1. **Install the SDK** in your React Native app
2. **Set up the Server** (locally or in the cloud)
3. **Create your app** in the Web Panel and generate deployment keys
4. **Deploy updates** using the Web Panel or CLI

## Use Cases

- **Bug Fixes**: Deploy critical fixes instantly without waiting for store approval
- **A/B Testing**: Test features with specific user segments
- **Feature Flags**: Enable/disable features remotely
- **Gradual Rollouts**: Release updates to a percentage of users
- **Emergency Rollbacks**: Quickly revert to a previous version if issues arise

## Architecture

DOTA uses a plugin-based architecture that allows you to customize every aspect:

- **Storage Providers**: AWS S3, Azure Blob Storage, LocalStack, or custom
- **Databases**: MySQL, PostgreSQL, or custom dialects
- **Authentication**: Google OAuth, passwordless auth, or custom providers
- **Analytics**: Redis, Azure Cache, or custom metrics providers

## Next Steps

Choose your starting point:

- **Mobile Developers**: Start with the [SDK Documentation](/dota/sdk/overview)
- **Backend Engineers**: Set up the [Server](/dota/server/overview)
- **DevOps Teams**: Configure the [CLI](/dota/cli/overview) for automated deployments
- **Product Managers**: Explore the [Web Panel](/dota/web-panel/overview) features

---

**Need Help?** Check out our troubleshooting guides or reach out via [GitHub Issues](https://github.com/ds-horizon).
