---
sidebar_position: 3
id: patch-update-guide
title: Send Your First Patch Update
---

# Send Your First Patch Update

This guide will walk you through creating and deploying your first **patch update** (differential update). Patch updates only send the differences between two bundles, resulting in significantly smaller download sizes and faster updates for your users.

:::tip Estimated Time
⏱️ **15-20 minutes** (assumes you already have DOTA set up)
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
Full Bundle Update:    23.1 MB → 8.14 MB (with Brotli compression)
Patch Bundle Update:   23.1 MB → 2.3 MB (90% smaller!)
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
- ✅ Your React Native app with DOTA SDK integrated
- ✅ At least one previous release deployed (the "old" bundle)
- ✅ Made code changes for the new version

:::info Already Set Up?
If you haven't completed the initial setup, follow the [Full Setup Guide](/full-setup) first.
:::

---

## Step 1: Save Your Current Bundle (Old Version)

Before making changes, you need to save your current bundle as the "old" version.

**1.1 Generate Your Current Bundle**

```bash
# For iOS
npx dota bundle --platform ios

# For Android
npx dota bundle --platform android
```

**1.2 Create a Backup Directory**

```bash
mkdir -p .dota-versions
```

**1.3 Copy Current Bundle as "Old Version"**

**For iOS:**
```bash
cp -r .dota/ios .dota-versions/v1.0.0-ios
```

**For Android:**
```bash
cp -r .dota/android .dota-versions/v1.0.0-android
```

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

```bash
# iOS
npx react-native run-ios --configuration Release

# Android
cd android && ./gradlew assembleRelease
```

---

## Step 3: Generate New Bundle (After Changes)

Generate a fresh bundle with your new code.

**For iOS:**
```bash
npx dota bundle --platform ios
```

**For Android:**
```bash
npx dota bundle --platform android
```

This creates the updated bundle in `.dota/ios/` or `.dota/android/`

---

## Step 4: Create the Patch Bundle

Now create the patch that contains only the differences.

### 4.1 Use CLI to Create Patch

**For iOS:**
```bash
code-push-standalone create-patch \
  ./.dota-versions/v1.0.0-ios \
  ./.dota/ios \
  ./.dota/patches/ios
```

**For Android:**
```bash
code-push-standalone create-patch \
  ./.dota-versions/v1.0.0-android \
  ./.dota/android \
  ./.dota/patches/android
```

### Command Breakdown

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

You should see the patch files created.

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

**For iOS:**
```bash
code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  --deploymentName Staging \
  --description "Bug fixes (patch update)" \
  --isPatch true \
  --compression brotli
```

**For Android:**
```bash
code-push-standalone release MyApp-Android ./.dota/patches/android "1.0.0" \
  --deploymentName Staging \
  --description "Bug fixes (patch update)" \
  --isPatch true \
  --compression brotli
```

### Important Flags

| Flag | Value | Why |
|------|-------|-----|
| `--isPatch` | `true` | **Required** - Tells DOTA this is a patch bundle |
| `--compression` | `brotli` | Recommended - Best compression for patches |
| `--deploymentName` | `Staging` | Test in staging first |

:::caution Critical
Always use `--isPatch true` when deploying a patch bundle. Without this flag, the deployment will fail or behave incorrectly.
:::

### 5.2 Include Assets

If your update includes new or modified assets, make sure to include them:

```bash
# Copy assets to patch directory
cp -r .dota/ios/assets .dota/patches/ios/
# Then deploy with the patch
```

---

## Step 6: Test the Patch Update

**6.1 Restart Your App**

Close and reopen your test app that's using the Staging deployment key.

**6.2 Monitor Download**

The patch update is significantly smaller, so you should see:
- ⚡ Faster download
- 📉 Less bandwidth usage
- 🚀 Quicker installation

**6.3 Verify Changes Applied**

After the app restarts, confirm your code changes are visible.

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
code-push-standalone promote MyApp-iOS Staging Production
```

**Or deploy directly to Production:**

```bash
code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  --deploymentName Production \
  --description "Bug fixes (patch update)" \
  --isPatch true \
  --compression brotli \
  --mandatory
```

:::tip Gradual Rollout
For production patches, consider gradual rollout:

```bash
code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  --deploymentName Production \
  --isPatch true \
  --compression brotli \
  --rollout 25  # Start with 25% of users
```
:::

---

## Understanding Patch Benefits

### File Size Comparison

| Bundle Type | Original | With Deflate | With Brotli | Patch |
|-------------|----------|--------------|-------------|-------|
| Full Bundle | 23.1 MB | 11.04 MB | 8.14 MB | - |
| Patch Bundle | - | - | - | 2.3 MB |
| **Savings** | - | - | - | **90%** |

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
code-push-standalone promote MyApp Staging Production
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
code-push-standalone release MyApp ./.dota/ios "1.0.0" \
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
npx dota bundle --platform ios
cp -r .dota/ios .dota-versions/v1.0.0-ios

# 2. Make your code changes
# (edit your React Native code)

# 3. Generate new bundle (after changes)
npx dota bundle --platform ios

# 4. Create patch
code-push-standalone create-patch \
  ./.dota-versions/v1.0.0-ios \
  ./.dota/ios \
  ./.dota/patches/ios

# 5. Deploy patch to staging
code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  -d Staging \
  --isPatch true \
  --compression brotli \
  -des "v1.0.1: Bug fixes"

# 6. Test in staging

# 7. Promote to production
code-push-standalone promote MyApp-iOS Staging Production
```

---

## Troubleshooting

### Patch Creation Fails

