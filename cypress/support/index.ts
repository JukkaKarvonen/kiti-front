// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      appVisit(route: string): Chainable
    }
  }
}
