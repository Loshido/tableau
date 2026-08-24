import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';
import devtools from 'solid-devtools/vite';

export default defineConfig({
    plugins: [devtools(), solid(), tailwindcss()],
    server: {
        host: '0.0.0.0'
    },
    build: {
        target: 'esnext',
    },
    resolve: {
        tsconfigPaths: true
    }
});
