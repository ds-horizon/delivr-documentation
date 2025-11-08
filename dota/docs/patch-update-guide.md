---
sidebar_position: 3
id: patch-update-guide
title: Ship Your First Patch Bundle
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ship Your First Patch Bundle

This guide will walk you through creating and deploying your first **patch update** (differential update). Patch updates only send the differences between two bundles, resulting in significantly smaller download sizes and faster updates for your users.

:::tip Estimated Time
⏱️ **15-20 minutes** (assumes you already have [DOTA set up](/dota/full-setup))
:::

---

## 🎯 What You'll Accomplish

By the end of this guide, you will:

- ✅ Understand what patch updates are and when to use them
- ✅ Generate a patch bundle from two versions
- ✅ Deploy the patch update via CLI
- ✅ Monitor the patch deployment
- ✅ Understand the benefits and size savings

---

## What is a Patch Update?

A **patch update** (also called a differential update) contains only the **differences** between two bundle versions, rather than the entire bundle.

### Size Comparison Example

```
Full Bundle Update:    23.1 MB → 8.14 MB
Patch Bundle Update:   23.1 MB → 2.3 MB (90% smaller🔥)
```

### When to Use Patch Updates

✅ **Use Patch Updates When:**
- Making small code changes or bug fixes
- Updating a few components
- Minor feature additions
- Optimizing download times and bandwidth

❌ **Use Full Updates When:**
- Major refactoring or restructuring
- Significant feature releases
- First release to a deployment
- No previous bundle available

---

## Prerequisites

Before starting, ensure you have:

- ✅ DOTA Server running
- ✅ CLI installed and authenticated
- ✅ Your React Native app with DOTA SDK integrated (`@d11/dota >= v1.1.0`)
- ✅ At least one previous release deployed (the "old" bundle)
- ✅ Made code changes for the new version

:::info Already Set Up?
If you haven't completed the initial setup, follow the [Full Setup Guide](/dota/full-setup) first.
:::

---

## Step 1: Save Your Current Bundle (Old Version)

Before making changes, you need to save your current bundle as the "old" version.

**1.1 Prepare the current (base) bundle**

