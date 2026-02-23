# MSF AI-Generated Virtual Environments Reference Site

An offline-capable interactive reference site documenting AI-powered tools and technologies for generating 3D worlds, virtual environments, and interactive spaces.

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Navigate to the site directory
cd site

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# The site will be available at http://localhost:4321
```

### Production Build

```bash
# Build for production
npm run build

# This will:
# 1. Build the Astro site to ./dist/
# 2. Generate Pagefind search index (postbuild)
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Offline Usage

This site is designed to work completely offline. After building:

1. Open `dist/index.html` directly in your browser
2. All navigation, content, and search work without an internet connection
3. File paths use relative URLs (`./`) for `file://` protocol support

### What Works Offline

- All page navigation
- Full-text search (Pagefind)
- Local images, videos, and 3D models
- All interactive components

### What Requires Internet

- YouTube/Vimeo video embeds (placeholder shown offline)
- External links (marked with icon)
- Live API demos (if any)

## Project Structure

```
site/
├── public/                 # Static assets (copied as-is)
│   ├── images/
│   │   ├── implementations/  # Tool screenshots and outputs
│   │   ├── diagrams/         # Architecture and flow diagrams
│   │   └── logos/            # Company/tool logos
│   ├── videos/             # Local video files
│   └── models/             # 3D model files (GLB)
│
├── src/
│   ├── components/         # Reusable Astro components
│   ├── content/
│   │   └── pages/          # MDX content pages
│   │       └── implementations/  # Tool deep-dives
│   ├── layouts/
│   │   └── BaseLayout.astro  # Base HTML layout
│   ├── pages/
│   │   ├── index.astro     # Home page
│   │   └── [...slug].astro # Dynamic content routes
│   └── styles/             # Global CSS
│
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Adding Content

### MDX Pages

Add content pages as `.mdx` files in `src/content/pages/`:

```mdx
---
title: "Page Title"
description: "Page description"
section: "implementations"
---

# Page Title

Content goes here with full MDX support.
```

### Media Assets

Place media files in the appropriate `public/` subdirectory:

- `public/images/implementations/[tool-name]/` - Tool screenshots
- `public/images/diagrams/` - Architecture diagrams
- `public/videos/` - Local video files
- `public/models/` - 3D model files (GLB format)

### Components

Create reusable components in `src/components/`:

- `ImplementationCard.astro` - Tool profile cards
- `SRLBadge.astro` - Maturity level badges
- `VideoEmbed.astro` - Video with offline fallback
- `ModelViewer.astro` - 3D model display

## Design System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-primary` | #0066CC | MSF Blue, primary actions |
| `--color-secondary` | #00A86B | Green accent |
| `--color-surface` | #FFFFFF | Page background |
| `--color-surface-alt` | #F5F7FA | Card backgrounds |
| `--color-text` | #1A1A2E | Body text |
| `--color-text-muted` | #6B7280 | Secondary text |

### SRL Level Colors

| Level | Color | Meaning |
|-------|-------|---------|
| SRL 1-2 | Red (#DC2626) | Concept/Research |
| SRL 3-4 | Amber (#F59E0B) | Prototype/Pilot |
| SRL 5-6 | Green (#10B981) | Early/Growth |
| SRL 7-8 | Blue (#3B82F6) | Mainstream/Mature |
| SRL 9 | Purple (#8B5CF6) | Universal |

### Typography

- Headings: System UI font stack
- Body: 16px base, 1.6 line-height
- Code: Monospace font stack

## Search

Search is powered by [Pagefind](https://pagefind.app/), which creates a client-side search index at build time.

The search index is generated automatically via the `postbuild` script and works completely offline.

## Deployment

### Static Hosting

The built site (`dist/`) can be deployed to any static hosting:

- GitHub Pages
- Netlify
- Vercel
- Amazon S3
- Local file server

### USB/Offline Distribution

For offline distribution:

1. Build the site: `npm run build`
2. Copy the `dist/` folder to USB or network share
3. Open `dist/index.html` in any modern browser

## License

This reference site is part of the Metaverse Standards Forum research materials.
