// @ts-nocheck
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio vivo del sitio (notify-zh.com nunca se conectó) — alimenta el
  // sitemap; el canonical vive en Layout.astro.
  site: 'https://notify-zh.trely.agency',
  integrations: [sitemap()],
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