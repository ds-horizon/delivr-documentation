---
sidebar_position: 2
---

# Installation

This guide will help you set up the DOTA Web Panel for local development or production deployment.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18.18.0** (exact version required)
- **Corepack** for package manager version management
- **pnpm 10.17.0+** (managed by Corepack)
- **DOTA Backend Server** running and accessible

## Quick Setup

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

Follow the [Backend Installation Guide](/server/installation) to set up and start the backend server.

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

## Development Mode

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Development Features

- **Hot Module Replacement (HMR)**: Instant updates on code changes
- **TypeScript checking**: Real-time type validation
- **Fast refresh**: Preserves component state during edits

## Production Build

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

## Additional Commands

### Run Tests

```bash
pnpm test
```

### Run Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm typecheck
```

### Generate Routes and Config

```bash
pnpm gen:routes && pnpm gen:config
```

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the application
pnpm build

# Deploy dist folder to Netlify
```

### Deploy to Custom Server

After building:

```bash
pnpm build
```

Serve the `dist/` directory using any static file server:

```bash
# Using serve
npx serve -s dist

# Using nginx, apache, or your preferred server
```

## Environment Variables

### Required Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-xxxxx` |
| `DELIVR_BACKEND_URL` | Backend API URL | `http://localhost:3010` |

### Optional Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## Verification

After starting the application:

1. **Open Browser**: Navigate to `http://localhost:5173`
2. **Sign In**: Click "Sign in with Google"
3. **Authorize**: Grant permissions to the app
4. **Dashboard**: You should see the dashboard home page

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

## Next Steps

- [Learn about release management](/web-panel/releases)
- [Configure API tokens](/web-panel/api-tokens)
- [Explore organization management](/web-panel/organizations)
- [Integrate with the CLI](/cli/overview)

