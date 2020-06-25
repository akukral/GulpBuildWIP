const A11Y_OPTIONS = {
    runOnly: {
      type: 'tag',
      values: ['wcag2aa', 'section508', 'best-practice'],
    }
}

describe('A11y Checking', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.injectAxe() // make sure axe is available on the page
  })

  it('Has no detectable a11y violations on load', () => {
    cy.wait(3000);
    cy.checkA11y(A11Y_OPTIONS) // fail for a11y violations
  })
})
