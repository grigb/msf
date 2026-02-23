import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Static output for offline-capable site
  output: 'static',

  // MDX support for rich content pages
  integrations: [mdx()],

  // Build configuration for offline/file:// support
  build: {
    format: 'directory',  // Generates /page/index.html format
    assets: 'assets'      // Asset directory name
  },

  // Vite configuration for offline assets
  vite: {
    build: {
      // Don't inline assets - keep files separate for offline use
      assetsInlineLimit: 0,
      // Generate source maps for debugging
      sourcemap: false
    }
  },

  // GitHub Pages deployment at /msf/aim/reports/ai-generative-virtual-environments/
  site: 'https://grigbilham.com',
  base: '/msf/aim/reports/ai-generative-virtual-environments',

  // Ensure trailing slashes for directory-based routing
  trailingSlash: 'always',

  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
