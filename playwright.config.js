import { defineConfig } from "@playwright/test";

const port = Number(process.env.TEST_PORT || 4175);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  timeout: 45_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL, browserName: "chromium", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "wide", use: { viewport: { width: 1920, height: 1080 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } }
  ],
  webServer: {
    command: `node node_modules/wrangler/bin/wrangler.js pages dev dist --ip 127.0.0.1 --port ${port} --inspector-port 0 --show-interactive-dev-session=false`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
    env: { WRANGLER_SEND_METRICS: "false" }
  }
});