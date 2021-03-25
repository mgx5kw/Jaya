
const searchModule = require('../page-objects/search')

beforeEach(function () {
    cy.visit('https://www.zoopla.co.uk/')
    cy.get(searchModule.elements.acceptCookie).click()
})

describe("Register for daily email updates on rental property and change the frequency of an existing email update", function () {
    it('Rental property in London for 1 bed properties between £800 and £1000 per month', function () {
        cy.get(searchModule.elements.login).first().click()
        cy.signup()
        cy.get('#fancybox-close').click()
        cy.get(searchModule.elements.headerMenu.toRent).click()
        cy.get(searchModule.elements.searchModal.location).click({ force: true })
        cy.get(searchModule.elements.searchModal.location).type(`London`)
        cy.get(searchModule.elements.searchModal.firstResult).click()
        cy.get(searchModule.elements.searchModal.minPrice).select('800')
        cy.get(searchModule.elements.searchModal.maxPrice).select('1000')
        cy.get(searchModule.elements.searchModal.bedrooms).select('1')
        cy.get(searchModule.elements.searchModal.searchSubmit).click() 
        cy.get(searchModule.elements.saveSearch).click()  
        cy.get(searchModule.elements.searchModal.manage).click()  
    })
    it('Change the frequency of an existing email update', function(){
        cy.get(searchModule.elements.alertFrequency).last().select("3")
    })
})

describe('Search for a particular property in the house prices search and confirm that it appears as the first result', function () {
    it('Search houses for sale including the key word “garage” and check that results have garages.', function () {
        cy.get(searchModule.elements.headerMenu.housePrices).click()
        cy.get(searchModule.elements.searchModal.location).click({ force: true })
        cy.get(searchModule.elements.searchModal.location).type('garage')
        cy.get(searchModule.elements.searchModal.firstResult).click()
        cy.get(searchModule.elements.searchModal.searchSubmit).click()
    })

    it('Save a search for property within 15 minutes drive of SE1 2LH.', function () {
        cy.get(searchModule.elements.login).first().click()
        cy.auto_login()
        cy.get(searchModule.elements.headerMenu.toRentTravelTime).click({ force: true })
        cy.get(searchModule.elements.searchModal.location).type('SE1 2LH')
        cy.get(searchModule.elements.searchModal.duration).select('900')
        cy.get(searchModule.elements.searchModal.transport).select('driving')
        cy.get(searchModule.elements.searchModal.searchSubmit).click()
        cy.get(searchModule.elements.saveSearch).click()        
    })
    it('Check that saved searches can be retrieved', function () {
        cy.get(searchModule.elements.searchModal.return).click()

    })
})
