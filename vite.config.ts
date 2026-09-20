/// <reference types="vitest/config" />
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
        css: false,
        exclude: ['node_modules/**', 'lib/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'src/**/*.stories.tsx',
                'src/**/*.test.{ts,tsx}',
                'src/**/*.d.ts',
                'src/setupTests.ts',
                'src/index.ts',
                'src/**/data/**',
                'src/**/*.stories.mdx'
            ]
        }
    },
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
