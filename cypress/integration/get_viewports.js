/// <reference types="Cypress" />

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.reload(true)
  })

  it('cy.viewport() - set the viewport size and dimension', () => {
    // https://on.cypress.io/viewport
    cy.wait(3000)

    // cy.viewport() accepts a set of preset sizes
    // to easily set the screen to a device's width and height

    // We added a cy.wait() between each viewport change so you can see
    // the change otherwise it is a little too fast to see :)

    cy.viewport('macbook-15')
    cy.wait(200)
    cy.screenshot('macbook-15',{
      capture:'viewport',
    })

    cy.viewport('macbook-11')
    cy.wait(200)
    cy.screenshot('macbook-11',{
      capture:'viewport',
    })

    cy.viewport('ipad-2')
    cy.wait(200)
    cy.screenshot('ipad-2',{
      capture:'viewport',
    })

    cy.viewport('iphone-6+')
    cy.wait(200)
    cy.screenshot('iphone-6+',{
      capture:'viewport',
    })

    cy.viewport('iphone-xr')
    cy.wait(200)
    cy.screenshot('iphone-xr',{
      capture:'viewport',
    })

    cy.viewport('iphone-3')
    cy.wait(200)
    cy.screenshot('iphone-3',{
      capture:'viewport',
    })

    // cy.viewport() accepts an orientation for all presets
    // the default orientation is 'portrait'

    cy.viewport('ipad-2', 'landscape')
    cy.wait(200)
    cy.screenshot('ipad-2xlandscape',{
      capture:'viewport',
    })

    cy.viewport('iphone-6', 'landscape')
    cy.wait(200)
    cy.screenshot('iphone-6+xlandscape',{
      capture:'viewport',
    })

    // The viewport will be reset back to the default dimensions
    // in between tests (the  default can be set in cypress.json)
  })
})
