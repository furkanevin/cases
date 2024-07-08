import { defineConfig } from 'cypress'

// @type {Cypress.PluginConfig}
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3002/',
    experimentalStudio: true,

    // testIsolation: false,
    env: {
      uncaughtCypressException: false,
      hideXhr: true
    },
    chromeWebSecurity: false,
    retries: {
      runMode: 1,
      openMode: 0
    }
  }
})
