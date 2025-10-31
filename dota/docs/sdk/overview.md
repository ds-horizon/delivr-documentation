---
sidebar_position: 1
---

# React Native SDK - Overview

React Native Module for OTA Updates. Instantly deliver JS and asset updates to your React Native apps.

## What is the DOTA SDK?

The DOTA SDK (Delivr Over-The-Air) is a React Native module that enables your mobile applications to receive over-the-air updates without requiring users to download a new version from the app store. This allows you to:

- Push bug fixes instantly to all users
- Deploy new features without app store approval delays
- Update JavaScript code and assets on-the-fly
- Implement gradual rollouts and A/B testing
- Rollback problematic updates quickly

## Key Features

- **Silent Updates**: Updates download in the background and apply on next app restart
- **Mandatory Updates**: Force users to install critical updates immediately
- **Flexible Update Policies**: Control when and how updates are checked and applied
- **Multiple Deployment Keys**: Support for staging and production environments
- **Hermes Support**: Optimized for React Native with Hermes engine
- **TypeScript Support**: Full TypeScript definitions included

## Installation

Add the SDK to your React Native app:

**Using Yarn:**
```bash
yarn add @d11/dota
```

**Using NPM:**
```bash
npm install @d11/dota
```

## Platform Setup

After installation, you need to configure the DOTA SDK for each platform you're targeting:

- [iOS Setup Guide](/sdk/ios-setup)
- [Android Setup Guide](/sdk/android-setup)

## Basic Usage

The simplest integration wraps your root component with the `codePush` higher-order component:

```javascript
import codePush from "@d11/dota";

function MyApp() {
  // Your app code
  return <View>...</View>;
}

export default codePush(MyApp);
```

By default, this configuration:
- Checks for updates on every app start
- Silently downloads available updates
- Installs updates on the next app restart
- Forces immediate installation for mandatory updates

## Update Policies

You can customize when updates are checked and applied:

```javascript
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default codePush(codePushOptions)(MyApp);
```

## Next Steps

1. [Install the SDK](/sdk/installation) in your app
2. [Configure iOS](/sdk/ios-setup) or [Android](/sdk/android-setup)
3. [Create JavaScript bundles](/sdk/bundle-generation)
4. [Learn about the API](/sdk/api-reference)
5. [Deploy your first update](/sdk/releasing-updates)

## Resources

- [GitHub Repository](https://github.com/ds-horizon/delivr-sdk-ota)
- [API Reference](/sdk/api-reference)
- [Troubleshooting Guide](/sdk/debugging)
- [Advanced Topics](/sdk/advanced)

