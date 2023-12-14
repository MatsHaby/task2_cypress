/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    getById(id: string): Chainable<Element>
    login(): Chainable<Element>
    deleteUserFromDatabase(): Chainable<Element>
    createUserInDatabase(): Chainable<Element>
  }
}

Cypress.Commands.add('getById', (testId: string) => {
  const selector = `[data-cy="${testId}"]`
  cy.get(selector)
})

Cypress.Commands.add('login', function() {
   cy.fixture("user").then((user) => {
      cy.getById('email').type(user.email)
      cy.getById('password').type(user.password)
      cy.getById('loginSubmit').click()
      cy.getById('login-error').should('not.exist')
      cy.location('pathname').should('eq', '/dashboard')
    });
})

Cypress.Commands.add('deleteUserFromDatabase', function () {
  cy.fixture("user").then((user) => {
    cy.request('POST', 'http://localhost:5001/api/v1/user/delete', {
        email: user.email
    })
  })
})

Cypress.Commands.add('createUserInDatabase', function () {
  cy.fixture("user").then((user) => {
    cy.request('POST', 'http://localhost:5001/api/v1/user', {
        name: user.name,
        email: user.email,
        password: user.password
    })
  })
})