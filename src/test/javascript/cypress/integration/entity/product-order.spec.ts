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

describe('ProductOrder e2e test', () => {
  const productOrderPageUrl = '/product-order';
  const productOrderPageUrlPattern = new RegExp('/product-order(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const productOrderSample = { amount: 3 };

  let productOrder: any;
  //let user: any;
  //let product: any;
  //let shoppingOrder: any;

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
      body: {"login":"Circles panel Right-sized","firstName":"Jake","lastName":"Gleason"},
    }).then(({ body }) => {
      user = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/products',
      body: {"name":"compress Account bandwidth","price":59558,"description":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=","picture":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","pictureContentType":"unknown","specification":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","specificationContentType":"unknown","category":"Laptop","inventory":81737},
    }).then(({ body }) => {
      product = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/shopping-orders',
      body: {"name":"Liaison Lead real-time","totalAmount":5049,"ordered":"2021-06-14"},
    }).then(({ body }) => {
      shoppingOrder = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/product-orders+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/product-orders').as('postEntityRequest');
    cy.intercept('DELETE', '/api/product-orders/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: [product],
    });

    cy.intercept('GET', '/api/shopping-orders', {
      statusCode: 200,
      body: [shoppingOrder],
    });

  });
   */

  afterEach(() => {
    if (productOrder) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/product-orders/${productOrder.id}`,
      }).then(() => {
        productOrder = undefined;
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
    if (product) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/products/${product.id}`,
      }).then(() => {
        product = undefined;
      });
    }
    if (shoppingOrder) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/shopping-orders/${shoppingOrder.id}`,
      }).then(() => {
        shoppingOrder = undefined;
      });
    }
  });
   */

  it('ProductOrders menu should load ProductOrders page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('product-order');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ProductOrder').should('exist');
    cy.url().should('match', productOrderPageUrlPattern);
  });

  describe('ProductOrder page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(productOrderPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ProductOrder page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/product-order/new$'));
        cy.getEntityCreateUpdateHeading('ProductOrder');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', productOrderPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/product-orders',
  
          body: {
            ...productOrderSample,
            buyer: user,
            product: product,
            overallOrder: shoppingOrder,
          },
        }).then(({ body }) => {
          productOrder = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/product-orders+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [productOrder],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(productOrderPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(productOrderPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response!.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details ProductOrder page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('productOrder');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', productOrderPageUrlPattern);
      });

      it('edit button click should load edit ProductOrder page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ProductOrder');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', productOrderPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of ProductOrder', () => {
        cy.intercept('GET', '/api/product-orders/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('productOrder').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', productOrderPageUrlPattern);

        productOrder = undefined;
      });
    });
  });

  describe('new ProductOrder page', () => {
    beforeEach(() => {
      cy.visit(`${productOrderPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('ProductOrder');
    });

    it.skip('should create an instance of ProductOrder', () => {
      cy.get(`[data-cy="amount"]`).type('1').should('have.value', '1');

      cy.get(`[data-cy="buyer"]`).select(1);
      cy.get(`[data-cy="product"]`).select(1);
      cy.get(`[data-cy="overallOrder"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        productOrder = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', productOrderPageUrlPattern);
    });
  });
});
