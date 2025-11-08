---
sidebar_position: 3
---

# Deployment

This page covers common ways to deploy the DOTA Web Panel after you have a production build.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel
```

## Deploy to Netlify

```bash
# Build the application
pnpm build

# Deploy the dist folder to Netlify (via UI or CLI)
```

## Deploy to a Custom Server

After building:

```bash
pnpm build
```

Serve the `dist/` directory using your preferred static file server or reverse proxy:

```bash
# Using serve
npx serve -s dist

# Or configure nginx/apache to serve ./dist
```

## Notes

- Ensure environment variables (e.g., backend URL) are set correctly for production.
- The backend must be reachable by the deployed Web Panel origin (CORS/network).


