import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('ShoppingOrder e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load ShoppingOrders', () => {
    cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('ShoppingOrder').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details ShoppingOrder page', () => {
    cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('shoppingOrder');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create ShoppingOrder page', () => {
    cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('ShoppingOrder');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit ShoppingOrder page', () => {
    cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('ShoppingOrder');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  /* this test is commented because it contains required relationships
  it('should create an instance of ShoppingOrder', () => {
    cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequest')
      .then(({ request, response }) => startingEntitiesCount = response.body.length);
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('ShoppingOrder');

    cy.get(`[data-cy="name"]`).type('connecting systems deposit', { force: true }).invoke('val').should('match', new RegExp('connecting systems deposit'));


    cy.get(`[data-cy="totalAmount"]`).type('53122').should('have.value', '53122');


    cy.get(`[data-cy="ordered"]`).type('2021-06-14').should('have.value', '2021-06-14');

    cy.setFieldSelectToLastOfEntity('buyer');

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });
  */

  /* this test is commented because it contains required relationships
  it('should delete last instance of ShoppingOrder', () => {
    cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequest');
    cy.intercept('GET', '/api/shopping-orders/*').as('dialogDeleteRequest');
    cy.intercept('DELETE', '/api/shopping-orders/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('shoppingOrder').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/shopping-orders*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('shopping-order');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
  */
});
