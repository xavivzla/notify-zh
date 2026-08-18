import { defineConfig } from 'tsup'

export default defineConfig([
  // Library build: ESM + CJS + types
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    minify: true,
    treeshake: true,
    target: 'es2018'
  },
  // Browser/CDN build: exposes window.notify (unpkg / jsdelivr)
  {
    entry: { index: 'src/global.ts' },
    format: ['iife'],
    globalName: 'notifyZh',
    sourcemap: false,
    minify: true,
    target: 'es2018'
  }
])
