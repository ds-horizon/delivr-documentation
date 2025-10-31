import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'full-setup',
    'patch-update-guide',
    {
      type: 'category',
      label: 'SDK (React Native)',
      collapsed: false,
      items: [
        'sdk/overview',
        'sdk/installation',
        'sdk/ios-setup',
        'sdk/android-setup',
        'sdk/usage',
        'sdk/bundle-generation',
        'sdk/releasing-updates',
        'sdk/debugging',
      ],
    },
    {
      type: 'category',
      label: 'Server (Backend)',
      collapsed: false,
      items: [
        'server/overview',
        'server/installation',
      ],
    },
    {
      type: 'category',
      label: 'Web Panel (Dashboard)',
      collapsed: false,
      items: [
        'web-panel/overview',
        'web-panel/installation',
      ],
    },
    {
      type: 'category',
      label: 'CLI (Command Line)',
      collapsed: false,
      items: [
        'cli/overview',
        'cli/installation',
        'cli/release-management',
      ],
    },
  ],
};

export default sidebars;
