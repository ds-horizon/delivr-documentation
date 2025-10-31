# Delivr Documentation

Comprehensive documentation for the Delivr mobile dev-ops platform. Built with [Docusaurus](https://docusaurus.io/).

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This starts a local development server at `http://localhost:3000` with hot reload enabled.

### Production Build

```bash
npm run build
```

Generates optimized static files in the `build` directory.

### Preview Production Build

```bash
npm run serve
```

Preview the production build locally before deployment.

## 📚 Documentation Structure

The documentation is organized into three main sections:

### 1. **Home** (`/`)
- Fancy landing page with product overview
- Feature highlights and benefits
- Quick navigation to all sections

### 2. **DOTA** (`/docs`)
Over-the-air updates documentation with four subsections:
- **SDK** - React Native module integration
- **Server** - Backend API setup and deployment
- **Web Panel** - Dashboard interface and features
- **CLI** - Command-line tool for automation

### 3. **Coming Soon Pages**
- **Build** (`/build`) - Automated build pipelines (coming soon)
- **Release** (`/release`) - Release management (coming soon)

## 📁 Project Structure

```
delivr-documentation/
├── docs/                      # DOTA documentation
│   ├── intro.md              # Getting started guide
│   ├── sdk/                  # SDK documentation (8 pages)
│   ├── server/               # Server documentation (2 pages)
│   ├── web-panel/            # Web Panel documentation (2 pages)
│   └── cli/                  # CLI documentation (3 pages)
├── src/
│   ├── pages/                # Landing and coming soon pages
│   │   ├── index.tsx         # Main landing page
│   │   ├── build.tsx         # Build coming soon page
│   │   └── release.tsx       # Release coming soon page
│   └── css/                  # Custom styles
├── static/                   # Static assets
└── docusaurus.config.ts      # Site configuration
```

## 🎨 Features

- ✨ Modern, responsive landing page
- 📱 Mobile-friendly navigation
- 🌓 Dark mode support
- 🔍 Built-in search functionality
- 🎯 Organized documentation structure
- 🔗 Cross-referenced content
- 💅 Custom styled components

## 🔧 Configuration

### Navigation

The header navigation includes:
- **DOTA** - Main documentation
- **Build** - Coming soon page
- **Release** - Coming soon page
- **GitHub** - Link to repositories

### Footer

Organized into three columns:
- **Products** - DOTA, Build, Release
- **DOTA Documentation** - Quick links to all sections
- **Repositories** - Links to all GitHub repos

## 🚀 Deployment

### GitHub Pages

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

### Vercel

```bash
vercel
```

### Netlify

1. Build the site: `npm run build`
2. Deploy the `build` directory

### Custom Server

After building, serve the `build` directory with any static file server:

```bash
npx serve -s build
```

## 📝 Adding Documentation

### Add a New Page

1. Create a markdown file in the appropriate directory under `docs/`
2. Add front matter with `sidebar_position`
3. Update `sidebars.ts` if needed
4. Link to the page from related documents

Example:

```markdown
---
sidebar_position: 5
---

# My New Page

Content goes here...
```

### Add a New Section

1. Create a new directory under `docs/`
2. Add pages with appropriate sidebar positions
3. Update `sidebars.ts` to include the new category
4. Update navigation in `docusaurus.config.ts`

## 🔗 Useful Links

- **Live Site**: [Your deployment URL]
- **DOTA SDK**: https://github.com/ds-horizon/delivr-sdk-ota
- **Server**: https://github.com/ds-horizon/delivr-server-ota
- **Web Panel**: https://github.com/ds-horizon/delivr-web-panel
- **CLI**: https://github.com/ds-horizon/delivr-cli

## 📦 Technologies Used

- **Docusaurus 3.9.2** - Static site generator
- **React 19** - UI framework
- **TypeScript** - Type safety
- **MDX** - Enhanced markdown

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
