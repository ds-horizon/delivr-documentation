---
sidebar_position: 6
sidebar_label: Options
---

# Options

Once you've installed the SDK and completed platform-specific setup, this guide shows how to configure when updates are checked and how they are applied.

What you'll find here:
- Pick an update check policy (when to check)
- Choose an install mode (when to apply)
- Configure deployment keys (which app/deployment to target)
- For functions, callbacks, package objects, events, and enums, see the [API Reference](/dota/sdk/api-reference)

Recommended defaults:

```javascript
import codePush from "@d11/dota";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START, // check every time app starts
  installMode: codePush.InstallMode.ON_NEXT_RESTART,     // apply on next restart
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,   // apply mandatory updates immediately
};

export default codePush(codePushOptions)(MyApp);
```

## Update Check Policies

You can control **when** your app checks for updates. Use the `checkFrequency` option and pick one of these values:

```javascript
import codePush from "@d11/dota";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START, // or ON_APP_RESUME or MANUAL
};

export default codePush(codePushOptions)(MyApp);
```

- **ON_APP_START** (default): check every time the app starts
- **ON_APP_RESUME**: check when the app returns to foreground
- **MANUAL**: never auto-check; call `codePush.sync()` yourself (see Manual Sync below)

## Install Modes

Control **when** an installed update is applied with `installMode`:

- **IMMEDIATE**: install and restart the app immediately.
- **ON_NEXT_RESTART** (default): install now, apply on the next app restart. No forced restart.
- **ON_NEXT_RESUME**: install now, apply the next time the app resumes from background. Good for non‑disruptive updates.
- **ON_NEXT_SUSPEND**: install while in background, but only after the app has been suspended for at least `minimumBackgroundDuration` seconds.

Example:

```javascript
const codePushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  // Only used with ON_NEXT_SUSPEND
  minimumBackgroundDuration: 60, // seconds
};

export default codePush(codePushOptions)(MyApp);
```

## Deployment Keys

By default, the deployment key is read from native config (iOS `Info.plist`, Android `strings.xml`).
Use the `deploymentKey` option when you need to override it from JS (for example, to target a specific platform/environment at runtime).

### Targeting different platforms

Provide separate keys for iOS and Android builds:

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

## Mandatory Install Mode

When an update is marked mandatory, `mandatoryInstallMode` controls when it applies (default: `IMMEDIATE`).

Values: same as Install Mode — see [Install Modes](#install-modes).

```javascript
export default codePush({
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
})(MyApp);
```

:::info Note
To mark an update as mandatory when releasing, see [CLI Release Management → Optional Parameters](/dota/cli/release-management#optional-parameters).
:::

:::tip Mandatory Updates
When you mark an update as mandatory in the DOTA dashboard:
- It will be installed immediately regardless of your `installMode` setting
- Users cannot skip or postpone mandatory updates
- Use this for critical bug fixes or security updates
:::

## Update Dialog

Show an interactive prompt when an update is available. Set `updateDialog: true` for default copy, or pass an object to override specific strings.

```javascript
// Enable defaults
export default codePush({ updateDialog: true })(MyApp);

// Customize copy and apply immediately if accepted
export default codePush({
  updateDialog: {
    title: 'Update available',
    optionalUpdateMessage: 'A new version is ready. Install now?',
    optionalInstallButtonLabel: 'Install',
    optionalIgnoreButtonLabel: 'Later',
    appendReleaseDescription: true,
    descriptionPrefix: '\n\nWhat changed:\n',
  },
  installMode: codePush.InstallMode.IMMEDIATE,
})(MyApp);
```

<div style={{ textAlign: 'center' }}>
  <img src={require('./img/update-dialog.png').default} alt="Update dialog" width="200" />
  <div style={{ fontSize: '0.9rem', marginTop: 8, color: 'var(--ifm-color-emphasis-700)' }}>
    Update dialog
  </div>
</div>

Options (with defaults):

- **appendReleaseDescription** (boolean): Append release description. Default: `false`.
- **descriptionPrefix** (string): Text before description. Default: `" Description: "`.
- **mandatoryContinueButtonLabel** (string): Button to install mandatory update. Default: `"Continue"`.
- **mandatoryUpdateMessage** (string): Body for mandatory updates. Default: `"An update is available that must be installed."`.
- **optionalIgnoreButtonLabel** (string): Button to ignore optional update. Default: `"Ignore"`.
- **optionalInstallButtonLabel** (string): Button to install optional update. Default: `"Install"`.
- **optionalUpdateMessage** (string): Body for optional updates. Default: `"An update is available. Would you like to install it?"`.
- **title** (string): Dialog title. Default: `"Update available"`.

## Rollback Retry

Retry previously rolled‑back updates automatically. Defaults to disabled (`null`); set a truthy value to enable (pass an object to override defaults).

Options (defaults):

- **delayInHours** (number): Minimum wait after the latest rollback before retrying the same package. Default: `24`.
- **maxRetryAttempts** (number): Maximum number of retries before stopping (≥ 1). Default: `1`.

Example:

```javascript
export default codePush({
  rollbackRetryOptions: { delayInHours: 24, maxRetryAttempts: 1 },
})(MyApp);
```

## Important Notes

:::caution Debug Mode
DOTA updates do NOT work in Debug mode. In Debug mode, React Native always downloads the JS bundle from the packager, so bundles downloaded by DOTA don't apply.

Always test DOTA updates in Release or other non-Debug modes.
:::

