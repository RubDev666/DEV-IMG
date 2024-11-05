import { defineWorkspace } from 'vitest/config';
export default defineWorkspace([
    {
        test: {
            include: [
                './tests/browser/**/*.{test,spec}.ts',
            ],
            name: 'browser',
            environment: 'happy-dom',
            browser: {
                enabled: true,
                provider: 'playwright',
                name: 'chromium',
                headless: true /*user interface disabled*/,
            }
        },
    },
    {
        test: {
            include: [
                './tests/unit/**/*.{test,spec}.ts',
            ],
            name: 'unit',
            environment: 'node',
        },
    }    
])
