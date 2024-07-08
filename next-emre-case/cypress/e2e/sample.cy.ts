describe('Home Page', () => {
  it('Should render home page', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Welcome to Next.js!')
  })
 })
