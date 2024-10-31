import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
    entryPoints: ['src/index.ts'],
    outDir: '../cli/dist/server',
    minify: true,
    format: ['cjs', 'esm'],
    ...options,
}));
