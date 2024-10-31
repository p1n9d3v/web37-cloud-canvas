import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
    entryPoints: ['src/index.ts'],
    minify: true,
    format: ['cjs', 'esm'],
    ...options,
}));
