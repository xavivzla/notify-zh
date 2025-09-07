// @ts-nocheck
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  typescript: {
    allowJs: true,
    strict: false,
    strictNullChecks: false,
    noImplicitAny: false
  },
  vite: {
    plugins: [tailwindcss()],
    esbuild: {
      jsx: 'preserve',
      jsxInject: `import React from 'react'`,
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      target: 'es2020',
      format: 'esm'
    }
  }
});