If you completed [bundle setup](/dota/full-setup#step-5-generate-your-javascript-bundle) in the [Full Setup Guide](/dota/full-setup), each Release build copies the currently shipped bundle to the `.dota/<platform>` folder. This becomes the base for generating your patch.

**1.2 Create a Backup Directory**

```bash
mkdir -p .dota-versions
```

**1.3 Copy Current Bundle as "Old Version"**

<Tabs groupId="platform-copy">
  <TabItem value="ios" label="iOS" default>

```bash
cp -r .dota/ios .dota-versions/v1.0.0-ios
```

  </TabItem>
  <TabItem value="android" label="Android">

```bash
cp -r .dota/android .dota-versions/v1.0.0-android
```

  </TabItem>
</Tabs>

:::tip Version Naming
Use semantic versioning in your backup folder names (e.g., `v1.0.0`, `v1.1.0`) to keep track easily.
:::

---

## Step 2: Make Your Code Changes

Now make your updates to the React Native code.

**2.1 Edit Your Code**

Make your desired changes, for example:

```javascript
// Before
<Text>Welcome to My App</Text>

// After
<Text>Welcome to My App - Now with awesome updates!</Text>
```

**2.2 Test Your Changes**

Run your app in Release mode to verify:

<Tabs groupId="platform-run">
  <TabItem value="ios" label="iOS" default>

```bash
yarn ios --mode=Release
```

  </TabItem>
  <TabItem value="android" label="Android">

```bash
yarn android --mode=Release
```

  </TabItem>
</Tabs>

---

## Step 3: Generate New Bundle (After Changes)

New bundle will automatically be updated in the respective platform directory `.dota/ios/` (iOS) and `.dota/android/` (Android).

:::tip Smaller Patches
Enable [Base Bytecode Optimization](/dota/sdk/base-bytecode-optimization) before generating the new bundle to reduce patch size further.
:::

---

## Step 4: Create the Patch Bundle

Now create the patch that contains only the differences.

### 4.1 Use CLI to Create Patch

<Tabs groupId="platform-create-patch">
  <TabItem value="ios" label="iOS" default>

```bash
yarn code-push-standalone create-patch \
  ./.dota-versions/v1.0.0-ios \
  ./.dota/ios \
  ./.dota/patches/ios
```

  </TabItem>
  <TabItem value="android" label="Android">

```bash
yarn code-push-standalone create-patch \
  ./.dota-versions/v1.0.0-android \
  ./.dota/android \
  ./.dota/patches/android
```

  </TabItem>
</Tabs>

**Command Breakdown**

- **First argument**: Path to old bundle (before changes)
- **Second argument**: Path to new bundle (after changes)
- **Third argument**: Output directory for patch files

### 4.2 Verify Patch Was Created

```bash
# Check patch directory
ls -lh .dota/patches/ios
# or
ls -lh .dota/patches/android
```

You should see the patch file (`bundle.patch`) created.

### 4.3 Include Assets

Make sure to copy all `assets` generated inside `./.dota/<platform>` to new `.dota/patches/<platform>` directory. This will ensure correct asset loading.

:::success Patch Created
✅ Your differential patch bundle has been generated!
:::

---

## Step 5: Deploy the Patch Update

Deploy your patch update using the CLI.

:::warning CLI Only
Patch updates can **only** be deployed via CLI, not through the Web Panel.
:::

### 5.1 Deploy to Staging First

<Tabs groupId="platform-release-patch">
  <TabItem value="ios" label="iOS" default>

```bash
yarn code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  --deploymentName Staging \
  --description "Bug fixes (patch update)" \
  --isPatch true \
  --compression brotli
```

  </TabItem>
  <TabItem value="android" label="Android">

```bash
yarn code-push-standalone release MyApp-Android ./.dota/patches/android "1.0.0" \
  --deploymentName Staging \
  --description "Bug fixes (patch update)" \
  --isPatch true \
  --compression brotli
```

  </TabItem>
</Tabs>

### Important Flags

| Flag | Value | Why |
|------|-------|-----|
| `--isPatch` | `true` | **Required** - Tells DOTA this is a patch bundle |
| `--compression` | `brotli` | Recommended - Best compression for patches |
| `--deploymentName` | `Staging` | Test in staging first |

:::caution Critical
Always use `--isPatch true` when deploying a patch bundle. Without this flag, the deployment will fail or behave incorrectly.
:::

---

## Step 6: Test the Patch Update

**6.1 Restart Your App**

Close and reopen the test app that uses the Staging deployment key. Rebuild the app with your original (pre‑change) code so it ships the old bundle; the patch will then apply on launch.

**6.2 Monitor Download**

The patch update is significantly smaller, so you should see:
- ⚡ Faster download
- 📉 Less bandwidth usage
- 🚀 Quicker installation

**6.3 Verify Changes Applied**

After the app restarts, confirm your code changes are visible.

Use `codePush.sync` to observe patch-related status events (see [API Reference → sync](/dota/sdk/api-reference#sync)) and impact on download size:

```javascript
codePush.sync(
  {},
  (status) => {
    switch (status) {
      case codePush.SyncStatus.PATCH_APPLIED_SUCCESS:
        // Patch applied successfully
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // Update installed; activation depends on installMode
        break;
    }
  },
  ({ receivedBytes, totalBytes }) => {
    console.log(`Downloaded ${receivedBytes} of ${totalBytes} bytes`);
  }
);
```

For the full list of statuses, see [SyncStatus](/dota/sdk/api-reference#syncstatus).

**6.4 Check Dashboard**

In the Web Panel, you should see:
- 🏷️ **"patch" tag** on the release
- 📊 Smaller bundle size reported
- 📈 Faster adoption metrics

:::info Patch Indicator
Releases marked with "patch" in the dashboard indicate a differential update was deployed.
:::

---

## Step 7: Deploy to Production

After testing successfully in Staging, promote to Production.

**7.1 Promote via CLI**

```bash
yarn code-push-standalone promote MyApp-iOS Staging Production
```

**Or deploy directly to Production:**

```bash
yarn code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  --deploymentName Production \
  --description "Bug fixes (patch update)" \
  --isPatch true \
  --compression brotli \
  --mandatory
```

:::tip Gradual Rollout
For production patches, consider gradual rollout:

```bash
yarn code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  --deploymentName Production \
  --isPatch true \
  --compression brotli \
  --rollout 25  # Start with 25% of users
```
:::

---

## Understanding Patch Benefits

### File Size Comparison

| Bundle Type | Original | With Deflate | With Brotli |
|-------------|----------|--------------|-------------|
| Uncompressed Full Bundle | 24.5 MB | 11.04 MB | 8.14 MB |
| Uncompressed Patch Bundle | ~24.5 MB | 3.82 MB | 2.9 MB (90% 🔥 smaller) |

### User Experience Impact

**Full Bundle:**
- 📥 8-11 MB download
- ⏱️ 30-60 seconds on 4G
- 🔋 More battery usage

**Patch Bundle:**
- 📥 2-3 MB download
- ⏱️ 5-10 seconds on 4G
- 🔋 Minimal battery impact

---

## Best Practices for Patch Updates

### 1. Keep Old Bundles

Always save your previous bundles before generating new ones:

```bash
# Create versioned backups
.dota-versions/
├── v1.0.0-ios/
├── v1.0.1-ios/
├── v1.1.0-ios/
├── v1.0.0-android/
└── v1.0.1-android/
```

### 2. Use Brotli Compression

```bash
--compression brotli
```

Brotli provides the best compression for patches, making them even smaller.

### 3. Test Patches in Staging

Always test patch updates in Staging before Production:

```bash
# Test first
... --deploymentName Staging --isPatch true

# Then promote
yarn code-push-standalone promote MyApp Staging Production
```

### 4. Document Your Patches

Use descriptive release notes:

```bash
--description "v1.0.1: Fixed login bug, improved image caching (patch)"
```

### 5. Fallback Strategy

DOTA automatically falls back to full bundle if patch application fails. Always have a rollback plan:

```bash
# If issues arise, deploy a full bundle
yarn code-push-standalone release MyApp ./.dota/ios "1.0.0" \
  --deploymentName Production \
  --isPatch false \
  --mandatory
```

---

## Workflow for Regular Patch Updates

Here's a repeatable workflow for your team:

### Standard Patch Deployment Process

```bash
# 1. Save current bundle (before changes)
cp -r .dota/ios .dota-versions/v1.0.0-ios

# 2. Make your code changes
# (edit your React Native code)

# 3. Generate new bundle (after changes). Created during build process

# 4. Create patch
yarn code-push-standalone create-patch \
  ./.dota-versions/v1.0.0-ios \
  ./.dota/ios \
  ./.dota/patches/ios

# 5. Include Assets

# 6. Deploy patch to staging
yarn code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  -d Staging \
  --isPatch true \
  --compression brotli \
  -des "v1.0.1: Bug fixes"

# 7. Test in staging

# 8. Promote to production
yarn code-push-standalone promote MyApp-iOS Staging Production
```

---

## Troubleshooting

### Patch Creation Fails

**Possible Causes:**
- Old bundle path is incorrect
- New bundle path is incorrect
- Bundles are identical (no changes)
- Base bundle mismatch: the patch was generated against a different base than the bundle shipped in the installed app (commonly happens if build‑time bundle copy was skipped in favor of manual generation).

**Solution:**
```bash
# Verify paths exist
ls .dota-versions/v1.0.0-ios
ls .dota/ios

# Use Build Time Bundle generation way
```

### Patch Deployment Fails

**Common Issues:**
- Forgot `--isPatch true` flag
- Wrong bundle type (trying to patch a patch)
- Assets missing

**Solution:**
```bash
# Always include --isPatch true
yarn code-push-standalone release MyApp ./.dota/patches/ios "1.0.0" \
  --isPatch true \
  --compression brotli
```

### Patch Not Applying

**Possible Causes:**
- Base bundle mismatch
- User has different version than patch expects
- Corrupted patch file

**Solution:**
- Deploy a full bundle as fallback
- Verify target version matches
- Regenerate the patch

### Assets Not Updating

**Problem:** Images or assets not updating with patch

**Solution:**
```bash
# Ensure assets are included with patch
cp -r .dota/ios/assets .dota/patches/ios/
```

---

## Advanced Patch Strategies

### Version Chain Management

For multiple sequential patches:

```bash
# v1.0.0 → v1.0.1 (patch)
create-patch v1.0.0 → v1.0.1

# v1.0.1 → v1.0.2 (patch)
create-patch v1.0.1 → v1.0.2

# v1.0.2 → v1.1.0 (full bundle - major update)
release v1.1.0 --isPatch false
```

---

## Quick Reference

### File Structure

```
.dota/
├── ios/                    # Current/new bundle
├── android/                # Current/new bundle
└── patches/                # Generated patches
    ├── ios/
    └── android/

.dota-versions/             # Backup old bundles
├── v1.0.0-ios/
├── v1.0.1-ios/
├── v1.0.0-android/
└── v1.0.1-android/
```

---

## Comparison: Patch vs Full Update

| Aspect | Full Bundle | Patch Bundle |
|--------|-------------|--------------|
| **Size** | 8-11 MB | 2-3 MB |
| **Download Time** | 30-60s on 4G | 5-10s on 4G |
| **Deployment** | CLI or Web Panel | CLI only |
| **Use Case** | Major updates | Minor updates |
| **Risk** | Lower (complete bundle) | Low (auto-fallback) |
| **User Impact** | Higher bandwidth | Minimal bandwidth |
| **Setup** | Simple | Requires old bundle |

---

## Success Checklist

Before deploying patches to production:

- [ ] Old bundle is properly backed up
- [ ] New bundle generated successfully
- [ ] Patch created without errors
- [ ] `--isPatch true` flag is used
- [ ] Assets are included if needed
- [ ] Tested in Staging environment
- [ ] Version targeting is correct
- [ ] Rollback plan is ready
- [ ] Monitoring is enabled

---
## Need Help?

- 📖 **[Binary Diff Implementation](https://github.com/ds-horizon/delivr-cli/blob/main/bsdiff/README.md)** - Technical details
- 🐛 **[Debugging Guide](/dota/sdk/debugging)** - Troubleshoot issues
- 💬 **[CLI Reference](/dota/cli/release-management)** - All CLI options
- 🚀 **[Release Management](/dota/sdk/releasing-updates)** - Best practices

---

**Congratulations!** 🎉 You've successfully deployed your first patch update! Your users will appreciate the faster downloads and minimal data usage.

