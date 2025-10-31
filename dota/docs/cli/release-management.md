---
sidebar_position: 3
---

# Release Management

The `release` command is the primary way to deploy OTA updates to your React Native applications. This guide covers everything you need to know about releasing updates.

## Release Types

There are two types of updates you can release:

### 1. Full Bundle
Sends the complete, updated bundle to users.

### 2. Patch Bundle
Sends only the differences (diff) between versions, resulting in smaller downloads.

## Basic Release Command

```bash
code-push-standalone release <appName> <updateContents> <targetBinaryVersion> [options]
```

### Required Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `appName` | Name of your app | `MyApp-iOS`, `MyApp-Android` |
| `updateContents` | Path to bundle/assets | `./codepush`, `./dist/bundle` |
| `targetBinaryVersion` | App store version | `1.0.0`, `^1.0.0`, `*` |

### Optional Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--deploymentName`, `-d` | Target deployment | `Staging` |
| `--description`, `-des` | Release notes | - |
| `--disabled` | Prevent download | `false` |
| `--mandatory` | Force update | `false` |
| `--noDuplicateReleaseError` | Warn instead of error for duplicates | `false` |
| `--rollout` | Percentage of users (1-100) | `100` |
| `--isPatch` | Whether this is a patch | `false` |
| `--compression` | Algorithm: `deflate` or `brotli` | `deflate` |

## Full Bundle Releases

### Basic Example

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0
```

This will:
- Deploy to **Staging** (default)
- Target app version **1.0.0** exactly
- Use **deflate** compression
- Release to **100%** of users

### Production Release

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Production \
  --description "Bug fixes and performance improvements" \
  --mandatory
```

### Release with Version Range

Use semver to target multiple versions:

```bash
# Compatible with all 1.x.x versions
code-push-standalone release MyApp-iOS ./codepush "^1.0.0" \
  --deploymentName Production

# Compatible with specific range
code-push-standalone release MyApp-iOS ./codepush ">=1.0.0 <2.0.0" \
  --deploymentName Production

# All versions
code-push-standalone release MyApp-iOS ./codepush "*" \
  --deploymentName Production
```

### Gradual Rollout

Release to a percentage of users:

```bash
# Start with 25% of users
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Production \
  --rollout 25 \
  --description "New feature rollout"
```

Then increase the rollout:

```bash
# Later, increase to 50%
code-push-standalone patch MyApp-iOS Production \
  --rollout 50

# Finally, 100%
code-push-standalone patch MyApp-iOS Production \
  --rollout 100
```

### Using Brotli Compression

Brotli provides better compression than deflate:

```bash
code-push-standalone release MyApp-iOS ./dist/bundle "^1.0.0" \
  --deploymentName Production \
  --compression brotli \
  --description "Compressed with Brotli for faster downloads"
```

**Compression Comparison:**
- **Deflate**: Standard compression (e.g., 23.1MB → 11.04MB)
- **Brotli**: Better compression (e.g., 23.1MB → 8.14MB)

:::tip Recommendation
Use **Brotli** for production releases to minimize download times and bandwidth usage.
:::

## Patch Bundle Releases

Patch bundles significantly reduce update size by sending only the changes between versions.

### Step 1: Create Patch

First, create a patch between the old and new bundles:

```bash
code-push-standalone create-patch \
  ./old-bundle \
  ./new-bundle \
  ./.codepush/patches
```

**Parameters:**
- `./old-bundle`: Path to the previous version's bundle
- `./new-bundle`: Path to the new version's bundle
- `./.codepush/patches`: Output directory for the patch

### Step 2: Release Patch

Then release the patch bundle:

```bash
code-push-standalone release MyApp-iOS ./.codepush/patches "1.0.0" \
  --deploymentName Staging \
  --description "Bug fixes (patch)" \
  --isPatch true \
  --compression brotli
```

:::warning Important
Always use `--isPatch true` when releasing a patch bundle, and include assets alongside the patch bundle.
:::

### Benefits of Patch Releases

- **Smaller Download Size**: Only diff is transferred
- **Faster Updates**: Quicker download and installation
- **Reduced Bandwidth**: Lower costs and data usage
- **Better UX**: Less waiting time for users

### Example: Patch vs Full Bundle

```
Full Bundle:   23.1 MB → 8.14 MB (with Brotli)
Patch Bundle:  23.1 MB → 2.3 MB (90% reduction!)
```

## Advanced Release Scenarios

### Multi-Platform Release

Deploy to both iOS and Android:

```bash
# iOS
code-push-standalone release MyApp-iOS ./ios-bundle 1.0.0 \
  --deploymentName Production \
  --description "Multi-platform release"

# Android
code-push-standalone release MyApp-Android ./android-bundle 1.0.0 \
  --deploymentName Production \
  --description "Multi-platform release"
```

### Disabled Release

Create a release but prevent it from being downloaded (useful for preparation):

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Production \
  --disabled \
  --description "Prepared for tomorrow's launch"
```

Enable it later via the Web Panel or with a patch command.

### Mandatory Critical Update

Force all users to update immediately:

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Production \
  --mandatory \
  --description "Critical security fix - mandatory update"
```

:::caution When to Use Mandatory
Only use mandatory updates for:
- Critical security vulnerabilities
- Breaking backend changes
- Data corruption fixes

Avoid for feature releases or minor bugs.
:::

