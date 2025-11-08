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

- **Seamless silent updates**: Download in the background and apply on the next launch
- **Mandatory updates**: Enforce critical fixes with a blocking prompt
- **Flexible rollout policies**: Decide when to check, download, and install
- **Separate environments**: Use multiple deployment keys for staging and production
- **Hermes-ready**: Optimized for the Hermes JS engine
- **First-class TypeScript**: Complete, accurate type definitions
- **Both architectures**: Works with the old and the new RN architecture
- **Full or patch bundles**: Ship complete bundles or small patch diffs only
- **Brotli compression**: Smaller downloads than default deflate
- **Base bytecode–aware patches**: Dramatically reduces patch size

## How does it work?

A React Native app is composed of JavaScript files and accompanying [images](https://reactnative.dev/docs/image), which are bundled by the [Metro bundler](https://github.com/facebook/metro) and shipped inside a platform binary (an `.ipa` or `.apk`). After you release, changing JS or images typically requires rebuilding and redistributing the entire binary, including store review time.

DOTA keeps your JavaScript and image assets synchronized with updates you publish to the DOTA server. Your app retains the reliability of an offline binary while gaining the web‑like agility of side‑loading updates as soon as they’re available.

To ensure users always have a working build, the DOTA client maintains a copy of the previous update. If a newly applied update causes crashes, it can automatically roll back to the last good version, so you can move fast without risking a broken experience.

## Resources

- [GitHub Repository](https://github.com/ds-horizon/delivr-sdk-ota)
- [API Reference](/sdk/api-reference)
- [Troubleshooting Guide](/sdk/debugging)
- [Advanced Topics](/sdk/advanced)

