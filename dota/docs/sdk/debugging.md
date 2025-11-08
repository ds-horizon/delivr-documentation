---
sidebar_position: 8
---

# Debugging

This guide helps you troubleshoot common DOTA SDK issues and see what's happening during the update lifecycle (checking, downloading, installing, activation).

## Quick checklist

- Confirm you're testing in Release (DOTA is disabled in Debug)
- Watch sync status logs and download progress
- Verify deployment key and target binary version
- Check network reachability and server URL
- Inspect pending/running update metadata

## Enable Diagnostic Logging

The SDK includes comprehensive diagnostic logging. The `sync` method provides detailed status updates throughout the update process.

### Basic Logging

```javascript
import codePush from "@d11/dota";

codePush.sync(
  {
    installMode: codePush.InstallMode.IMMEDIATE,
  },
  (status) => {
    console.log('CodePush Status:', status);
  },
  ({ receivedBytes, totalBytes }) => {
    console.log(`Downloaded ${receivedBytes} of ${totalBytes} bytes`);
  }
);
```

See: [API Reference → sync](/sdk/api-reference#sync) for usage and options.

### Understanding Status Codes

For the complete list and meanings, see [API Reference → Enums → SyncStatus](/sdk/api-reference#syncstatus).

| Status | Meaning | What to Check |
|--------|---------|---------------|
| `CHECKING_FOR_UPDATE` | Querying server for updates | Server reachability, deployment key |
| `UPDATE_AVAILABLE` | Update found | Target app version, rollout/disabled state |
| `AWAITING_USER_ACTION` | Waiting for user input (dialog) | `updateDialog` enabled, UI not blocked |
| `DOWNLOADING_PACKAGE` | Downloading update | Network connectivity, server availability |
| `DOWNLOAD_REQUEST_SUCCESS` | Download finished | Proceed to install logs |
| `UNZIPPED_SUCCESS` | Update unzipped | Device storage OK |
| `DECOMPRESSED_SUCCESS` | Update decompressed | Next step should be install |
| `INSTALLING_UPDATE` | Installing update | Disk space, permissions |
| `UPDATE_INSTALLED` | Successfully installed | Install mode setting |
| `UP_TO_DATE` | No updates available | Version compatibility, deployments |
| `UPDATE_IGNORED` | Optional update skipped by user | Dialog configuration, user choice |
| `UPDATE_IGNORED_ROLLBACK` | Ignored due to previous rollback | Investigate crash after prior update; `rollbackRetryOptions` |
| `PATCH_APPLIED_SUCCESS` | Patch bundle applied successfully | Patch baseline/diff integrity |
| `SYNC_IN_PROGRESS` | Another sync already running | Debounce duplicate `sync` calls |
| `UNKNOWN_ERROR` | An error occurred | Check error details |

## Common Issues

### 1. Updates Not Working in Debug Mode

:::danger Debug Mode Limitation
DOTA updates **DO NOT WORK** in Debug mode!
:::

**Why?** In Debug mode, React Native always downloads the JS bundle from the Metro packager, overriding any DOTA updates.

**Solution:**
- **iOS**: Build in Release scheme
  ```bash
  npx react-native run-ios --configuration Release
  ```
- **Android**: Build release variant
  ```bash
  cd android && ./gradlew assembleRelease
  ```

### 2. Deployment Key Not Found

**Symptom:** Status stays at `CHECKING_FOR_UPDATE` with no progress

**Possible Causes:**
- Deployment key not configured
- Incorrect deployment key
- Deployment key for wrong platform

**Solutions:**

1. Verify deployment key is set:
```javascript
import codePush from "@d11/dota";

const DEPLOYMENT_KEY = Platform.select({
  ios: 'YOUR_IOS_KEY',
  android: 'YOUR_ANDROID_KEY',
});

export default codePush({
  deploymentKey: DEPLOYMENT_KEY
})(MyApp);
```

2. Check deployment key in DOTA Web Panel
3. Ensure you're using the correct platform key

### 3. Cannot Reach Server

**Symptom:** Stuck at `CHECKING_FOR_UPDATE`

**Possible Causes:**
- Network connectivity issues
- Server is down
- Firewall blocking requests
- Wrong server URL

**Solutions:**

1. Test network connectivity:
```javascript
import NetInfo from '@react-native-community/netinfo';

NetInfo.fetch().then(state => {
  console.log('Connected:', state.isConnected);
  console.log('Internet reachable:', state.isInternetReachable);
});
```

2. Verify server URL in SDK configuration
3. Check server status
4. Review firewall/proxy settings

### 4. Update Available but Not Installing

**Symptom:** Status reaches `UPDATE_AVAILABLE` but doesn't progress

**Possible Causes:**
- Update is disabled
- Rollout percentage not reached
- Target version mismatch

**Solutions:**

1. Check if update is enabled in dashboard
2. Verify rollout percentage
3. Confirm app version matches target:
```javascript
import codePush from "@d11/dota";

codePush.getUpdateMetadata().then(update => {
  if (update) {
    console.log('Update details:', update);
  }
});
```

### 5. Download Fails

**Symptom:** Fails at `DOWNLOADING_PACKAGE`

**Possible Causes:**
- Network interruption
- Insufficient storage
- Bundle corruption
- Server issues

**Solutions:**

1. Check available storage:
```javascript
import { DeviceInfo } from 'react-native-device-info';

DeviceInfo.getFreeDiskStorage().then(freeSpace => {
  console.log('Free space:', freeSpace);
});
```

2. Retry download
3. Check bundle integrity on server
4. Monitor download progress

### 6. Installation Fails

**Symptom:** Fails at `INSTALLING_UPDATE`

**Possible Causes:**
- Corrupted bundle
- Incompatible native modules
- Permission issues

**Solutions:**

1. Check native module compatibility
2. Verify bundle was generated correctly
3. Try regenerating and re-uploading bundle
4. Check device logs for errors

## Debugging Workflow

### Step 1: Enable Detailed Logging

```javascript
import codePush from "@d11/dota";

function MyApp() {
  React.useEffect(() => {
    codePush.sync(
      {
        updateDialog: true, // Show update dialog
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      (status) => {
        console.log('[CodePush] Status:', getStatusName(status));
      },
      ({ receivedBytes, totalBytes }) => {
        const progress = (receivedBytes / totalBytes) * 100;
        console.log(`[CodePush] Download: ${progress.toFixed(1)}%`);
      },
      (error) => {
        console.error('[CodePush] Error:', error);
      }
    );
  }, []);

  return <View>...</View>;
}

function getStatusName(status) {
  const statuses = {
    [codePush.SyncStatus.CHECKING_FOR_UPDATE]: 'CHECKING_FOR_UPDATE',
    [codePush.SyncStatus.UPDATE_INSTALLED]: 'UPDATE_INSTALLED',
    [codePush.SyncStatus.UPDATE_AVAILABLE]: 'UPDATE_AVAILABLE',
    [codePush.SyncStatus.DOWNLOADING_PACKAGE]: 'DOWNLOADING_PACKAGE',
    [codePush.SyncStatus.INSTALLING_UPDATE]: 'INSTALLING_UPDATE',
    [codePush.SyncStatus.UP_TO_DATE]: 'UP_TO_DATE',
    [codePush.SyncStatus.UNKNOWN_ERROR]: 'UNKNOWN_ERROR',
  };
  return statuses[status] || 'UNKNOWN';
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL
})(MyApp);
```

### Step 2: Check Current Status

```javascript
// Get current package info
codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)
  .then(update => {
    console.log('Current update:', update);
  });

// Get pending update info
codePush.getUpdateMetadata(codePush.UpdateState.PENDING)
  .then(update => {
    console.log('Pending update:', update);
  });
```

### Step 3: Review Native Logs

**iOS (Xcode):**
1. Open your project in Xcode
2. Run the app
3. Check Console output for `[CodePush]` logs

**Android (Logcat):**
```bash
adb logcat | grep CodePush
```

### Step 4: Verify Configuration

Check the essentials:

- Deployment key:
  - Confirm correct key is bundled for the platform (iOS `Info.plist`, Android `strings.xml`)
  - If overriding via JS `deploymentKey`, log it where you set it
- Target binary version: Ensure the app version matches the release target
- Current update metadata:

```javascript
codePush.getUpdateMetadata().then(update => {
  console.log('Running update label:', update?.label || 'None');
  console.log('Running package size:', update?.packageSize || 0);
});
```

## Testing Checklist

Before reporting a bug, verify:

- [ ] App is NOT in Debug mode
- [ ] Deployment key is configured correctly
- [ ] Server is accessible
- [ ] App version matches target version
- [ ] Update is enabled in dashboard
- [ ] Rollout percentage includes your device
- [ ] Network connectivity is stable
- [ ] Sufficient device storage
- [ ] Bundle was generated correctly

## Key Status Flow

Understanding the normal flow helps identify where issues occur:

```
CHECKING_FOR_UPDATE
    ↓
UPDATE_AVAILABLE (or UP_TO_DATE)
    ↓
DOWNLOADING_PACKAGE
    ↓
INSTALLING_UPDATE
    ↓
UPDATE_INSTALLED (or shows immediately based on installMode)
```

If the flow stops or errors at any point, focus debugging on that stage.

## Performance Debugging

### Monitor Update Performance

```javascript
const startTime = Date.now();

codePush.sync(
  { installMode: codePush.InstallMode.IMMEDIATE },
  (status) => {
    if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
      const duration = Date.now() - startTime;
      console.log(`Update completed in ${duration}ms`);
    }
  }
);
```

### Track Bundle Size

Check the size of your updates:

```javascript
codePush.getUpdateMetadata().then(update => {
  if (update) {
    console.log('Package size:', update.packageSize);
  }
});
```

## Getting Help

If you're still stuck:

1. **Check the logs**: Enable detailed logging and review output
2. **Search issues**: Look for similar issues on GitHub
3. **Provide details**: When reporting issues, include:
   - Platform (iOS/Android) and version
   - React Native version
   - SDK version
   - Detailed logs
   - Steps to reproduce
4. **Create a minimal reproduction**: Simplify to the smallest possible example

## Next Steps

- [API Reference](/dota/sdk/api-reference)
- [Options](/dota/sdk/options)
- [CLI release management](/dota/cli/release-management)

