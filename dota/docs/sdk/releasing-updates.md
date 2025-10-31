---
sidebar_position: 7
---

# Releasing Updates

Once your app is configured and distributed to users, and you've made JavaScript or asset changes, it's time to release them as OTA updates.

## Prerequisites

Before releasing updates:

1. ✅ Your app must be published to the App Store/Play Store with the DOTA SDK integrated
2. ✅ Deployment keys must be configured in your app code
3. ✅ You must have generated the JavaScript bundle and assets

See [Bundle Generation](/sdk/bundle-generation) for creating bundles.

## Release Methods

There are two ways to release OTA updates:

### 1. Using the Web Panel

Ideal for:
- Manual deployments
- Quick releases
- Non-technical team members
- Visual monitoring and control

**Steps:**
1. Navigate to the [DOTA Web Panel](https://github.com/ds-horizon/delivr-web-panel)
2. Select your app and deployment
3. Upload your bundle and assets
4. Configure rollout settings
5. Publish the update

[Learn more about the Web Panel →](/web-panel/overview)

### 2. Using the CLI

Ideal for:
- Automated deployments
- CI/CD pipelines
- Command-line workflows
- Scripted releases

**Steps:**
```bash
# Release to staging
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Staging \
  --description "Bug fixes"

# Release to production
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Production \
  --mandatory
```

[Learn more about the CLI →](/cli/overview)

## Release Options

### Target Binary Version

Specify which app store version this update is compatible with:

```bash
# Exact version
--targetBinaryVersion "1.0.0"

# Version range (semver)
--targetBinaryVersion "^1.0.0"  # Compatible with 1.x.x

# All versions
--targetBinaryVersion "*"
```

### Deployment Environment

Target specific deployments:

```bash
# Staging (default)
--deploymentName Staging

# Production
--deploymentName Production
```

:::tip Best Practice
Always test updates in **Staging** before promoting to **Production**.
:::

### Mandatory Updates

Force users to install critical updates:

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Production \
  --mandatory
```

When an update is marked as mandatory:
- Users must install it before using the app
- It installs immediately, regardless of install mode settings
- Perfect for critical bug fixes or security updates

### Gradual Rollout

Release to a percentage of users:

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --deploymentName Production \
  --rollout 25  # Release to 25% of users
```

:::tip Rollout Strategy
Start with a small percentage (10-25%) and monitor metrics before increasing:
1. Release to 10% of users
2. Monitor for 24-48 hours
3. Increase to 50% if no issues
4. Finally roll out to 100%
:::

### Update Description

Add release notes visible to your team:

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --description "Fixed login bug, improved performance"
```

### Disabled Updates

Create an update but prevent it from being downloaded:

```bash
code-push-standalone release MyApp-iOS ./codepush 1.0.0 \
  --disabled
```

Useful for:
- Preparing updates in advance
- Staged rollout workflows
- Emergency pause scenarios

## Complete Example

A production-ready release command:

```bash
code-push-standalone release MyApp-iOS ./codepush "^2.0.0" \
  --deploymentName Production \
  --description "Version 2.1.0: New features and bug fixes" \
  --rollout 25 \
  --mandatory false
```

## Monitoring Releases

After releasing an update, monitor its progress:

### Using the Web Panel

The dashboard provides real-time metrics:
- **Adoption Rate**: Percentage of users with the update
- **Installation Status**: Success/failure rates
- **Active Users**: Current version distribution
- **Rollout Progress**: For gradual rollouts

### Using the CLI

Check deployment history:

```bash
code-push-standalone deployment history MyApp-iOS Staging
```

View current deployment status:

```bash
code-push-standalone deployment list MyApp-iOS
```

## Promoting Updates

After testing in Staging, promote to Production:

```bash
code-push-standalone promote MyApp-iOS Staging Production
```

With additional options:

```bash
code-push-standalone promote MyApp-iOS Staging Production \
  --rollout 25 \
  --description "Verified in staging"
```

## Rollback Strategy

If an update causes issues, you can roll back:

### Quick Rollback

Release a previous working version:

```bash
# Re-release the last known good bundle
code-push-standalone release MyApp-iOS ./previous-bundle 1.0.0 \
  --deploymentName Production \
  --mandatory
```

### Disable Current Update

If you need time to investigate:

```bash
# Use the web panel to disable the current release
# or release a new update marked as disabled
```

## Testing Updates

:::caution Important
DOTA updates do **NOT** work in Debug mode. The app always downloads the bundle from the packager in Debug mode.
:::

### Testing Checklist

Before releasing to production:

1. ✅ Test in Release mode (iOS) or release build (Android)
2. ✅ Verify the update downloads successfully
3. ✅ Confirm the update installs correctly
4. ✅ Test on both platforms if applicable
5. ✅ Verify mandatory updates force installation
6. ✅ Test rollback scenarios
7. ✅ Monitor Staging deployment metrics

### Testing Commands

```bash
# iOS Release mode
npx react-native run-ios --configuration Release

# Android Release build
cd android && ./gradlew assembleRelease
```

## Best Practices

### 1. Version Targeting

- Use semantic versioning ranges for flexibility
- Target specific versions for critical fixes
- Test compatibility across all targeted versions

### 2. Deployment Strategy

```
Staging → 10% → 25% → 50% → 100%
```

- Always test in Staging first
- Use gradual rollouts for major changes
- Monitor metrics at each stage

### 3. Release Notes

- Write clear, descriptive release notes
- Document breaking changes
- Include version numbers and dates

### 4. Monitoring

- Watch adoption rates
- Monitor crash reports
- Track performance metrics
- Set up alerts for anomalies

### 5. Emergency Procedures

- Have a rollback plan ready
- Keep previous bundles accessible
- Document rollback procedures
- Practice emergency rollbacks

## Common Issues

### Update Not Appearing

**Possible causes:**
- App is in Debug mode (updates don't work in Debug)
- Wrong deployment key configured
- Update disabled in dashboard
- Target binary version mismatch

**Solutions:**
- Build in Release mode
- Verify deployment keys
- Check update status in dashboard
- Verify version compatibility

### Slow Adoption

**Possible causes:**
- Users not restarting the app
- Network connectivity issues
- Low rollout percentage

**Solutions:**
- Use immediate install mode for critical updates
- Increase rollout percentage gradually
- Mark as mandatory if critical

### Update Failures

**Possible causes:**
- Bundle corruption
- Incompatible native modules
- Insufficient storage on device

**Solutions:**
- Regenerate and re-upload bundle
- Verify native module compatibility
- Test on various devices

## Next Steps

- [Explore the API Reference](/sdk/api-reference)
- [Learn about debugging](/sdk/debugging)
- [Read advanced topics](/sdk/advanced)
- [Master the CLI](/cli/overview)

