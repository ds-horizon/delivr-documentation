---
sidebar_position: 2
id: full-setup
title: Full Setup Guide
---

# Complete DOTA Setup Guide

This interactive guide will walk you through the entire process of setting up DOTA and sending your first OTA update. Follow these steps in order for a smooth experience.

:::tip Estimated Time
⏱️ **30-45 minutes** to complete the full setup
:::

---

## 🎯 What You'll Accomplish

By the end of this guide, you will:

- ✅ Have DOTA Server running locally or in the cloud
- ✅ Have the Web Panel configured and accessible
- ✅ Have DOTA SDK integrated into your React Native app
- ✅ Have CLI installed and authenticated
- ✅ Successfully deploy your first OTA update

---

## Step 1: Set Up DOTA Server (Backend)

The server is the heart of the DOTA ecosystem. Let's get it running first.

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18 or higher
- Git

### Quick Start with Docker

**1.1 Clone the Server Repository**

```bash
git clone https://github.com/ds-horizon/delivr-server-ota.git
cd delivr-server-ota
```

**1.2 Install Dependencies**

```bash
npm install
```

**1.3 Configure Environment**

```bash
cp .env.example .env
# Edit .env with your preferred settings
```

**1.4 Start the Server with Docker**

```bash
docker-compose up
```

The server will start at **`http://localhost:3010`**

**1.5 Verify Server is Running**

```bash
curl http://localhost:3010/health
```

Expected response: `{"status": "ok", "timestamp": "..."}`

:::success Server Ready
✅ Your DOTA Server is now running! Keep it running for the rest of the setup.
:::

[📖 Detailed Server Setup Guide →](/server/installation)

---

## Step 2: Set Up Web Panel (Dashboard)

The Web Panel provides a visual interface for managing your apps and deployments.

### Prerequisites

- Node.js 18.18.0 (exact version)
- pnpm 10.17.0+
- DOTA Server running (from Step 1)

### Setup Steps

**2.1 Clone the Web Panel Repository**

```bash
git clone https://github.com/ds-horizon/delivr-web-panel.git
cd delivr-web-panel
```

**2.2 Enable Corepack and Install pnpm**

```bash
npm install -g corepack
corepack enable
npm install -g pnpm
```

**2.3 Install Dependencies**

```bash
pnpm install
```

**2.4 Configure Environment**

Create `.env` file:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Backend API Configuration
DELIVR_BACKEND_URL=http://localhost:3010
```

:::info Google OAuth Setup
You'll need to create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/):
1. Create a new project
2. Enable OAuth 2.0
3. Add authorized redirect URI: `http://localhost:5173/auth/callback`
4. Copy Client ID and Secret to `.env`
:::

**2.5 Start the Web Panel**

```bash
pnpm dev
```

The dashboard will be available at **`http://localhost:5173`**

**2.6 Sign In and Create Your Organization**

1. Open `http://localhost:5173` in your browser
2. Click "Sign in with Google"
3. Create your organization (e.g., "My Company")
4. You're now ready to create apps!

:::success Dashboard Ready
✅ Your DOTA Dashboard is now running and configured!
:::

[📖 Detailed Web Panel Setup Guide →](/web-panel/installation)

---

## Step 3: Create Your App and Generate Deployment Keys

Now let's create your first app in the dashboard and get deployment keys.

**3.1 Create Your App**

1. In the Web Panel, click **"Create App"** or **"New Application"**
2. Enter your app details:
   - **App Name**: `MyApp-iOS` (or `MyApp-Android`)
   - **Platform**: iOS or Android
   - **Description**: Optional

**3.2 Generate Deployment Keys**

After creating the app, you'll see two deployment keys generated:

- 🟡 **Staging** - For testing and QA
- 🟢 **Production** - For live users

**3.3 Copy the Deployment Keys**

Copy both keys - you'll need them in the next step.

:::warning Important
Keep these keys secure! They will be embedded in your mobile app and identify where updates should be delivered.
:::

---

## Step 4: Integrate DOTA SDK into Your React Native App

Now let's add DOTA to your React Native application.

### 4.1 Install the SDK

Navigate to your React Native project:

```bash
cd /path/to/your/react-native-app
```

Install DOTA SDK:

**Using npm:**
```bash
npm install @d11/dota
```

**Using yarn:**
```bash
yarn add @d11/dota
```

### 4.2 Platform-Specific Configuration

#### For iOS:

**Add to your `Podfile` (at the top):**

```ruby
require_relative '../node_modules/@d11/dota/ios/scripts/dota_pod_helpers.rb'
```

**Add to `post_install` block in `Podfile`:**