### No Duplicate Error

Prevent errors when releasing the same content (useful in automated pipelines):

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --noDuplicateReleaseError \
  --description "Release (safe for duplicate)"
```

## Promoting Releases

After testing in Staging, promote to Production:

### Basic Promotion

```bash
code-push-standalone promote MyApp-iOS Staging Production
```

### Promotion with Options

```bash
code-push-standalone promote MyApp-iOS Staging Production \
  --rollout 25 \
  --description "Verified in staging - releasing to 25% of production users"
```

### Promotion Benefits

- Exact same bundle that was tested
- Faster than re-uploading
- Maintains deployment history
- Reduces risk of errors

## Monitoring Releases

### View Deployment History

```bash
code-push-standalone deployment history MyApp-iOS Staging
```

Shows:
- Release versions
- Deployment dates
- Active installations
- Descriptions

### List All Deployments

```bash
code-push-standalone deployment list MyApp-iOS
```

Shows:
- All deployment keys
- Latest release info
- Installation metrics

## Release Workflow Examples

### Development Workflow

```bash
# 1. Deploy to staging for testing
code-push-standalone release MyApp-iOS ./codepush ^1.0.0 \
  -d Staging \
  -des "Testing new feature"

# 2. Test thoroughly

# 3. Promote to production with gradual rollout
code-push-standalone promote MyApp-iOS Staging Production --rollout 25

# 4. Monitor metrics

# 5. Increase rollout
code-push-standalone patch MyApp-iOS Production --rollout 100
```

### Hotfix Workflow

```bash
# Urgent bug fix - deploy immediately to all users
code-push-standalone release MyApp-iOS ./hotfix-bundle 1.0.0 \
  -d Production \
  --mandatory \
  --compression brotli \
  -des "Critical bug fix"
```

### Patch Release Workflow

```bash
# 1. Create patch
code-push-standalone create-patch \
  ./previous-bundle \
  ./new-bundle \
  ./.codepush/patches

# 2. Deploy patch to staging
code-push-standalone release MyApp-iOS ./.codepush/patches 1.0.0 \
  -d Staging \
  --isPatch true \
  -des "Small bug fixes"

# 3. Test

# 4. Promote to production
code-push-standalone promote MyApp-iOS Staging Production
```

## Best Practices

### 1. Always Test in Staging First

```bash
# ✅ Good: Test first
code-push-standalone release MyApp-iOS ./bundle 1.0.0 -d Staging
# ... test thoroughly ...
code-push-standalone promote MyApp-iOS Staging Production

# ❌ Bad: Direct to production
code-push-standalone release MyApp-iOS ./bundle 1.0.0 -d Production
```

### 2. Use Semantic Versioning

```bash
# ✅ Good: Flexible targeting
code-push-standalone release MyApp-iOS ./bundle "^1.0.0" -d Production

# ⚠️ OK: Exact version (more restrictive)
code-push-standalone release MyApp-iOS ./bundle "1.0.0" -d Production

# ❌ Avoid: Too broad
code-push-standalone release MyApp-iOS ./bundle "*" -d Production
```

### 3. Gradual Rollouts for Major Changes

```bash
# ✅ Good: Gradual rollout
code-push-standalone release MyApp-iOS ./bundle 1.0.0 \
  -d Production \
  --rollout 10 \
  -des "Major feature update"

# ❌ Risky: All users immediately
code-push-standalone release MyApp-iOS ./bundle 1.0.0 \
  -d Production
```

### 4. Use Brotli for Production

```bash
# ✅ Good: Better compression
code-push-standalone release MyApp-iOS ./bundle 1.0.0 \
  -d Production \
  --compression brotli

# ⚠️ OK: Default compression
code-push-standalone release MyApp-iOS ./bundle 1.0.0 -d Production
```

### 5. Descriptive Release Notes

```bash
# ✅ Good: Clear description
code-push-standalone release MyApp-iOS ./bundle 1.0.0 \
  -d Production \
  -des "v1.2.0: Fixed login bug, improved image loading performance"

# ❌ Bad: No context
code-push-standalone release MyApp-iOS ./bundle 1.0.0 -d Production
```

## Common Pitfalls

### 1. Wrong App Name

```bash
# ❌ Error: App not found
code-push-standalone release MyApp ./bundle 1.0.0

# ✅ Correct: Use exact app name from dashboard
code-push-standalone release MyApp-iOS ./bundle 1.0.0
```

### 2. Version Mismatch

```bash
# ❌ Error: App version 1.5.0 doesn't match target 1.0.0
code-push-standalone release MyApp-iOS ./bundle "1.0.0"

# ✅ Correct: Match or use range
code-push-standalone release MyApp-iOS ./bundle "^1.0.0"
```

### 3. Forgot isPatch Flag

```bash
# ❌ Error: Will treat patch as full bundle
code-push-standalone release MyApp-iOS ./patch-bundle 1.0.0

# ✅ Correct: Specify isPatch
code-push-standalone release MyApp-iOS ./patch-bundle 1.0.0 --isPatch true
```

## Next Steps

- [Learn about patch bundles in detail](/cli/patch-bundles)
- [Set up CI/CD integration](/cli/ci-cd-integration)
- [Explore authentication options](/cli/authentication)
- [Review troubleshooting guide](/cli/troubleshooting)

