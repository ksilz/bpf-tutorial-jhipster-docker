import { element, by, ElementFinder } from 'protractor';

export class ShoppingOrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('bpf-shopping-order div table .btn-danger'));
  title = element.all(by.css('bpf-shopping-order div h2#page-heading span')).first();
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

export class ShoppingOrderUpdatePage {
  pageTitle = element(by.id('bpf-shopping-order-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  totalAmountInput = element(by.id('field_totalAmount'));
  orderedInput = element(by.id('field_ordered'));

  buyerSelect = element(by.id('field_buyer'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setTotalAmountInput(totalAmount: string): Promise<void> {
    await this.totalAmountInput.sendKeys(totalAmount);
  }

  async getTotalAmountInput(): Promise<string> {
    return await this.totalAmountInput.getAttribute('value');
  }

  async setOrderedInput(ordered: string): Promise<void> {
    await this.orderedInput.sendKeys(ordered);
  }

  async getOrderedInput(): Promise<string> {
    return await this.orderedInput.getAttribute('value');
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

export class ShoppingOrderDeleteDialog {
  private dialogTitle = element(by.id('bpf-delete-shoppingOrder-heading'));
  private confirmButton = element(by.id('bpf-confirm-delete-shoppingOrder'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
