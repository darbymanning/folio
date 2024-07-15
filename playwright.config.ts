import dotenv from "dotenv"
import { defineConfig, devices } from "@playwright/test"

dotenv.config({ path: ".env.test" })

const port = 7777

export default defineConfig({
  testDir: "./__tests__",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputDir: "./playwright-report" }]],
  use: { trace: "on" },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        contextOptions: { reducedMotion: "reduce" },
      },
    },
  ],
  webServer: {
    command: process.env.CI
      ? `bun run build && bunx vite preview --port ${port}`
      : `VITE_PORT=${port} bun dev`,
    port,
    reuseExistingServer: !process.env.CI,
  },
})
