---
sidebar_position: 2
---

# Installation

This guide will help you set up the DOTA Web Panel for local development or production build.

## Quick Checklist

- [Install project dependencies](#install-dependencies)
- [Google OAuth setup](#google-oauth-setup)
- [Backend setup](#backend-server-setup)
- [Development](#run-the-web-panel-development) or [Production build](#run-the-web-panel-production-build) ready

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18.18.0** (exact version required)
- **Corepack** for package manager version management
- **pnpm 10.17.0+** (managed by Corepack)

## Install Dependencies

### 1. Clone the Repository

```bash
git clone https://github.com/ds-horizon/delivr-web-panel.git
cd delivr-web-panel
```

### 2. Enable Corepack

Corepack is required for proper pnpm version management:

```bash
# Install corepack globally (if not already installed)
npm install -g corepack

# Enable corepack
corepack enable
```

### 3. Install pnpm

If pnpm is not already installed:

```bash
npm install -g pnpm
```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Backend API Configuration  
DELIVR_BACKEND_URL=http://localhost:3010
```

:::success Environment configured
Your Web Panel is configured to talk to the backend.
:::

## Google OAuth Setup

The dashboard uses Google OAuth for authentication. Follow these steps to configure it:

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

### 2. Enable OAuth 2.0

1. Navigate to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth 2.0 Client ID**
3. Configure the OAuth consent screen if prompted
4. Select **Web application** as application type

### 3. Configure OAuth Client

**Authorized JavaScript origins:**
```
http://localhost:5173
https://your-production-domain.com
```

**Authorized redirect URIs:**
```
http://localhost:5173/auth/callback
https://your-production-domain.com/auth/callback
```

### 4. Copy Credentials

After creating the OAuth client:
1. Copy the **Client ID**
2. Copy the **Client Secret**
3. Add them to your `.env` file

## Backend Server Setup

The Web Panel requires the DOTA Backend server to be running.

### Start Backend Locally

Follow the [Backend Installation Guide](/dota/server/installation) to set up and start the backend server.

Verify the backend is running:

```bash
curl http://localhost:3010/health
```

### Update Backend URL

In your `.env` file, ensure `DELIVR_BACKEND_URL` points to your backend:

```bash
# Local development
DELIVR_BACKEND_URL=http://localhost:3010

# Production
DELIVR_BACKEND_URL=https://api.your-domain.com
```

## Run the Web Panel (Development)

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` 🚀

:::success Dev server running
Open http://localhost:5173 to access the Web Panel in development mode.
:::

### Development Features

- **Hot Module Replacement (HMR)**: Instant updates on code changes
- **TypeScript checking**: Real-time type validation
- **Fast refresh**: Preserves component state during edits

## Run the Web Panel (Production Build)

### Build for Production

```bash
pnpm build
```

This generates optimized static files in the `dist/` directory.

### Start Production Server

```bash
pnpm start
```

The production server will start on the configured port (default: 3000).

### Preview Production Build Locally

Before deploying, preview the production build:

```bash
# Build first
pnpm build

# Preview
pnpm preview
```

## Verification

After starting the application:

1. **Open Browser**: Navigate to `http://localhost:5173`
2. **Sign In**: Click "Sign in with Google"
3. **Authorize**: Grant permissions to the app
4. **Dashboard**: You should see the dashboard home page

## Additional Commands (Optional)

### Run Tests
Execute the unit test suite to validate functionality.

```bash
pnpm test
```

### Run Linting
Check code style and catch common issues.

```bash
pnpm lint
```

### Type Checking
Run TypeScript type checks for static correctness.

```bash
pnpm typecheck
```

### Generate Routes and Config
Regenerate typed routes and configuration artifacts after changes.

```bash
pnpm gen:routes && pnpm gen:config
```

## Troubleshooting

### OAuth Error: redirect_uri_mismatch

**Problem**: The redirect URI doesn't match the configured one.

**Solution**: 
1. Check your Google Cloud Console OAuth settings
2. Ensure the redirect URI exactly matches: `http://localhost:5173/auth/callback`
3. Include both development and production URIs

### Cannot Connect to Backend

**Problem**: Dashboard can't reach the backend API.

**Solution**:
1. Verify backend is running: `curl http://localhost:3010/health`
2. Check `DELIVR_BACKEND_URL` in `.env`
3. Ensure no firewall blocking the connection

### pnpm Command Not Found

**Problem**: pnpm is not installed or not in PATH.

**Solution**:
```bash
# Enable corepack
corepack enable

# Install pnpm
npm install -g pnpm
```

### Wrong Node Version

**Problem**: Node version mismatch.

**Solution**:
```bash
# Using nvm
nvm install 18.18.0
nvm use 18.18.0

# Using n
n 18.18.0
```

### Build Fails

**Problem**: Production build fails.

**Solution**:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

