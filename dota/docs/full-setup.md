---
sidebar_position: 2
id: full-setup
title: Full Setup Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

## Step 1: Set Up DOTA Server

The server is the heart of the DOTA ecosystem. Let's get it running first.

### Prerequisites

- Docker and Docker Compose [installed](https://docs.docker.com/compose/install/)
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

[📖 Detailed Server Setup Guide →](/dota/server/installation)

---

## Step 2: Set Up Web Panel

The Web Panel provides a visual interface for managing your apps and deployments.

### Prerequisites

- Node.js 18.18.0 (exact version)
- pnpm 10.17.0+
- DOTA Server running (from [Step 1](#step-1-set-up-dota-server))

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

[📖 Detailed Web Panel Setup Guide →](/dota/web-panel/installation)

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

<Tabs groupId="pkg-manager">
  <TabItem value="npm" label="npm" default>

```bash
npm install @d11/dota
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn add @d11/dota
```

  </TabItem>
</Tabs>

### 4.2 Platform-Specific Configuration

<Tabs groupId="platform">
  <TabItem value="android" label="Android" default>

#### Android Setup

In order to integrate DOTA into your Android project, perform the following steps:

1. Edit `android/settings.gradle` and add the DOTA module:

```gradle
// ...
include ':app', ':d11_dota'
project(':d11_dota').projectDir = new File(rootProject.projectDir, '../node_modules/@d11/dota/android/app')
```

2. In `android/app/build.gradle`, add the dependency:

```gradle
dependencies {
    // ...
    implementation project(':d11_dota')
    // ...
}
```

3. In `android/app/build.gradle`, apply the DOTA build tasks at the end of the file:

```gradle
// ...
apply from: "../../node_modules/@d11/dota/android/codepush.gradle"
// ...
```

4. Update `MainApplication` to use DOTA:

<Tabs groupId="android-language">
  <TabItem value="kotlin" label="RN 0.73+ (Kotlin)" default>

```kotlin
// 1. Import the plugin class.
import com.microsoft.codepush.react.CodePush

class MainApplication : Application(), ReactApplication {
  override val reactNativeHost: ReactNativeHost =
    object : DefaultReactNativeHost(this) {
      // ...

      // 2. Add DOTA package for manual linking
      add(
        CodePush.getInstance(
          resources.getString(R.string.CodePushDeploymentKey),
          applicationContext,
          BuildConfig.DEBUG
        )
      )

      // 3. Let DOTA determine the JS bundle location on each start
      override fun getJSBundleFile(): String {
        return CodePush.getJSBundleFile()
      }
    }
}
```

  </TabItem>
  <TabItem value="java" label="RN 0.72 and below (Java)">

```java
// 1. Import the plugin class.
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    // ...

    // 2. Add DOTA package for manual linking
    packages.add(CodePush.getInstance(
      getResources().getString(R.string.CodePushDeploymentKey),
      getApplicationContext(),
      BuildConfig.DEBUG
    ));

    // 3. Let DOTA determine the JS bundle location on each start
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
  };
}
```

  </TabItem>
</Tabs>

5. Add the deployment key (copied at [step 3](#step-3-create-your-app-and-generate-deployment-keys)) and server URL to `strings.xml`:

```xml
<resources>
    <!-- ... -->
    <string moduleConfig="true" name="CodePushDeploymentKey">DeploymentKey</string>
    <string moduleConfig="true" name="CodePushServerUrl">https://dota-sdk.delivr.live/</string>
</resources>
```

6. Disable autolinking for `@d11/dota` by creating `react-native.config.js` at the app root:

```javascript
module.exports = {
  dependencies: {
    '@d11/dota': {
      platforms: {
        android: null,
      },
    },
  },
};
```

  </TabItem>
  <TabItem value="ios" label="iOS">

#### iOS Setup

Once you've added the DOTA plugin, integrate it into your Xcode project.

<Tabs groupId="ios-language">
  <TabItem value="objc" label="Objective‑C" default>

1. Install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

2. In `AppDelegate.m`, import DOTA headers:

```objectivec
#import <CodePush/CodePush.h>
```

3. Find the production JS source URL and replace it with DOTA:

```objectivec
return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

→ Replace with:

```objectivec
return [CodePush bundleURL];
```

4. Use DOTA only for release builds:

```objectivec
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}
```

5. Add deployment key (copied at [step 3](#step-3-create-your-app-and-generate-deployment-keys)) and server URL to `Info.plist`:

```xml
<key>CodePushServerURL</key>
<string>server-url</string>
<key>CodePushDeploymentKey</key>
<string>deployment-key</string>
```

  </TabItem>
  <TabItem value="swift" label="Swift">

1. Install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

2. In `AppDelegate.swift`, import CodePush:

```swift
import CodePush
```

3. Replace the production JS source URL with DOTA:

```swift
Bundle.main.url(forResource: "main", withExtension: "jsbundle")
```

→ Replace with:

```swift
return CodePush.bundleURL()
```

4. Use DOTA only for release builds:

```swift
override func bundleURL() -> URL! {
  #if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
  #else
    // Default behavior assumes "main.jsbundle"
    return CodePush.bundleURL()
    // If you embedded a differently named file:
    // return CodePush.bundleURL(forResource: "mybundle")
    // return CodePush.bundleURL(forResource: "mybundle", withExtension: "jsbundle")
  #endif
}
```

5. Add deployment key and server URL to `Info.plist`:

```xml
<key>CodePushServerURL</key>
<string>https://dota-sdk.delivr.live/</string>
<key>CodePushDeploymentKey</key>
<string>deployment-key</string>
```

  </TabItem>
</Tabs>

  </TabItem>
</Tabs>

### 4.3 Integrate DOTA in Your App Code

**Open your root component (usually `App.tsx` or `App.js`):**

```javascript
import codePush from "@d11/dota";
import { Platform } from "react-native";

function App() {
  // Your app code
  return (
    <View>
      <Text>My App</Text>
    </View>
  );
}

// Wrap your app with codePush
export default codePush(App);
```

### 4.4 Build Your App

:::caution Important
DOTA updates don't work in Debug mode. Build in Release mode to test.
:::

<Tabs groupId="platform-run">
  <TabItem value="android" label="Android" default>

```bash
yarn android --mode=Release
```

  </TabItem>
    <TabItem value="ios" label="iOS">

```bash
yarn ios --mode=Release
```

  </TabItem>
</Tabs>

### 4.5 Release to App Store

Build your app for production and release it to the App Store/Play Store with the DOTA SDK and deployment keys embedded.

:::success SDK Integrated
✅ Your app is now ready to receive OTA updates!
:::

[📖 Detailed SDK Setup Guide →](/dota/sdk/installation)

---

## Step 5: Generate Your JavaScript Bundle

Before you can send an update, you need to create a JavaScript bundle.

### 5.1 Generate Bundle

DOTA provides a way to copy the exact bundle created during build process to certain path for later use. Follow the platform specific setup and just create a Release build.

<Tabs groupId="platform-auto">
  <TabItem value="android" label="Android" default>

Add to `android/app/build.gradle`:

```gradle
apply from: "../../node_modules/@d11/dota/android/codepush.gradle"
```

  </TabItem>
  <TabItem value="ios" label="iOS">

In your `Podfile`:

```ruby
# Import at the top
require_relative '../node_modules/@d11/dota/ios/scripts/dota_pod_helpers.rb'

# Include in the post_install block
post_install do |installer|
  dota_post_install(installer, 'YourAppTarget', File.expand_path(__dir__))
end
```
Then run:

```bash
cd ios && pod install
```

  </TabItem>
</Tabs>

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

:::success Bundle Ready to Released
✅ Our Bundle and Assets is now ready to be released over-the-air.
:::


[📖 Detailed Bundle Generation Guide →](/dota/sdk/bundle-generation)

---

## Step 6: Install and Configure DOTA CLI

The CLI allows you to deploy updates from your terminal or CI/CD pipeline.

### 6.1 Install CLI

<Tabs groupId="pm">
  <TabItem value="yarn" label="yarn" default>

```bash
yarn add --dev @d11/delivr-cli
```

  </TabItem>
  <TabItem value="npm" label="npm">

```bash
npm install --save-dev @d11/delivr-cli
```

  </TabItem>
</Tabs>

### 6.2 Generate Access Token

1. Go to your Web Panel at `http://localhost:5173`
2. Navigate to **Profile Icon** -> **Token List**
3. Click on **Create Token**
4. Enter a name: `CLI Access`
5. Select access level: **All**
6. Click **"Create"**
7. **Copy the token immediately** (you won't see it again!)

[📖 Detailed Guide on Managing Tokens](/dota/web-panel/action-and-workflows#create-and-manage-api-tokens)

### 6.3 Authenticate CLI

```bash
yarn code-push-standalone login --accessKey YOUR_ACCESS_TOKEN <server-url>
```

Verify authentication:

```bash
yarn code-push-standalone whoami
```

:::success CLI Ready
✅ CLI is installed and authenticated!
:::

[📖 Detailed CLI Setup Guide →](/dota/cli/installation)

---

## Step 7: Deploy Your First OTA Update! 🚀

Now comes the exciting part - deploying your first update!

### Option A: Deploy via Web Panel

**7.1 Make a Code Change**

Edit your React Native code (change some text, colors, etc.)

**7.2 Generate Bundle**

Re-build the app in release mode. This will copy the bundle in `.dota/<platform>` directory.

<Tabs groupId="platform-run">
  <TabItem value="android" label="Android">

```bash
yarn android --mode=Release
```

  </TabItem>
    <TabItem value="ios" label="iOS">

```bash
yarn ios --mode=Release
```

  </TabItem>
</Tabs>

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

[📖 Detailed Deployment Guide via Panel →](/dota/web-panel/action-and-workflows#deploy-updates)

### Option B: Deploy via CLI (Faster)

**7.1 Make a Code Change**

Edit your React Native code

**7.2 Generate Bundle and Deploy**

Re-build the app in release mode.

<Tabs groupId="platform-run">
  <TabItem value="android" label="Android">

```bash
yarn android --mode=Release

yarn code-push-standalone release MyApp-Android ./.dota/android "1.0.0" \
  --deploymentName Staging \
  --description "My first OTA update!"
```

  </TabItem>
    <TabItem value="ios" label="iOS">

```bash
yarn ios --mode=Release

yarn code-push-standalone release MyApp-iOS ./.dota/ios "1.0.0" \
  --deploymentName Staging \
  --description "My first OTA update!"
```

  </TabItem>
</Tabs>

:::tip Version Targeting
Use `"1.0.0"` for exact version or `"^1.0.0"` for all 1.x.x versions
:::

---

## Step 8: Test Your OTA Update

**8.1 Restart Your App**

Close and reopen your app (or restart it from your IDE). Make sure you rebuild your app with your changes reverted back to see new bundle impact.

**8.2 Watch for the Update**

- The app will check for updates on startup
- Download the update in the background
- Apply it on the next restart

**8.3 Verify the Update**

After the second restart, you should see your code changes!

Use `codePush.sync` to observe bundle status events (see [API Reference → sync](/dota/sdk/api-reference#sync)):

```javascript
codePush.sync(
  {},
  (status) => {
    switch (status) {
      case codePush.SyncStatus.DOWNLOAD_REQUEST_SUCCESS:
        // Downloaded successfully
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // Update installed; activation depends on installMode
        break;
    }
  }
);
```

For the full list of statuses, see [SyncStatus](/dota/sdk/api-reference#syncstatus).

**8.4 Monitor in Dashboard**

Go to the Web Panel and check:
- Deployment status
- Download progress
- Installation metrics

:::success First Update Deployed! 🎉
✅ Congratulations! You've successfully deployed your first OTA update!

Checkout the [Patch Bundle Guide](/dota/patch-update-guide) to ship more lightweight OTA updates.
:::

---

## Step 9: Deploy to Production (When Ready)

After testing in Staging, promote to Production:

### Via CLI:

```bash
yarn code-push-standalone promote MyApp-iOS Staging Production
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

# If Network Request failing try reversing port
adb reverse tcp:3010 tcp:3010

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

## What's Next?

Now that you've sent your first OTA update, explore more capabilities:

### 🎯 Advanced Features

- **[Gradual Rollouts](/dota/cli/release-management#gradual-rollout)** - Deploy to a percentage of users
- **[Mandatory Updates](/dota/cli/release-management#mandatory-critical-update)** - Force critical updates
- **[Patch Bundles](/dota/cli/release-management#patch-bundle-releases)** - Smaller differential updates

### 📚 Deep Dive

- **[SDK API Reference](/dota/sdk/api-reference)** - Full API documentation
- **[Ship Your First Patch Bundle](/dota/patch-update-guide)** - End-to-end patch release
- **[Server Configuration](/dota/server/installation)** - Advanced server setup
- **[CLI Advanced Usage](/dota/cli/release-management)** - Master the command line
- **[Debugging Guide](/dota/sdk/debugging)** - Troubleshoot issues

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

**Congratulations!** 🎉 You're now ready to ship faster with DOTA! Deploy updates instantly, roll out features gradually, and rollback with confidence.