```ruby
post_install do |installer|
  # Replace 'YourAppTargetName' with your actual app target name
  dota_post_install(installer, 'YourAppTargetName', File.expand_path(__dir__))
end
```

**Install pods:**

```bash
cd ios && pod install && cd ..
```

#### For Android:

**Add to `android/app/build.gradle`:**

```gradle
apply from: "../../node_modules/@d11/dota/android/codepush.gradle"
```

Add this line after the `apply plugin` lines.

### 4.3 Integrate DOTA in Your App Code

**Open your root component (usually `App.tsx` or `App.js`):**

```javascript
import codePush from "@d11/dota";
import { Platform } from "react-native";

// Use the deployment keys from Step 3
const DEPLOYMENT_KEY = Platform.select({
  ios: 'YOUR_IOS_STAGING_KEY',     // Paste your iOS staging key here
  android: 'YOUR_ANDROID_STAGING_KEY', // Paste your Android staging key here
});

function App() {
  // Your app code
  return (
    <View>
      <Text>My App</Text>
    </View>
  );
}

// Wrap your app with codePush
export default codePush({
  deploymentKey: DEPLOYMENT_KEY,
})(App);
```

### 4.4 Build Your App

:::caution Important
DOTA updates don't work in Debug mode. Build in Release mode to test.
:::

**For iOS:**
```bash
npx react-native run-ios --configuration Release
```

**For Android:**
```bash
cd android && ./gradlew assembleRelease
cd ..
```

### 4.5 Release to App Store

Build your app for production and release it to the App Store/Play Store with the DOTA SDK and deployment keys embedded.

:::success SDK Integrated
✅ Your app is now ready to receive OTA updates!
:::

[📖 Detailed SDK Setup Guide →](/sdk/overview)

---

## Step 5: Generate Your JavaScript Bundle

Before you can send an update, you need to create a JavaScript bundle.

### 5.1 Generate Bundle

DOTA provides a CLI tool for bundle generation:

**For Android:**
```bash
npx dota bundle --platform android
```

**For iOS:**
```bash
npx dota bundle --platform ios
```

This creates bundles in the `.dota/` directory:

```
.dota/
├── android/
│   ├── index.android.bundle
│   └── assets/
└── ios/
    ├── main.jsbundle
    └── assets/
```

:::tip Auto-Generation
If you followed the SDK setup correctly, bundles are automatically generated during your app build process. Manual generation is optional.
:::

---

## Step 6: Install and Configure DOTA CLI

The CLI allows you to deploy updates from your terminal or CI/CD pipeline.

### 6.1 Install CLI

**Global installation (recommended):**

```bash
npm install -g @d11/delivr-cli
```

**Or use npx (no installation needed):**

```bash
npx code-push-standalone --version
```

### 6.2 Generate API Token

