import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Delivr',
  tagline: 'Ship Mobile Apps with Confidence',
  favicon: 'img/delivr-favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://delivr.live',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ds-horizon', // Usually your GitHub org/user name.
  projectName: 'delivr-documentation', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'dota/docs',
          sidebarPath: './sidebars.ts',
          routeBasePath: 'dota',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ds-horizon/delivr-documentation/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-BMMNWG6KJ5',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Delivr',
      logo: {
        alt: 'Delivr Logo',
        src: 'img/delivr-logo.png',
      },
      items: [
        {
          to: '/dota',
          label: 'DOTA',
          position: 'left',
        },
        {
          to: '/build',
          label: 'Build',
          position: 'left',
        },
        {
          to: '/release',
          label: 'Release',
          position: 'left',
        },
        {
          to: '/testing',
          label: 'Testing',
          position: 'left',
        },
        {
          href: 'https://github.com/ds-horizon',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'DOTA (OTA Updates)',
              to: '/dota',
            },
            {
              label: 'Build (Coming Soon)',
              to: '/build',
            },
            {
              label: 'Release (Coming Soon)',
              to: '/release',
            },
            {
              label: 'Testing (Coming Soon)',
              to: '/testing',
            },
          ],
        },
        {
          title: 'DOTA Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/dota/intro',
            },
            {
              label: 'SDK',
              to: '/dota/sdk/overview',
            },
            {
              label: 'Server',
              to: '/dota/server/overview',
            },
            {
              label: 'Web Panel',
              to: '/dota/web-panel/overview',
            },
            {
              label: 'CLI',
              to: '/dota/cli/overview',
            },
          ],
        },
        {
          title: 'Repositories',
          items: [
            {
              label: 'SDK (React Native)',
              href: 'https://github.com/ds-horizon/delivr-sdk-ota',
            },
            {
              label: 'Server (Backend)',
              href: 'https://github.com/ds-horizon/delivr-server-ota',
            },
            {
              label: 'Web Panel',
              href: 'https://github.com/ds-horizon/delivr-web-panel',
            },
            {
              label: 'CLI',
              href: 'https://github.com/ds-horizon/delivr-cli',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub Organization',
              href: 'https://github.com/ds-horizon',
            },
            {
              label: 'Report an Issue',
              href: 'https://github.com/ds-horizon/delivr-sdk-ota/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Delivr. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
