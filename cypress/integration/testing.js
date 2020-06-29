/// <reference types="Cypress" />

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.reload(true)
  })

  it('Testing Clicking and Functionality - set the viewport size and dimension', () => {
    // https://on.cypress.io/viewport
    cy.wait(3000)

    cy.viewport(1024, 480)
    cy.get('#Menu').should('be.visible')
    cy.viewport(900, 480)

    // the navbar should have collapse since our screen is smaller
    cy.get('#Menu').should('not.be.visible')
    cy.get('.Nav__toggle').should('be.visible').click()
    cy.get('.Nav').find('a').should('be.visible')
    cy.get('.Nav__toggle').should('be.visible').click()
  })
})