1. Go to your Web Panel at `http://localhost:5173`
2. Navigate to **Settings → Tokens** or **Tokens** page
3. Click **"Create Token"** or **"Generate New Token"**
4. Enter a name: `CLI Access`
5. Select access level: **All**
6. Click **"Create"**
7. **Copy the token immediately** (you won't see it again!)

### 6.3 Authenticate CLI

```bash
code-push-standalone login --accessKey YOUR_ACCESS_TOKEN
```

Verify authentication:

```bash
code-push-standalone whoami
```

:::success CLI Ready
✅ CLI is installed and authenticated!
:::

[📖 Detailed CLI Setup Guide →](/cli/installation)

---

## Step 7: Deploy Your First OTA Update! 🚀

Now comes the exciting part - deploying your first update!

### Option A: Deploy via Web Panel

**7.1 Make a Code Change**

Edit your React Native code (change some text, colors, etc.)

**7.2 Generate Bundle**

```bash
# For iOS
npx dota bundle --platform ios

# For Android
npx dota bundle --platform android
```

**7.3 Upload via Dashboard**

1. Open Web Panel at `http://localhost:5173`
2. Navigate to your app
3. Click **"Create Release"** or **"New Deployment"**
4. **Upload Bundle**: Drag and drop your bundle from `.dota/ios/` or `.dota/android/`
5. **Configure**:
   - Target Binary Version: `1.0.0` (match your app version)
   - Deployment: **Staging**
   - Description: "My first OTA update!"
6. Click **"Deploy"** or **"Publish"**

### Option B: Deploy via CLI (Faster)

**7.1 Make a Code Change**

Edit your React Native code

**7.2 Generate and Deploy in One Command**

```bash
# Generate bundle first
npx dota bundle --platform ios

# Deploy to staging
code-push-standalone release MyApp-iOS ./.dota/ios "1.0.0" \
  --deploymentName Staging \
  --description "My first OTA update!"
```

For Android:

```bash
npx dota bundle --platform android

code-push-standalone release MyApp-Android ./.dota/android "1.0.0" \
  --deploymentName Staging \
  --description "My first OTA update!"
```

:::tip Version Targeting
Use `"1.0.0"` for exact version or `"^1.0.0"` for all 1.x.x versions
:::

---

## Step 8: Test Your OTA Update

**8.1 Restart Your App**

Close and reopen your app (or restart it from your IDE)

**8.2 Watch for the Update**

- The app will check for updates on startup
- Download the update in the background
- Apply it on the next restart

**8.3 Verify the Update**

After the second restart, you should see your code changes!

**8.4 Monitor in Dashboard**

Go to the Web Panel and check:
- Deployment status
- Download progress
- Installation metrics

:::success First Update Deployed! 🎉
✅ Congratulations! You've successfully deployed your first OTA update!
:::

---

## Step 9: Deploy to Production (When Ready)

After testing in Staging, promote to Production:

### Via CLI:

```bash
code-push-standalone promote MyApp-iOS Staging Production
```

### Via Web Panel:

1. Go to your app's Staging deployment
2. Find the tested release
3. Click **"Promote to Production"**

---

## Troubleshooting

### App Not Receiving Updates

**Check:**
- ✅ App is in Release mode (not Debug)
- ✅ Deployment key is correct
- ✅ Server is running at `http://localhost:3010`
- ✅ App version matches target version
- ✅ Update is enabled (not disabled)

### Server Connection Issues

**Verify:**
```bash
# Check server is running
curl http://localhost:3010/health

# Check from your mobile device/emulator can reach it
# For iOS simulator/Android emulator, use localhost
# For physical devices, use your computer's IP address
```

### Bundle Generation Fails

**Solutions:**
- Ensure you're in your React Native project directory
- Check that `index.ts` or `index.js` exists
- Verify Node.js version is compatible
- Try clearing Metro cache: `npx react-native start --reset-cache`

### CLI Authentication Fails

**Check:**
- Access token is correct and not expired
- Server is running and accessible
- Token has the right permissions

---

## Quick Reference

### Useful Commands

```bash
# Check server health
curl http://localhost:3010/health

# Generate bundle
npx dota bundle --platform ios
npx dota bundle --platform android

# Deploy update
code-push-standalone release MyApp-iOS ./.dota/ios "1.0.0" -d Staging

# Check CLI authentication
code-push-standalone whoami

# View deployment history
code-push-standalone deployment history MyApp-iOS Staging

# Promote to production
code-push-standalone promote MyApp-iOS Staging Production
```

### Important URLs

- **DOTA Server**: http://localhost:3010
- **Web Panel**: http://localhost:5173
- **Server Health**: http://localhost:3010/health

---

## What's Next?

Now that you've sent your first OTA update, explore more capabilities:

### 🎯 Advanced Features

- **[Gradual Rollouts](/sdk/releasing-updates)** - Deploy to a percentage of users
- **[Mandatory Updates](/sdk/usage)** - Force critical updates
- **[Patch Bundles](/cli/release-management)** - Smaller differential updates
- **[Multi-Environment Setup](/sdk/usage)** - Separate staging and production

### 📚 Deep Dive

- **[SDK API Reference](/sdk/api-reference)** - Full API documentation
- **[Server Configuration](/server/configuration)** - Advanced server setup
- **[CLI Advanced Usage](/cli/release-management)** - Master the command line
- **[Debugging Guide](/sdk/debugging)** - Troubleshoot issues

### 🚀 Production Deployment

- **[Deploy Server to AWS](/server/deployment)** - Production-ready cloud deployment
- **[Deploy Server to Azure](/server/deployment)** - Azure cloud setup
- **[Production Best Practices](/sdk/advanced)** - Optimize for scale

---

## Success Checklist

Before moving to production, ensure:

- [ ] Server is deployed and accessible from the internet
- [ ] Web Panel is configured with proper OAuth
- [ ] App is released to App Store/Play Store with SDK integrated
- [ ] Deployment keys are embedded in the app
- [ ] CLI is installed and working
- [ ] You've successfully tested OTA updates in staging
- [ ] You understand rollback procedures
- [ ] Monitoring and analytics are set up

---

## Need Help?

- 📖 **Documentation**: Browse our comprehensive guides
- 🐛 **Issues**: [Report bugs on GitHub](https://github.com/ds-horizon/delivr-sdk-ota/issues)
- 💬 **Community**: Join our discussions
- 📧 **Support**: Contact the team

---

**Congratulations!** 🎉 You're now ready to ship faster with DOTA! Deploy updates instantly, roll out features gradually, and rollback with confidence.

