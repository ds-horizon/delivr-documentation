---
sidebar_position: 4
---

# Android Setup

This guide will walk you through integrating the DOTA SDK into your React Native Android application.

## Prerequisites

- Android Studio installed
- Android SDK with minimum API level 21
- DOTA SDK already added to your package.json

## Setup Steps

### Step 1: Configure Build Gradle

Add the following line to your `android/app/build.gradle` file:

```gradle
apply from: "../../node_modules/@d11/dota/android/codepush.gradle"
```

Add this line after the `apply plugin` lines but before the `android` block:

```gradle
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"

// Add this line
apply from: "../../node_modules/@d11/dota/android/codepush.gradle"

android {
    // ... rest of your config
}
```

### Step 2: Sync Gradle

Sync your Gradle files:

1. In Android Studio: **File → Sync Project with Gradle Files**
2. Or from command line:
   ```bash
   cd android
   ./gradlew clean
   ```

## Automated Bundle Generation

The setup above automatically configures your Android project to:

1. Generate the JavaScript bundle during the build process
2. Copy the bundle and assets to `.dota/android/` directory at your project root
3. Include the bundle in your APK/AAB

The bundles will be generated in the following structure:
```
.dota/
└── android/
    ├── index.android.bundle
    └── assets/
```

## Manual Bundle Generation (Optional)

If you need more control over bundle generation, you can use the CLI tool:

```bash
yarn dota bundle --platform android
```

Available options:
- `--bundle-path <path>`: Directory to place the bundle in (default: ".dota")
- `--assets-path <path>`: Directory to place assets in (default: ".dota")
- `--sourcemap-path <path>`: Directory to place sourcemaps in (default: ".dota")
- `--make-sourcemap`: Generate sourcemap (default: false)
- `--entry-file <file>`: Entry file (default: "index.ts")
- `--dev <boolean>`: Development mode (default: "false")

Example with sourcemaps:
```bash
yarn dota bundle --platform android --make-sourcemap
```

## Hermes Configuration

The bundle generation is optimized for React Native apps using Hermes. Ensure Hermes is enabled in your `android/app/build.gradle`:

```gradle
project.ext.react = [
    enableHermes: true,  // Make sure this is true
]
```

## Verifying the Setup

1. Build your Android app:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

2. Check the build logs for bundle generation messages

3. Verify that `.dota/android/` directory contains:
   - `index.android.bundle`
   - Assets directory (if your app has assets)

## Deployment Keys

After setting up the SDK, you'll need to configure your deployment keys. Get them from the DOTA Web Panel:

1. Create an app in the dashboard
2. Generate deployment keys (Staging/Production)
3. Add the keys to your app code (see [Usage Guide](/sdk/usage))

## ProGuard Configuration

If you're using ProGuard for release builds, ensure DOTA classes are not obfuscated. This is usually handled automatically, but if you encounter issues, add to your `proguard-rules.pro`:

```proguard
-keep class com.microsoft.codepush.** { *; }
-keep class com.d11.dota.** { *; }
```

## Troubleshooting

### Bundle Not Found

If the app can't find the bundle:

1. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleDebug
   ```

2. Verify the gradle script path is correct

3. Check that `.dota/android/` directory exists and contains the bundle

### Build Errors

If you encounter build errors:

1. Ensure your Node.js version is compatible (14+)
2. Clear Gradle cache:
   ```bash
   cd android
   ./gradlew clean
   rm -rf .gradle
   ```

3. Invalidate Android Studio caches: **File → Invalidate Caches / Restart**

### Missing Assets

If assets are missing in your app:

1. Check that assets are properly referenced in your React Native code
2. Verify assets are in the correct directory structure
3. Rebuild the bundle manually and check the output

### Hermes Issues

If you have issues with Hermes:

1. Verify Hermes is enabled in your gradle config
2. Check React Native version compatibility
3. Try regenerating the bundle

## Next Steps

- [Configure your app to use updates](/sdk/usage)
- [Learn about bundle generation](/sdk/bundle-generation)
- [Deploy your first update](/sdk/releasing-updates)

