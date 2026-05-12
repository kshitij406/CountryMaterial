import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: './tests/test-results',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'tests/playwright-report', open: 'never' }]],

  use: {
    baseURL: 'http://localhost:3000',
    // Full-page screenshots saved per test
    screenshot: 'only-on-failure',
    // Generous timeout — Next.js SSR pages can be slow on first hit
    navigationTimeout: 15_000,
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Do NOT start a webServer — tests assume `pnpm start` is already running
})
