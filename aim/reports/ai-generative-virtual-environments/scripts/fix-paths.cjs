#!/usr/bin/env node
/**
 * Post-build script to normalize site-internal URLs.
 * Converts absolute root URLs to relative URLs so navigation works from:
 * - GitHub Pages subpaths
 * - file:// offline viewing
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const rawSiteBase = process.env.SITE_BASE || '';
const siteBase = rawSiteBase ? `/${rawSiteBase.replace(/^\/+|\/+$/g, '')}` : '';

function getRelativePrefix(htmlPath) {
  // Calculate how many levels deep this file is from dist root.
  const relativePath = path.relative(distDir, path.dirname(htmlPath));
  if (!relativePath) return './';
  const depth = relativePath.split(path.sep).length;
  return '../'.repeat(depth);
}

function hasFileExtension(value) {
  return path.posix.extname(value) !== '';
}

function stripSiteBase(url) {
  if (!siteBase) return url;
  if (url === siteBase || url === `${siteBase}/`) return '/';
  if (url.startsWith(`${siteBase}/`)) {
    return url.slice(siteBase.length) || '/';
  }
  return url;
}

function rewriteUrl(value, prefix, attr) {
  if (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('//') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('#')
  ) {
    return value;
  }

  let url = stripSiteBase(value);
  if (!url.startsWith('/')) return url;

  const [pathWithQuery, hash = ''] = url.split('#');
  const [pathname, query = ''] = pathWithQuery.split('?');

  let normalized = pathname.replace(/^\/+/, '');
  if (!normalized) {
    if (attr !== 'href') return value;
    normalized = '';
  } else if (attr === 'href') {
    if (pathname.endsWith('/')) {
      // Keep directory URLs in output to avoid `/index.html` links.
      normalized = normalized;
    } else if (!hasFileExtension(normalized)) {
      normalized = `${normalized}/`;
    }
  }

  const querySuffix = query ? `?${query}` : '';
  const hashSuffix = hash ? `#${hash}` : '';
  return `${prefix}${normalized}${querySuffix}${hashSuffix}`;
}

function fixPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const prefix = getRelativePrefix(filePath);

  content = content.replace(/\b(href|src)="([^"]+)"/g, (_, attr, value) => {
    const rewritten = rewriteUrl(value, prefix, attr);
    return `${attr}="${rewritten}"`;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Fixed: ${path.relative(distDir, filePath)}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      fixPaths(filePath);
    }
  }
}

console.log(`Fixing paths for static hosting${siteBase ? ` (site base: ${siteBase})` : ''}...`);
walkDir(distDir);
console.log('Done!');
