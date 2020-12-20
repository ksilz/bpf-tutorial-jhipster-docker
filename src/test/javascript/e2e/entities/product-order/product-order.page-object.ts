import { element, by, ElementFinder } from 'protractor';

export class ProductOrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('bpf-product-order div table .btn-danger'));
  title = element.all(by.css('bpf-product-order div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
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

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAmountInput(amount: string): Promise<void> {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput(): Promise<string> {
    return await this.amountInput.getAttribute('value');
  }

  async buyerSelectLastOption(): Promise<void> {
    await this.buyerSelect.all(by.tagName('option')).last().click();
  }

  async buyerSelectOption(option: string): Promise<void> {
    await this.buyerSelect.sendKeys(option);
  }

  getBuyerSelect(): ElementFinder {
    return this.buyerSelect;
  }

  async getBuyerSelectedOption(): Promise<string> {
    return await this.buyerSelect.element(by.css('option:checked')).getText();
  }

  async productSelectLastOption(): Promise<void> {
    await this.productSelect.all(by.tagName('option')).last().click();
  }

  async productSelectOption(option: string): Promise<void> {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption(): Promise<string> {
    return await this.productSelect.element(by.css('option:checked')).getText();
  }

  async overallOrderSelectLastOption(): Promise<void> {
    await this.overallOrderSelect.all(by.tagName('option')).last().click();
  }

  async overallOrderSelectOption(option: string): Promise<void> {
    await this.overallOrderSelect.sendKeys(option);
  }

  getOverallOrderSelect(): ElementFinder {
    return this.overallOrderSelect;
  }

  async getOverallOrderSelectedOption(): Promise<string> {
    return await this.overallOrderSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProductOrderDeleteDialog {
  private dialogTitle = element(by.id('bpf-delete-productOrder-heading'));
  private confirmButton = element(by.id('bpf-confirm-delete-productOrder'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
