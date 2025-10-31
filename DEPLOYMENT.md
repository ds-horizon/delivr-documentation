# GitHub Pages Deployment Guide

This repository is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

## 🚀 Quick Setup

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/ds-horizon/delivr-documentation`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Save the changes

### Step 2: Push Your Code

```bash
# Add all files
git add .

# Commit
git commit -m "Initial Docusaurus site with DOTA documentation"

# Push to main branch
git push origin main
```

### Step 3: Wait for Deployment

1. Go to **Actions** tab in your GitHub repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Your site will be live at: **`https://ds-horizon.github.io/delivr-documentation/`**

---

## 📋 What the Workflow Does

The GitHub Action (`.github/workflows/deploy.yml`) automatically:

1. ✅ Checks out your code
2. ✅ Sets up Node.js 20
3. ✅ Installs dependencies with `npm ci`
4. ✅ Builds the site with `npm run build`
5. ✅ Uploads the build artifacts
6. ✅ Deploys to GitHub Pages

---

## 🔧 Configuration

### Docusaurus Config

The following settings in `docusaurus.config.ts` are configured for GitHub Pages:

```typescript
url: 'https://ds-horizon.github.io',
baseUrl: '/',  // Root path
organizationName: 'ds-horizon',
projectName: 'delivr-documentation',
```

:::info Base URL
The `baseUrl` is set to `/` which works for:
- Custom domains (e.g., `docs.delivr.com`)
- Organization/user pages (e.g., `ds-horizon.github.io`)

If deploying to a project page (e.g., `ds-horizon.github.io/delivr-documentation/`), change to:
```typescript
baseUrl: '/delivr-documentation/',
```
:::

### Custom Domain (Optional)

If you want to use a custom domain:

1. **Update `docusaurus.config.ts`:**
```typescript
url: 'https://docs.yourdomain.com',
baseUrl: '/',
```

2. **Add CNAME file:**
```bash
echo "docs.yourdomain.com" > static/CNAME
```

3. **Configure DNS:**
   - Add a CNAME record pointing to `ds-horizon.github.io`

4. **Update GitHub Pages settings:**
   - Go to Settings → Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

---

## 🔄 Deployment Triggers

The site will automatically deploy when:

- ✅ You push to the `main` branch
- ✅ You manually trigger the workflow from the Actions tab

---

## 🛠️ Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the site
npm run build

# Deploy using Docusaurus built-in command
GIT_USER=<your-github-username> npm run deploy
```

Or use the alternative workflow in `.github/workflows/deploy.yml.backup`

---

## 📊 Monitoring Deployments

### Check Deployment Status

1. Go to **Actions** tab
2. Click on the latest workflow run
3. View logs for each step

### View Live Site

After successful deployment, your site will be available at the URL configured in your GitHub Pages settings:
- **Homepage**: Product overview and navigation
- **DOTA Landing**: `/dota`
- **DOTA Docs**: `/dota/intro`
- **Build**: `/build`
- **Release**: `/release`
- **Testing**: `/testing`

---

## 🐛 Troubleshooting

### Deployment Fails

**Check:**
- Actions permissions are enabled (Settings → Actions → General)
- Pages is set to deploy from GitHub Actions
- Build completes locally: `npm run build`
- No sensitive data in repository

### 404 Errors

**Solution:**
- Verify `baseUrl` in `docusaurus.config.ts` matches your repo name
- Should be `/delivr-documentation/` for this repo
- Clear browser cache

### Workflow Not Triggering

**Check:**
- You're pushing to `main` branch
- Workflow file is in `.github/workflows/`
- Actions are enabled in repository settings

---

## 📝 First Deployment Steps

Ready to deploy? Follow these steps:

```bash
# 1. Stage all changes
git add .

# 2. Commit
git commit -m "Add Docusaurus site with futuristic theme and DOTA documentation"

# 3. Push to GitHub
git push origin main

# 4. Go to Actions tab on GitHub and watch deployment
# 5. Visit your site when complete!
```

---

## 🎉 Success!

Once deployed, your site will be available at:
**https://ds-horizon.github.io/delivr-documentation/**

Share this URL with your team and users!

---

## 📚 Additional Resources

- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)

