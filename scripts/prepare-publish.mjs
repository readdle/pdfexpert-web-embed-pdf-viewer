#!/usr/bin/env node
/**
 * CI-only: rewrite @embedpdf/<id> -> @readdle/embedpdf-<id> so published tarballs
 * use the @readdle scope while Git stays on upstream @embedpdf names.
 *
 * Run from pdfexpert-web-embed-pdf-viewer root. Uses Node built-ins only (safe before pnpm install).
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SKIP_DIR_NAMES = new Set([
  'node_modules',
  'dist',
  '.turbo',
  '.git',
  'pdfium-src',
  '.pnpm',
  '.husky',
  'coverage',
  '.cache',
  'out',
]);

/** Single segment after @embedpdf/ (npm package name). */
const SCOPE_PKG = /@embedpdf\/([a-zA-Z0-9._-]+)/g;

function replaceScopeAll(s) {
  return s.replace(SCOPE_PKG, '@readdle/embedpdf-$1');
}

/**
 * In source, replace only module-like quoted specifiers: '@readdle/embedpdf-pkg' or '@readdle/embedpdf-pkg/sub'.
 */
function replaceQuotedModuleSpecifiers(content) {
  return content.replace(
    /(['"])@embedpdf\/([a-zA-Z0-9._-]+)((?:\/[^'"]+?)?)\1/g,
    (match, quote, pkg, subpath) => `${quote}@readdle/embedpdf-${pkg}${subpath ?? ''}${quote}`,
  );
}

function transformJsonValue(v) {
  if (v === null || typeof v === 'undefined') return v;
  if (typeof v === 'string') return replaceScopeAll(v);
  if (typeof v !== 'object') return v;
  if (Array.isArray(v)) return v.map(transformJsonValue);
  const out = {};
  for (const [k, val] of Object.entries(v)) {
    const newKey = k.includes('@embedpdf/') ? replaceScopeAll(k) : k;
    out[newKey] = transformJsonValue(val);
  }
  return out;
}

/** After scope renames, point publishConfig at npmjs (pnpm publish honors per-package registry). */
function normalizePublishConfigForNpmjs(pkg) {
  if (!pkg || typeof pkg !== 'object' || !pkg.publishConfig || typeof pkg.publishConfig !== 'object') return;
  const pc = pkg.publishConfig;
  if (typeof pc.registry === 'string' && pc.registry.includes('npm.pkg.github.com')) {
    pc.registry = 'https://registry.npmjs.org';
  }
  pc.access = 'restricted';
}

async function* walkFiles(absDir, relDir = '') {
  const entries = await readdir(absDir, { withFileTypes: true });
  for (const ent of entries) {
    const name = ent.name;
    const abs = path.join(absDir, name);
    const rel = relDir ? path.join(relDir, name) : name;

    if (ent.isDirectory()) {
      if (SKIP_DIR_NAMES.has(name)) continue;
      yield* walkFiles(abs, rel);
    } else {
      yield { abs, rel };
    }
  }
}

const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.mts',
  '.cts',
  '.js',
  '.cjs',
  '.mjs',
  '.jsx',
  '.vue',
  '.svelte',
  '.mdx',
]);

async function main() {
  const pkgJsonFiles = [];
  const textFiles = [];

  for await (const { abs, rel } of walkFiles(ROOT)) {
    const base = path.basename(abs);
    if (base === 'package.json') {
      pkgJsonFiles.push({ abs, rel });
      continue;
    }
    const ext = path.extname(abs).toLowerCase();
    if (TEXT_EXTS.has(ext) || ext === '.json') {
      textFiles.push({ abs, rel });
    }
  }

  let changed = 0;

  for (const { abs, rel } of pkgJsonFiles) {
    const raw = await readFile(abs, 'utf8');
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      throw new Error(`Invalid JSON: ${rel}: ${e.message}`);
    }
    const next = transformJsonValue(data);
    normalizePublishConfigForNpmjs(next);
    const out = `${JSON.stringify(next, null, 2)}\n`;
    if (out !== raw) {
      await writeFile(abs, out, 'utf8');
      changed++;
      console.log(`updated ${rel}`);
    }
  }

  for (const { abs, rel } of textFiles) {
    if (path.basename(abs) === 'package.json') continue;
    const raw = await readFile(abs, 'utf8');
    if (!raw.includes('@embedpdf/')) continue;
    let next;
    if (rel.endsWith('.json')) {
      try {
        const data = JSON.parse(raw);
        next = `${JSON.stringify(transformJsonValue(data), null, 2)}\n`;
      } catch {
        next = replaceQuotedModuleSpecifiers(raw);
        if (next === raw) next = replaceScopeAll(raw);
      }
    } else {
      next = replaceQuotedModuleSpecifiers(raw);
    }
    if (next !== raw) {
      await writeFile(abs, next, 'utf8');
      changed++;
      console.log(`updated ${rel}`);
    }
  }

  console.log(`prepare-publish: ${changed} file(s) modified`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
