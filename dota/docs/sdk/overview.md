---
sidebar_position: 1
---

# Overview

Over‑the‑air updates for React Native. Ship JS and assets instantly—no app store release.

## What is the DOTA SDK?

DOTA (Delivr Over‑The‑Air) lets your React Native app receive updates without publishing a new store build. With DOTA you can:

- Ship bug fixes to all users instantly
- Release features without App Store/Play Store approval
- Update JavaScript and assets on the fly
- Roll out gradually and run A/B experiments
- Roll back safely if something goes wrong

## Key Features

- 🚀 **Seamless silent updates**: Download in the background and apply on next launch — see [Install Modes](/dota/sdk/options#install-modes)
- 🔒 **Mandatory updates**: Enforce critical fixes with a blocking prompt — configure [mandatoryInstallMode](/dota/sdk/options#mandatory-install-mode) and mark releases as mandatory in the [CLI](/dota/cli/release-management#optional-parameters)
- 🎛️ **Flexible policies**: Decide when to check, download, and install — tune [checkFrequency](/dota/sdk/options#update-check-policies) and [installMode](/dota/sdk/options#install-modes)
- 🔑 **Separate environments**: Use different deployment keys for Staging/Production — see [Deployment Keys](/dota/sdk/options#deployment-keys)
- ⚙️ **Hermes‑ready**: Optimized for Hermes; pair with [Base bytecode optimization](/dota/base-bytecode-optimization) for smaller patches
- 🧩 **TypeScript first**: Complete, accurate type definitions
- 🏗️ **Both RN architectures**: Compatible with the old and the new architecture
- 📦 **Full or patch bundles**: Ship complete bundles or small diffs — see [Bundle Generation](/dota/sdk/bundle-generation) and [Ship Your First Patch Bundle](/dota/patch-update-guide)
- 🗜️ **Brotli compression**: Smaller downloads — enable via [CLI release options](/dota/cli/release-management#brotli-compression)
- 🧠 **Base bytecode–aware patches**: Dramatically reduces patch size — learn more in [Base bytecode optimization](/dota/sdk/base-bytecode-optimization)

## How does it work?

A React Native app is composed of JavaScript files and accompanying [images](https://reactnative.dev/docs/image), which are bundled by the [Metro bundler](https://github.com/facebook/metro) and shipped inside a platform binary (an `.ipa` or `.apk`). After you release, changing JS or images typically requires rebuilding and redistributing the entire binary, including store review time.

DOTA keeps your JavaScript and image assets synchronized with updates you publish to the DOTA server. Your app retains the reliability of an offline binary while gaining the web‑like agility of side‑loading updates as soon as they’re available.

To ensure users always have a working build, the DOTA client maintains a copy of the previous update. If a newly applied update causes crashes, it can automatically roll back to the last good version, so you can move fast without risking a broken experience.

## Resources

- [GitHub Repository](https://github.com/ds-horizon/delivr/tree/main/delivr-sdk-ota)
- [API Reference](/dota/sdk/api-reference)
- [Advanced Options](/dota/sdk/options)
- [Troubleshooting Guide](/dota/sdk/debugging)

