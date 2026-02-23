#!/usr/bin/env node
/**
 * Post-build script to fix paths for offline/file:// access
 * Converts absolute paths to relative paths in all HTML files
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

function getRelativePrefix(htmlPath) {
  // Calculate how many levels deep this file is from dist root
  const relativePath = path.relative(distDir, path.dirname(htmlPath));
  if (!relativePath) return './';
  const depth = relativePath.split(path.sep).length;
  return '../'.repeat(depth);
}

function fixPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const prefix = getRelativePrefix(filePath);

  // Fix asset paths: /./assets/ or /assets/ -> ./assets/ or ../assets/
  content = content.replace(/href="\/\.?\/assets\//g, `href="${prefix}assets/`);
  content = content.replace(/src="\/\.?\/assets\//g, `src="${prefix}assets/`);

  // Fix navigation links: href="/" -> href="./index.html" or href="../index.html"
  content = content.replace(/href="\/"/g, `href="${prefix}index.html"`);

  // Fix section links: href="/scope/" -> href="./scope/" or href="../scope/"
  content = content.replace(/href="\/([a-z-]+)\/"/g, `href="${prefix}$1/index.html"`);

  // Fix implementation links: href="/implementations/xyz/" -> relative path
  content = content.replace(/href="\/implementations\/([a-z0-9-]+)\/"/g, `href="${prefix}implementations/$1/index.html"`);

  // Fix pagefind path
  content = content.replace(/href="\.\/pagefind\//g, `href="${prefix}pagefind/`);

  // Fix any remaining absolute paths starting with /
  content = content.replace(/href="\/([^"]+)"/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('#')) return match;
    return `href="${prefix}${p1}"`;
  });

  content = content.replace(/src="\/([^"]+)"/g, (match, p1) => {
    if (p1.startsWith('http')) return match;
    return `src="${prefix}${p1}"`;
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

console.log('Fixing paths for offline access...');
walkDir(distDir);
console.log('Done!');
