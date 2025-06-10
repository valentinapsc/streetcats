import { defineConfig } from '@playwright/test';

export default defineConfig({
  // dove trovare i test
  testDir: './tests/e2e',
  // BaseURL dell' app Angular
  use: {
    baseURL: 'http://localhost:4200',
    headless: true,          // o false per debug visivo
    viewport: { width: 1280, height: 720 },
  },
});
