import { defineConfig } from 'vite';
// import { resolve } from 'path';

export default defineConfig({
    base: '/',
    assetsDir: '',
    build: {
        rollupOptions: {
            input: {
                index: './index.html',
                country: './pages/country.html',
                // Add more HTML files here if needed
                // main: (path.resolve(__dirname, '.js/'))
                main: './**js/*.js'
            },
            output: {
                format: 'cjs', // Transpile code as CommonJS
            },
        },
    },
});


// export default defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, './js/*.js'),
//       },
//     },
//   },
//   css: {
//     postcss: {
//       plugins: [],
//     },
//   },
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './js'),
//     },
//   },
// });
