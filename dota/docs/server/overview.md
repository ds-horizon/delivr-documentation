---
sidebar_position: 1
---

# Overview

DOTA (Delivr Over-The-Air) is a self-hostable backend service for deploying OTA updates to React Native applications.

## What is DOTA Server?

DOTA Server is the core backend API that powers the entire OTA update ecosystem. It manages applications, deployments, bundle storage, and update delivery to mobile clients.

## Why DOTA?

- 🚀 **Instantly push updates** — No app store or distribution delays
- 🏗️ **Full control** — Run locally, on-premise, or on any supported cloud
- 🔌 **Flexible and extensible** — Mix, match, and extend with plugins
- 🧑‍🤝‍🧑 **Cohorting** — Target updates by deployment key, app version, tenant, or RBAC
- ⚡ **Force Update** — Instantly require users to update by enabling mandatory updates
- 🗂️ **Version Control** — Multi-version, partitioned, and semantic versioning support

## Key Features

### 🔄 OTA Updates for React Native
Push JavaScript and asset updates directly to your users without app store approval.

### 🏗️ Self-Hostable
Run the server locally, on-premise, or in your preferred cloud environment:
- Local development with Docker
- AWS deployment
- Azure deployment
- Custom cloud providers

### 🔌 Pluggable Provider System
Multi-platform cloud plugin architecture supporting:
- **Storage**: S3, Azure Blob, LocalStack, or custom
- **Database**: MySQL, PostgreSQL, or custom dialects
- **Auth**: Google OAuth, passwordless authentication
- **Analytics**: Redis, Azure Cache with cluster mode

### 🐳 Docker-First Architecture
Emulated environments with LocalStack, MySQL, Redis, and more for easy local development.

### 🛡️ Secure Authentication
- Google OAuth integration
- Passwordless authentication mode for local/dev
- Configurable OAuth plugins (future: Guardian support)

### 📊 Metrics & Monitoring
Optional Redis integration for advanced analytics and monitoring.

### 🛠️ Complete Toolchain
Works seamlessly with:
- [DOTA CLI](/dota/cli/overview) - Command-line deployments
- [DOTA Web Panel](/dota/web-panel/overview) - Visual management interface
- [DOTA SDK](/dota/sdk/overview) - React Native client integration

## Architecture

The server uses a flexible, plugin-based architecture that adapts to any infrastructure:

### Deployment Modes

| Mode | Storage/DB Plugins | Cloud Provider | Analytics | Notes |
|------|-------------------|----------------|-----------|-------|
| **Local** | JSON, LocalStack (S3, EC2), MySQL, Postgres, Redis, Azurite | Emulated | Redis | All-in-Docker; emulate AWS/Azure; switch DB dialect |
| **AWS** | S3, EC2, RDS (MySQL/Postgres) | AWS | OSS Cache | Use real AWS credentials |
| **Azure** | Blob Storage, App Service, Azurite, Azure Data Tables | Azure | Azure Redis | Use real Azure credentials |

:::tip Flexibility
Switch providers by editing your `.env` file and running the setup script. Mix and match storage, database, and analytics plugins as needed.
:::

## Plugin System

DOTA's plugin system allows you to extend or replace core features:

### Storage Plugins
- AWS S3
- Azure Blob Storage
- LocalStack (for local development)
- Custom storage providers

### Database Plugins
- MySQL
- PostgreSQL
- Custom dialects (via Sequelize)

### Auth Plugins
- Google OAuth
- Passwordless authentication
- Configurable OAuth plugins (future support)

### Metrics Plugins
- Redis
- OSS Cache
- Azure Cache with Cluster Mode

### Cohorting Plugins
Rule-based targeting by attributes:
- Deployment key
- App version/range
- Environment
- User cohort
- Platform
- App
- Tenant

### RBAC Plugins
- Inbuilt role-based access control
- Configurable (future: Casbin support)

## Tech Stack

The server is built with modern technologies:

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for API
- **Database**: Sequelize ORM (MySQL/PostgreSQL)
- **Caching**: Redis for performance
- **Storage**: Plugin-based (S3, Azure Blob, etc.)
- **Containerization**: Docker for easy deployment

## Use Cases

### Local Development
Perfect for testing and development with emulated cloud services.

### Enterprise Deployment
Self-host on your infrastructure with full control over data and security.

### Multi-Tenant SaaS
Support multiple organizations with tenant isolation and RBAC.

### Hybrid Cloud
Mix local and cloud resources based on your needs.

## Resources
- [Github Repository](https://github.com/ds-horizon/delivr/tree/main/delivr-server-ota)
- [SDK Documentation](/dota/sdk/overview)
- [CLI Documentation](/dota/cli/overview)
- [Web Panel Documentation](/dota/web-panel/overview)

