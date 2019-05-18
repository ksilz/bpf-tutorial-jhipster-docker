import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProductOrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('bpf-product-order div table .btn-danger'));
  title = element.all(by.css('bpf-product-order div h2#page-heading span')).first();

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

export class ProductOrderUpdatePage {
  pageTitle = element(by.id('bpf-product-order-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  amountInput = element(by.id('field_amount'));
  buyerSelect = element(by.id('field_buyer'));
  productSelect = element(by.id('field_product'));
  overallOrderSelect = element(by.id('field_overallOrder'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return await this.amountInput.getAttribute('value');
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

  async productSelectLastOption(timeout?: number) {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option) {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption() {
    return await this.productSelect.element(by.css('option:checked')).getText();
  }

  async overallOrderSelectLastOption(timeout?: number) {
    await this.overallOrderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async overallOrderSelectOption(option) {
    await this.overallOrderSelect.sendKeys(option);
  }

  getOverallOrderSelect(): ElementFinder {
    return this.overallOrderSelect;
  }

  async getOverallOrderSelectedOption() {
    return await this.overallOrderSelect.element(by.css('option:checked')).getText();
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

export class ProductOrderDeleteDialog {
  private dialogTitle = element(by.id('bpf-delete-productOrder-heading'));
  private confirmButton = element(by.id('bpf-confirm-delete-productOrder'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
