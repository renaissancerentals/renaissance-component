import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'lib',
        lib: {
            entry: 'src/index.ts',
            name: 'RenaissanceComponent',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            // externalize deps that shouldn't be bundled
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
