---
sidebar_position: 2
---

# Installation

## Prerequisites

Before installing the DOTA SDK, ensure you have:

- React Native 0.60 or higher
- Node.js 14 or higher
- Xcode 12+ (for iOS)
- Android Studio with SDK 21+ (for Android)

## Adding the Package

Choose your preferred package manager:

### Using Yarn

```bash
yarn add @d11/dota
```

### Using NPM

```bash
npm install @d11/dota
```

## Platform-Specific Setup

The integration experience differs for iOS and Android. Follow the setup guides for your target platforms:

### iOS Setup

If you're targeting iOS, continue with the [iOS Setup Guide](/sdk/ios-setup).

### Android Setup

If you're targeting Android, continue with the [Android Setup Guide](/sdk/android-setup).

### Multi-Platform Apps

If you're targeting both iOS and Android:

1. It is recommended to create **separate DOTA applications** for each platform in the DOTA dashboard
2. Each platform will have its own deployment keys
3. This allows you to manage updates independently for iOS and Android

## Verification

After installation, verify the package was added correctly:

```bash
# Check package.json
grep "@d11/dota" package.json

# Reinstall node modules if needed
rm -rf node_modules && npm install
```

## Next Steps

After installing the SDK:

1. Complete the platform-specific setup for [iOS](/sdk/ios-setup) and/or [Android](/sdk/android-setup)
2. Add the necessary code to [integrate updates](/sdk/usage) into your app
3. Learn how to [generate bundles](/sdk/bundle-generation) for deployment

## Troubleshooting

### Package Not Found

If you get a "package not found" error:

1. Verify you have access to the npm registry
2. Check your npm credentials
3. Ensure you're using the correct package name: `@d11/dota`

### Version Conflicts

If you encounter version conflicts:

1. Check your React Native version compatibility
2. Try clearing npm/yarn cache:
   ```bash
   npm cache clean --force
   # or
   yarn cache clean
   ```

### Native Module Linking Issues

For React Native < 0.60, you may need to manually link:

```bash
react-native link @d11/dota
```

However, React Native 0.60+ uses autolinking and this step is not required.

