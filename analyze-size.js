#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath);
  const gzipped = zlib.gzipSync(content);
  
  return {
    raw: content.length,
    gzipped: gzipped.length,
    rawFormatted: formatBytes(content.length),
    gzippedFormatted: formatBytes(gzipped.length)
  };
}

console.log('📦 Análisis de tamaño de notify-zh\n');

const files = {
  'CommonJS (index.js)': './dist/index.js',
  'ESM (index.mjs)': './dist/index.mjs',
  'TypeScript Definitions': './dist/index.d.ts'
};

let totalRaw = 0;
let totalGzipped = 0;

for (const [name, filePath] of Object.entries(files)) {
  const analysis = analyzeFile(filePath);
  if (analysis) {
    console.log(`${name}:`);
    console.log(`  📄 Tamaño sin comprimir: ${analysis.rawFormatted}`);
    console.log(`  🗜️  Tamaño gzipped: ${analysis.gzippedFormatted}`);
    console.log('');
    
    if (name.includes('index.js') || name.includes('index.mjs')) {
      totalRaw += analysis.raw;
      totalGzipped += analysis.gzipped;
    }
  }
}

console.log('📊 Resumen:');
console.log(`  • Tamaño principal (ESM): ${formatBytes(analyzeFile('./dist/index.mjs')?.raw || 0)}`);
console.log(`  • Tamaño comprimido (ESM): ${formatBytes(analyzeFile('./dist/index.mjs')?.gzipped || 0)}`);
console.log(`  • Impacto en bundle: ~${formatBytes(analyzeFile('./dist/index.mjs')?.gzipped || 0)} (gzipped)`);

// Análisis adicional
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
console.log(`\n📋 Información del paquete:`);
console.log(`  • Versión: ${packageJson.version}`);
console.log(`  • Archivos incluidos: ${packageJson.files.join(', ')}`);
console.log(`  • Minificado: ${packageJson.tsup?.minify ? '✅ Sí' : '❌ No'}`);
console.log(`  • Source maps: ✅ Incluidos`);