import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('ShoppingOrder e2e test', () => {
  const shoppingOrderPageUrl = '/shopping-order';
  const shoppingOrderPageUrlPattern = new RegExp('/shopping-order(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const shoppingOrderSample = { name: 'Mews Fresh deliverables' };

  let shoppingOrder: any;
  //let user: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {"login":"indigo","firstName":"Columbus","lastName":"Huels"},
    }).then(({ body }) => {
      user = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/shopping-orders+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/shopping-orders').as('postEntityRequest');
    cy.intercept('DELETE', '/api/shopping-orders/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/product-orders', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

    cy.intercept('GET', '/api/shipments', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (shoppingOrder) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/shopping-orders/${shoppingOrder.id}`,
      }).then(() => {
        shoppingOrder = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (user) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then(() => {
        user = undefined;
      });
    }
  });
   */

  it('ShoppingOrders menu should load ShoppingOrders page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('shopping-order');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ShoppingOrder').should('exist');
    cy.url().should('match', shoppingOrderPageUrlPattern);
  });

  describe('ShoppingOrder page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(shoppingOrderPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ShoppingOrder page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/shopping-order/new$'));
        cy.getEntityCreateUpdateHeading('ShoppingOrder');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingOrderPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/shopping-orders',
  
          body: {
            ...shoppingOrderSample,
            buyer: user,
          },
        }).then(({ body }) => {
          shoppingOrder = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/shopping-orders+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [shoppingOrder],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(shoppingOrderPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(shoppingOrderPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response!.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details ShoppingOrder page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('shoppingOrder');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingOrderPageUrlPattern);
      });

      it('edit button click should load edit ShoppingOrder page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ShoppingOrder');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingOrderPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of ShoppingOrder', () => {
        cy.intercept('GET', '/api/shopping-orders/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('shoppingOrder').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', shoppingOrderPageUrlPattern);

        shoppingOrder = undefined;
      });
    });
  });

  describe('new ShoppingOrder page', () => {
    beforeEach(() => {
      cy.visit(`${shoppingOrderPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('ShoppingOrder');
    });

    it.skip('should create an instance of ShoppingOrder', () => {
      cy.get(`[data-cy="name"]`).type('Ball Ergonomic').should('have.value', 'Ball Ergonomic');

      cy.get(`[data-cy="totalAmount"]`).type('49922').should('have.value', '49922');

      cy.get(`[data-cy="ordered"]`).type('2021-06-14').should('have.value', '2021-06-14');

      cy.get(`[data-cy="buyer"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        shoppingOrder = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', shoppingOrderPageUrlPattern);
    });
  });
});
