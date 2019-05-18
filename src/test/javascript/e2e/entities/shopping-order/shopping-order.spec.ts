/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShoppingOrderComponentsPage, ShoppingOrderDeleteDialog, ShoppingOrderUpdatePage } from './shopping-order.page-object';

const expect = chai.expect;

describe('ShoppingOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let shoppingOrderUpdatePage: ShoppingOrderUpdatePage;
  let shoppingOrderComponentsPage: ShoppingOrderComponentsPage;
  /*let shoppingOrderDeleteDialog: ShoppingOrderDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ShoppingOrders', async () => {
    await navBarPage.goToEntity('shopping-order');
    shoppingOrderComponentsPage = new ShoppingOrderComponentsPage();
    await browser.wait(ec.visibilityOf(shoppingOrderComponentsPage.title), 5000);
    expect(await shoppingOrderComponentsPage.getTitle()).to.eq('mySimpleShopApp.shoppingOrder.home.title');
  });

  it('should load create ShoppingOrder page', async () => {
    await shoppingOrderComponentsPage.clickOnCreateButton();
    shoppingOrderUpdatePage = new ShoppingOrderUpdatePage();
    expect(await shoppingOrderUpdatePage.getPageTitle()).to.eq('mySimpleShopApp.shoppingOrder.home.createOrEditLabel');
    await shoppingOrderUpdatePage.cancel();
  });

  /* it('should create and save ShoppingOrders', async () => {
        const nbButtonsBeforeCreate = await shoppingOrderComponentsPage.countDeleteButtons();

        await shoppingOrderComponentsPage.clickOnCreateButton();
        await promise.all([
            shoppingOrderUpdatePage.setNameInput('name'),
            shoppingOrderUpdatePage.setTotalAmountInput('5'),
            shoppingOrderUpdatePage.setOrderedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            shoppingOrderUpdatePage.buyerSelectLastOption(),
        ]);
        expect(await shoppingOrderUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await shoppingOrderUpdatePage.getTotalAmountInput()).to.eq('5', 'Expected totalAmount value to be equals to 5');
        expect(await shoppingOrderUpdatePage.getOrderedInput()).to.contain('2001-01-01T02:30', 'Expected ordered value to be equals to 2000-12-31');
        await shoppingOrderUpdatePage.save();
        expect(await shoppingOrderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await shoppingOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last ShoppingOrder', async () => {
        const nbButtonsBeforeDelete = await shoppingOrderComponentsPage.countDeleteButtons();
        await shoppingOrderComponentsPage.clickOnLastDeleteButton();

        shoppingOrderDeleteDialog = new ShoppingOrderDeleteDialog();
        expect(await shoppingOrderDeleteDialog.getDialogTitle())
            .to.eq('mySimpleShopApp.shoppingOrder.delete.question');
        await shoppingOrderDeleteDialog.clickOnConfirmButton();

        expect(await shoppingOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
