import { defineConfig } from 'tsup';

export default defineConfig({
    entryPoints: ['src/index.ts'],
    minify: true,
    format: ['cjs', 'esm'], // Changed from 'esm' to 'cjs'
    noExternal: [],
});
