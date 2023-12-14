describe('change password', () => {
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
    cy.login()
    cy.getById('changePassword').click()
  })

  it('Ska misslyckas när inga fält är ifyllda', () => {
    cy.getById('changePasswordSubmit').click()
    cy.contains('Ange lösenord')
    cy.contains('Ange lösenordet igen')
  })

  it('Ska misslyckas när inget lösenord är ifyllt', function () {
    cy.getById('changePasswordInput').type(this.user.password)
    cy.getById('changePasswordSubmit').click()
    cy.contains('Ange lösenord')
    cy.contains('Ange lösenordet igen');
  })

  it('Ska misslyckas när inte bekräftande lösenord är ifyllt', function () {
    cy.getById('changePasswordAgainInput').type(this.user.password)
    cy.getById('changePasswordSubmit').click()
    cy.contains('Ange lösenord')
    cy.contains('Lösenorden matchar inte')
  })

  it('Ska misslyckas när lösenorden inte matchar', function () {
    cy.getById('changePasswordInput').type(this.user.password)
    cy.getById('changePasswordAgainInput').type('felaktigtLösenord')
    cy.getById('changePasswordSubmit').click()
    cy.contains('Lösenorden matchar inte')
  })

  it('Ska ändra lösenord', function () {
    cy.getById('changePasswordInput').type(this.user.password)
    cy.getById('changePasswordAgainInput').type(this.user.password)
    cy.getById('changePasswordSubmit').click()
    cy.location('pathname').should('eq', '/dashboard')
  })
})