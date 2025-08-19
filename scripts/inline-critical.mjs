// scripts/inline-critical.mjs
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import Critters from 'critters';

const distDir = path.resolve('dist');
const htmlFile = path.join(distDir, 'index.html');

async function run() {
  const html = await readFile(htmlFile, 'utf8');

  const critters = new Critters({
    path: distDir,          // base para resolver CSS gerado pelo Vite
    preload: 'swap',        // evita flash de fontes
    inlineFonts: true,
    inlineThreshold: 0,     // sem limite de tamanho para CSS crítico inline
    pruneSource: true,      // remove do CSS externo o que foi inline
    reduceInlineStyles: true
  });

  const inlined = await critters.process(html);
  await writeFile(htmlFile, inlined, 'utf8');
  console.log('[critters] CSS crítico injetado em dist/index.html');
}

run().catch((e) => {
  console.error('[critters] falhou:', e);
  process.exit(1);
});
