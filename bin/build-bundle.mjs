#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'

import esbuild from 'esbuild'
import babel from 'esbuild-plugin-babel'

const JSBASH_ROOT = new URL('../', import.meta.url)
const PACKAGES_ROOT = new URL('./packages/', JSBASH_ROOT)

function buildBundle (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return esbuild.build({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  });
}

await fs.mkdir(new URL('./@JSBASH/locales/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./JSBASH/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  buildBundle(
    './packages/JSBASH/bundle.mjs',
    './packages/JSBASH/dist/JSBASH.min.js',
    { standalone: 'JSBASH', format: 'iife' },
  ),
  buildBundle(
    './packages/JSBASH/bundle.mjs',
    './packages/JSBASH/dist/JSBASH.min.js',
    { standalone: 'JSBASH', format: 'iife' },
  ),
  buildBundle(
    './packages/JSBASH/bundle-legacy.mjs',
    './packages/JSBASH/dist/JSBASH.legacy.min.js',
    {
      standalone: 'JSBASH (with polyfills)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: false,
          highlightCode: false,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
  buildBundle(
    './packages/JSBASH/index.mjs',
    './packages/JSBASH/dist/JSBASH.min.mjs',
    { standalone: 'JSBASH (ESM)', format: 'esm' },
  ),
]

const localesModules = await fs.opendir(new URL('./@JSBASH/locales/src/', PACKAGES_ROOT))
for await (const dirent of localesModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      buildBundle(
        `./packages/@JSBASH/locales/src/${localeName}.js`,
        `./packages/@JSBASH/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}

const showcase = true;
// Add BUNDLE-README.MD
methods.push(
  fs.copyFile(
    new URL('./BUNDLEREADME.md', JSBASH_ROOT),
    new URL('./JSBASH/dist/README.md', PACKAGES_ROOT),
  ),
)

