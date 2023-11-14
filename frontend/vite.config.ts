/// <reference types="vitest"/>
/// <reference types="vite/client"/>
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
        css: true,
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
            {
                find: '@assets',
                replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
            },
            {
                find: '@components',
                replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
            },
            {
                find: '@views',
                replacement: fileURLToPath(new URL('./src/views', import.meta.url)),
            },
            {
                find: '@types',
                replacement: fileURLToPath(new URL('./src/types', import.meta.url)),
            },
            {
                find: '@styles',
                replacement: fileURLToPath(new URL('./src/styles', import.meta.url)),
            },
            {
                find: '@stores',
                replacement: fileURLToPath(new URL('./src/stores', import.meta.url)),
            },
            {
                find: '@hooks',
                replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
            },
            {
                find: '@store',
                replacement: fileURLToPath(new URL('./src/store', import.meta.url)),
            },
        ],
    },
});
