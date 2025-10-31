---
sidebar_position: 5
---

# Usage

Once you've installed the SDK and completed platform-specific setup, you need to add code to control how your app checks for and applies updates.

## Basic Integration

The simplest way to get started is to wrap your root component with the `codePush` higher-order component:

```javascript
import codePush from "@d11/dota";

function MyApp() {
  return (
    <View>
      <Text>My Application</Text>
    </View>
  );
}

export default codePush(MyApp);
```

### Default Behavior

With this basic setup, DOTA will:

- ✅ Check for updates on every app start
- ✅ Silently download updates in the background
- ✅ Install updates on the next app restart
- ✅ Force immediate installation for mandatory updates

This provides the least invasive experience for your end users while ensuring they receive updates quickly.

## Update Check Policies

You can control **when** your app checks for updates:

### On App Start (Default)

```javascript
import codePush from "@d11/dota";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START
};

export default codePush(codePushOptions)(MyApp);
```

Checks for updates every time the app starts.

### On App Resume

```javascript
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

export default codePush(codePushOptions)(MyApp);
```

Checks for updates when the app resumes from background.

### Manual Check

```javascript
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL
};

export default codePush(codePushOptions)(MyApp);
```

Only checks for updates when you explicitly call `codePush.sync()`.

## Install Modes

Control **how** updates are installed:

### Immediate

```javascript
const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE
};

export default codePush(codePushOptions)(MyApp);
```

Installs and applies updates immediately after download.

### On Next Restart (Default)

```javascript
const codePushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_RESTART
};

export default codePush(codePushOptions)(MyApp);
```

Installs update silently, applies on next app restart.

### On Next Resume

```javascript
const codePushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_RESUME
};

export default codePush(codePushOptions)(MyApp);
```

Installs update silently, applies when app next resumes from background.

### On Next Suspend

```javascript
const codePushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
  minimumBackgroundDuration: 60 // seconds
};

export default codePush(codePushOptions)(MyApp);
```

Installs when app is suspended for at least `minimumBackgroundDuration` seconds.

## Deployment Keys

Configure your deployment keys to connect your app to the DOTA server:

```javascript
import codePush from "@d11/dota";
import { Platform } from "react-native";

// Different keys for different platforms
const DEPLOYMENT_KEY = Platform.select({
  ios: 'YOUR_IOS_DEPLOYMENT_KEY',
  android: 'YOUR_ANDROID_DEPLOYMENT_KEY',
});

const codePushOptions = {
  deploymentKey: DEPLOYMENT_KEY,
};

export default codePush(codePushOptions)(MyApp);
```

### Environment-Specific Keys

Use different keys for staging and production:

```javascript
const DEPLOYMENT_KEY = __DEV__
  ? 'STAGING_DEPLOYMENT_KEY'  // For development builds
  : 'PRODUCTION_DEPLOYMENT_KEY';  // For release builds

const codePushOptions = {
  deploymentKey: DEPLOYMENT_KEY,
};

export default codePush(codePushOptions)(MyApp);
```

## Manual Sync

For more control, you can manually trigger update checks:

```javascript
import React, { useEffect } from 'react';
import codePush from "@d11/dota";

function MyApp() {
  useEffect(() => {
    // Check for updates when component mounts
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  return <View>...</View>;
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL
})(MyApp);
```

## Update with UI Feedback

Provide visual feedback during the update process:

```javascript
import React, { useState, useEffect } from 'react';
import codePush from "@d11/dota";

function MyApp() {
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      (status) => {
        switch(status) {
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            setSyncMessage("Checking for updates...");
            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            setSyncMessage("Downloading update...");
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            setSyncMessage("Installing update...");
            break;
          case codePush.SyncStatus.UP_TO_DATE:
            setSyncMessage("App is up to date!");
            break;
        }
      }
    );
  }, []);

  return (
    <View>
      <Text>{syncMessage}</Text>
      {/* Rest of your app */}
    </View>
  );
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL
})(MyApp);
```

## Advanced Configuration

Combine multiple options for complete control:

```javascript
const codePushOptions = {
  // Deployment configuration
  deploymentKey: 'YOUR_DEPLOYMENT_KEY',
  
  // Update check policy
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  
  // Install policy
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  
  // Mandatory update handling
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  
  // Rollback on update failure
  rollbackRetryOptions: {
    delayInHours: 24,
    maxRetryAttempts: 2,
  },
};

export default codePush(codePushOptions)(MyApp);
```

## Important Notes

:::caution Debug Mode
DOTA updates do NOT work in Debug mode. In Debug mode, React Native always downloads the JS bundle from the packager, so bundles downloaded by DOTA don't apply.

Always test DOTA updates in Release or other non-Debug modes.
:::

:::tip Mandatory Updates
When you mark an update as mandatory in the DOTA dashboard:
- It will be installed immediately regardless of your `installMode` setting
- Users cannot skip or postpone mandatory updates
- Use this for critical bug fixes or security updates
:::

## Next Steps

- [Learn how to generate bundles](/sdk/bundle-generation)
- [Deploy your first update](/sdk/releasing-updates)
- [Explore the full API](/sdk/api-reference)
- [Troubleshooting guide](/sdk/debugging)

