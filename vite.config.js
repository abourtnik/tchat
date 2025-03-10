import { defineConfig } from "vite";
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
        },
    },
    plugins: [
        laravel({
            input: ['resources/js/main.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss()
    ],
});
