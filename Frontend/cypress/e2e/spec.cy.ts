import { faker } from '@faker-js/faker'

const user = {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
}

describe('User Authentication', () => {

  it('should create an account for the user', () => {
    cy.visit('http://localhost:5173')
    cy.get('a[href="/register"]').click()
    cy.get('input[name="name"]').type(user.name)
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:5173/')
  })
})

describe('template spec', () => {

  it('fails', () => {
    cy.visit('http://localhost:5173')
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type('wrong password')
    cy.get('button[type="submit"]').click()
    cy.get('[data-test-id="login-error"]').contains('Wrong email or password')
  })

  it('passes', () => {
    cy.visit('http://localhost:5173')
    // cy.intercept('POST', 'http://127.0.0.1:5001/api/v1/user/login', {
    //   statusCode: 201,
    //   body: {
    //     status: 'success',
    //     data: {
    //       name: 'Peter Pan',
    //       email: '',
    //     },
    //   },
    // })
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:5173/dashboard')
  })
})

