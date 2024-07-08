// /cypress/support/index.d.ts
/// <reference  types="cypress" />
import './support/commands'

declare global {
  namespace Cypress {
    interface Chainable {
    }

    interface Cypress {
      env(key: 'API_URL'): string
      env(key: 'BASE_URL'): string
    }
  }
}
