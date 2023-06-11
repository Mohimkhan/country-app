import { defineConfig } from 'vite';

export default defineConfig({
    base: '/',
    assetsDir: '',
    build: {
        rollupOptions: {
            input: {
                index: './index.html',
                country: './pages/country.html',
                // Add more HTML files here if needed
            },
        },
    },
});