**Possible Causes:**
- Old bundle path is incorrect
- New bundle path is incorrect
- Bundles are identical (no changes)

**Solution:**
```bash
# Verify paths exist
ls .dota-versions/v1.0.0-ios
ls .dota/ios

# Ensure bundles are different
diff .dota-versions/v1.0.0-ios/main.jsbundle .dota/ios/main.jsbundle
```

### Patch Deployment Fails

**Common Issues:**
- Forgot `--isPatch true` flag
- Wrong bundle type (trying to patch a patch)
- Assets missing

**Solution:**
```bash
# Always include --isPatch true
code-push-standalone release MyApp ./.dota/patches/ios "1.0.0" \
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

### Automated Patch Pipeline

**Example CI/CD Script:**

```yaml
# .github/workflows/deploy-patch.yml
- name: Generate Bundle
  run: npx dota bundle --platform ios

- name: Create Patch
  run: |
    code-push-standalone create-patch \
      ./previous-bundle \
      ./.dota/ios \
      ./.dota/patches/ios

- name: Deploy Patch
  run: |
    code-push-standalone release MyApp-iOS ./.dota/patches/ios "$VERSION" \
      --deploymentName Staging \
      --isPatch true \
      --compression brotli \
      --description "Automated patch deployment"
```

---

## Quick Reference

### Essential Commands

```bash
# Save old bundle
cp -r .dota/ios .dota-versions/v1.0.0-ios

# Generate new bundle
npx dota bundle --platform ios

# Create patch
code-push-standalone create-patch OLD_PATH NEW_PATH OUTPUT_PATH

# Deploy patch
code-push-standalone release APP PATCH_PATH VERSION \
  --isPatch true \
  --compression brotli

# Promote patch
code-push-standalone promote APP Staging Production
```

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

## What's Next?

### 🚀 Advanced Topics

- **[Automated Patch Workflows](/cli/ci-cd-integration)** - CI/CD integration
- **[Compression Strategies](/cli/release-management)** - Optimize bundle sizes
- **[Version Management](/sdk/releasing-updates)** - Semantic versioning
- **[Binary Diff Details](https://github.com/ds-horizon/delivr-cli/blob/main/bsdiff/README.md)** - How patches work

### 📊 Monitoring

- **[Release Metrics](/web-panel/overview)** - Track patch adoption
- **[Performance Monitoring](/sdk/debugging)** - Measure update speed
- **[Error Tracking](/sdk/debugging)** - Catch patch issues early

### 🔧 Optimization

- Use **Brotli compression** for best results
- Create patches for **minor updates** only
- Keep **version history** organized
- Implement **automated testing** for patches

---

## Tips for Success

### 💡 Pro Tips

**1. Organize Your Versions**
```bash
# Use clear version naming
.dota-versions/
├── v1.0.0-ios/
├── v1.0.1-ios/  # patch from v1.0.0
├── v1.0.2-ios/  # patch from v1.0.1
└── v1.1.0-ios/  # full bundle (major update)
```

**2. Automate Bundle Backups**

Add to your `package.json`:

```json
{
  "scripts": {
    "backup:ios": "cp -r .dota/ios .dota-versions/$(node -p \"require('./package.json').version\")-ios",
    "backup:android": "cp -r .dota/android .dota-versions/$(node -p \"require('./package.json').version\")-android"
  }
}
```

**3. Test Patch Size**

```bash
# Check patch size before deploying
du -sh .dota/patches/ios
du -sh .dota/ios  # Compare with full bundle
```

**4. Document Each Patch**

Maintain a changelog:

```markdown
## v1.0.1 (Patch from v1.0.0)
- Fixed login crash
- Improved error messages
- Patch size: 2.3 MB (vs 8.1 MB full)
```

---

## Common Scenarios

### Scenario 1: Hotfix for Production

```bash
# 1. Save current production bundle
cp -r .dota/ios .dota-versions/v1.0.0-ios

# 2. Fix the bug in code

# 3. Generate new bundle
npx dota bundle --platform ios

# 4. Create patch
code-push-standalone create-patch \
  .dota-versions/v1.0.0-ios \
  .dota/ios \
  .dota/patches/ios

# 5. Deploy immediately to production as mandatory
code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  --deploymentName Production \
  --isPatch true \
  --mandatory \
  --compression brotli \
  --description "Critical hotfix"
```

### Scenario 2: Feature Flag Toggle

```bash
# Small change to enable feature
# Create and deploy patch to 10% of users

code-push-standalone release MyApp-iOS ./.dota/patches/ios "1.0.0" \
  --deploymentName Production \
  --isPatch true \
  --rollout 10 \
  --compression brotli
```

### Scenario 3: Sequential Patches

```bash
# v1.0.0 → v1.0.1 (patch)
create-patch v1.0.0 v1.0.1 → deploy

# Save v1.0.1
cp -r .dota/ios .dota-versions/v1.0.1-ios

# v1.0.1 → v1.0.2 (another patch)
create-patch v1.0.1 v1.0.2 → deploy
```

---

## Need Help?

- 📖 **[Binary Diff Implementation](https://github.com/ds-horizon/delivr-cli/blob/main/bsdiff/README.md)** - Technical details
- 🐛 **[Debugging Guide](/sdk/debugging)** - Troubleshoot issues
- 💬 **[CLI Reference](/cli/release-management)** - All CLI options
- 🚀 **[Release Management](/sdk/releasing-updates)** - Best practices

---

**Congratulations!** 🎉 You've successfully deployed your first patch update! Your users will appreciate the faster downloads and minimal data usage.

