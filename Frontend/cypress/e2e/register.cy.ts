describe('register', () => {
  before(() => {
      cy.deleteUserFromDatabase()
  })

  after(() => {
      cy.deleteUserFromDatabase()
  })

  beforeEach(function () {
    cy.fixture("user").then((user) => {
      this.user = user;
    });

    cy.visit('/')
    cy.getById('register').click()
  })

  it('Ska misslyckas när inga fält är ifyllda', () => {
    cy.getById('registerSubmit').click()
    cy.contains('Namn saknas')
    cy.contains('Email saknas')
    cy.contains('Lösenord saknas')
  })

  it('Ska misslyckas när inget namn är ifyllt', function () {
    cy.getById('email').type(this.user.email)
    cy.getById('password').type(this.user.password)
    cy.getById('registerSubmit').click()
    cy.contains('Namn saknas')
  })

  it('Ska misslyckas när ingen email är ifylld', function () {
    cy.getById('name').type(this.user.name)
    cy.getById('password').type(this.user.password)
    cy.getById('registerSubmit').click()
    cy.contains('Email saknas')
  })

  it('Ska misslyckas när inget lösenord är ifyllt', function () {
    cy.getById('name').type(this.user.name)
    cy.getById('email').type(this.user.email)
    cy.getById('registerSubmit').click()
    cy.contains('Lösenord saknas')
  })

  it('Ska skapa ett användarkonto', function () {
    cy.deleteUserFromDatabase()
    cy.getById('name').type(this.user.name)
    cy.getById('email').type(this.user.email)
    cy.getById('password').type(this.user.password)
    cy.getById('registerSubmit').click()
    cy.getById('register-error').should('not.exist')
    cy.location('pathname').should('eq', '/')
  })

  it('Ska misslyckas med att skapa ett konto – användaren redan finns ', function () {
    cy.getById('name').type(this.user.name)
    cy.getById('email').type(this.user.email)
    cy.getById('password').type(this.user.password)
    cy.getById('registerSubmit').click()
    cy.getById('register-error').should('exist')
    cy.location('pathname').should('eq', '/register')
  })
})