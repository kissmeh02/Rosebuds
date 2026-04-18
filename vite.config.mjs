import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const htmlInputs = Object.fromEntries(
  readdirSync(__dirname)
    .filter((f) => f.endsWith('.html'))
    .map((file) => {
      const name = file.replace(/\.html$/i, '');
      return [name, resolve(__dirname, file)];
    }),
);

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlInputs,
    },
  },
});
