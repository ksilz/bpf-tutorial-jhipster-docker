import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ShipmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('bpf-shipment div table .btn-danger'));
  title = element.all(by.css('bpf-shipment div h2#page-heading span')).first();

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

export class ShipmentUpdatePage {
  pageTitle = element(by.id('bpf-shipment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  shippedAtInput = element(by.id('field_shippedAt'));
  orderSelect = element(by.id('field_order'));
  shippedBySelect = element(by.id('field_shippedBy'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setShippedAtInput(shippedAt) {
    await this.shippedAtInput.sendKeys(shippedAt);
  }

  async getShippedAtInput() {
    return await this.shippedAtInput.getAttribute('value');
  }

  async orderSelectLastOption(timeout?: number) {
    await this.orderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async orderSelectOption(option) {
    await this.orderSelect.sendKeys(option);
  }

  getOrderSelect(): ElementFinder {
    return this.orderSelect;
  }

  async getOrderSelectedOption() {
    return await this.orderSelect.element(by.css('option:checked')).getText();
  }

  async shippedBySelectLastOption(timeout?: number) {
    await this.shippedBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async shippedBySelectOption(option) {
    await this.shippedBySelect.sendKeys(option);
  }

  getShippedBySelect(): ElementFinder {
    return this.shippedBySelect;
  }

  async getShippedBySelectedOption() {
    return await this.shippedBySelect.element(by.css('option:checked')).getText();
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

export class ShipmentDeleteDialog {
  private dialogTitle = element(by.id('bpf-delete-shipment-heading'));
  private confirmButton = element(by.id('bpf-confirm-delete-shipment'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
