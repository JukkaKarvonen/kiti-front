describe('Main Layout', () => {
  beforeEach(() => {
    cy.viewport(1200, 800)
    cy.appVisit('/')
  })

  it('displays the logo', () => {
    cy.get('img.logo-img').should('be.visible').and('have.attr', 'src').and('include', 'logo.png')
  })

  it('displays the app title', () => {
    cy.get('.q-toolbar__title').contains('Kiti')
  })

  it('displays the menu items', () => {
    const menuItems = ['Events', 'Competitions', 'Statistics', 'Records', 'Athletes', 'Info']
    menuItems.forEach((item) => {
      cy.contains(item).should('be.visible')
    })
  })

  it('displays the language switcher', () => {
    cy.get('.q-btn:visible').contains('en').should('be.visible')
    cy.get('.q-btn:visible').contains('fi').should('be.visible')
  })

  it('switches language when a language is selected', () => {
    cy.get('.q-btn').contains('fi').click()
    cy.contains('Tapahtumat').should('be.visible')
  })

  it('displays the login button', () => {
    cy.get('.q-btn').contains('Login').should('be.visible')
  })
})
