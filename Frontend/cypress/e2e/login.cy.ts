describe('login', () => {
  before(() => {
      cy.createUserInDatabase()
  })

  after(() => {
      cy.deleteUserFromDatabase()
  })

  beforeEach(function () {
    cy.fixture("user").then((user) => {
      this.user = user;
    });
    cy.visit('/')
  })

  it('Ska misslyckas att logga in när inga fält är ifyllda', () =>   {
    cy.getById('loginSubmit').click()
    cy.contains('Email saknas')
    cy.contains('Lösenord saknas')
  })

  it('Ska misslyckas att logga in när ingen email är ifylld', function () {
    cy.getById('password').type(this.user.password)
    cy.getById('loginSubmit').click()
    cy.contains('Email saknas')
  })

  it('Ska misslyckas att logga in när inget lösenord är ifyllt', function () {
    cy.getById('email').type(this.user.email)
    cy.getById('loginSubmit').click()
    cy.contains('Lösenord saknas')
  })

  it('Ska misslyckas att logga in med felaktigt lösenord', function () {
    cy.getById('email').type(this.user.email)
    cy.getById('password').type('felaktigtLösenord')
    cy.getById('loginSubmit').click()
    cy.getById('login-error').should('exist')
    cy.location('pathname').should('eq', '/')
  })

  it('Ska misslyckas att logga in med felaktig email', function () {
    cy.getById('email').type('felaktigEmail@felmail.com')
    cy.getById('password').type(this.user.password)
    cy.getById('loginSubmit').click()
    cy.getById('login-error').should('exist')
    cy.location('pathname').should('eq', '/')
  })

  it('Logga in med användarkonto', function () {
    cy.login()
  })
})