---
sidebar_position: 3
---

# iOS Setup

This guide will walk you through integrating the DOTA SDK into your React Native iOS application.

## Prerequisites

- Xcode 12 or higher
- CocoaPods installed
- DOTA SDK already added to your package.json

## Setup Steps

### Step 1: Install Pod Dependencies

Navigate to your iOS directory and install pods:

```bash
cd ios
pod install
```

### Step 2: Configure Podfile

Add the following line at the **top** of your `Podfile`:

```ruby
require_relative '../node_modules/@d11/dota/ios/scripts/dota_pod_helpers.rb'
```

:::caution Important
Make sure the path correctly points to your `node_modules` directory. Adjust if your project structure is different.
:::

### Step 3: Add Post Install Script

In the `post_install` block of your `Podfile`, add the DOTA post install script:

```ruby
post_install do |installer|
  # ... other post install code ...
  
  # Add the Dota post install script
  # Replace 'YourAppTargetName' with your app's target name
  dota_post_install(installer, 'YourAppTargetName', File.expand_path(__dir__))
end
```

Replace `'YourAppTargetName'` with your actual app target name (found in Xcode).

### Step 4: Install Pods

Run pod install to apply the changes:

```bash
pod install
```

This will add a new build phase named **"[Dota] Copy DOTA Bundle"** that automatically handles bundle generation and copying.

## Automated Bundle Generation

The setup above automatically configures your iOS project to:

1. Generate the JavaScript bundle during the build process
2. Copy the bundle and assets to `.dota/ios/` directory at your project root
3. Include the bundle in your app binary

The bundles will be generated in the following structure:
```
.dota/
└── ios/
    ├── main.jsbundle
    └── assets/
```

## Manual Bundle Generation (Optional)

If you need more control over bundle generation, you can use the CLI tool:

```bash
yarn dota bundle --platform ios
```

Available options:
- `--bundle-path <path>`: Directory to place the bundle in (default: ".dota")
- `--assets-path <path>`: Directory to place assets in (default: ".dota")
- `--sourcemap-path <path>`: Directory to place sourcemaps in (default: ".dota")
- `--make-sourcemap`: Generate sourcemap (default: false)
- `--entry-file <file>`: Entry file (default: "index.ts")
- `--dev <boolean>`: Development mode (default: "false")

## Verifying the Setup

1. Build your iOS app in Xcode
2. Check the build logs for the "[Dota] Copy DOTA Bundle" phase
3. Verify that `.dota/ios/` directory contains:
   - `main.jsbundle`
   - Assets directory (if your app has assets)

## Deployment Keys

After setting up the SDK, you'll need to configure your deployment keys. Get them from the DOTA Web Panel:

1. Create an app in the dashboard
2. Generate deployment keys (Staging/Production)
3. Add the keys to your app code (see [Usage Guide](/sdk/usage))

## Troubleshooting

### Build Phase Not Found

If the "[Dota] Copy DOTA Bundle" build phase doesn't appear:

1. Verify the `require_relative` path in Podfile is correct
2. Run `pod install` again
3. Clean build folder in Xcode (Cmd + Shift + K)

### Bundle Not Generated

If the bundle is not being generated:

1. Check build logs for errors
2. Verify Node.js is accessible in your build environment
3. Ensure the entry file exists (default: `index.ts` or `index.js`)

### Missing Assets

If assets are missing:

1. Check that asset paths in your code are correct
2. Verify assets are included in your React Native project
3. Review the build logs for asset copying errors

## Next Steps

- [Configure your app to use updates](/sdk/usage)
- [Learn about bundle generation](/sdk/bundle-generation)
- [Deploy your first update](/sdk/releasing-updates)

