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

describe('ProductOrder e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/product-orders*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load ProductOrders', () => {
    cy.intercept('GET', '/api/product-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('ProductOrder').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details ProductOrder page', () => {
    cy.intercept('GET', '/api/product-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('productOrder');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create ProductOrder page', () => {
    cy.intercept('GET', '/api/product-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('ProductOrder');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit ProductOrder page', () => {
    cy.intercept('GET', '/api/product-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('ProductOrder');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  /* this test is commented because it contains required relationships
  it('should create an instance of ProductOrder', () => {
    cy.intercept('GET', '/api/product-orders*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequest')
      .then(({ request, response }) => startingEntitiesCount = response.body.length);
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('ProductOrder');

    cy.get(`[data-cy="amount"]`).type('2').should('have.value', '2');

    cy.setFieldSelectToLastOfEntity('buyer');

    cy.setFieldSelectToLastOfEntity('product');

    cy.setFieldSelectToLastOfEntity('overallOrder');

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/product-orders*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });
  */

  /* this test is commented because it contains required relationships
  it('should delete last instance of ProductOrder', () => {
    cy.intercept('GET', '/api/product-orders*').as('entitiesRequest');
    cy.intercept('GET', '/api/product-orders/*').as('dialogDeleteRequest');
    cy.intercept('DELETE', '/api/product-orders/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('productOrder').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/product-orders*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('product-order');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
  */
});
