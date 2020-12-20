import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ShoppingOrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('bpf-shopping-order div table .btn-danger'));
  title = element.all(by.css('bpf-shopping-order div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ShoppingOrderUpdatePage {
  pageTitle = element(by.id('bpf-shopping-order-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  totalAmountInput = element(by.id('field_totalAmount'));
  orderedInput = element(by.id('field_ordered'));
  buyerSelect = element(by.id('field_buyer'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setTotalAmountInput(totalAmount) {
    await this.totalAmountInput.sendKeys(totalAmount);
  }

  async getTotalAmountInput() {
    return await this.totalAmountInput.getAttribute('value');
  }

  async setOrderedInput(ordered) {
    await this.orderedInput.sendKeys(ordered);
  }

  async getOrderedInput() {
    return await this.orderedInput.getAttribute('value');
  }

  async buyerSelectLastOption(timeout?: number) {
    await this.buyerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async buyerSelectOption(option) {
    await this.buyerSelect.sendKeys(option);
  }

  getBuyerSelect(): ElementFinder {
    return this.buyerSelect;
  }

  async getBuyerSelectedOption() {
    return await this.buyerSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ShoppingOrderDeleteDialog {
  private dialogTitle = element(by.id('bpf-delete-shoppingOrder-heading'));
  private confirmButton = element(by.id('bpf-confirm-delete-shoppingOrder'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
