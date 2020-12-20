import { element, by, ElementFinder } from 'protractor';

export class ShipmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('bpf-shipment div table .btn-danger'));
  title = element.all(by.css('bpf-shipment div h2#page-heading span')).first();
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

export class ShipmentUpdatePage {
  pageTitle = element(by.id('bpf-shipment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  shippedAtInput = element(by.id('field_shippedAt'));

  orderSelect = element(by.id('field_order'));
  shippedBySelect = element(by.id('field_shippedBy'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setShippedAtInput(shippedAt: string): Promise<void> {
    await this.shippedAtInput.sendKeys(shippedAt);
  }

  async getShippedAtInput(): Promise<string> {
    return await this.shippedAtInput.getAttribute('value');
  }

  async orderSelectLastOption(): Promise<void> {
    await this.orderSelect.all(by.tagName('option')).last().click();
  }

  async orderSelectOption(option: string): Promise<void> {
    await this.orderSelect.sendKeys(option);
  }

  getOrderSelect(): ElementFinder {
    return this.orderSelect;
  }

  async getOrderSelectedOption(): Promise<string> {
    return await this.orderSelect.element(by.css('option:checked')).getText();
  }

  async shippedBySelectLastOption(): Promise<void> {
    await this.shippedBySelect.all(by.tagName('option')).last().click();
  }

  async shippedBySelectOption(option: string): Promise<void> {
    await this.shippedBySelect.sendKeys(option);
  }

  getShippedBySelect(): ElementFinder {
    return this.shippedBySelect;
  }

  async getShippedBySelectedOption(): Promise<string> {
    return await this.shippedBySelect.element(by.css('option:checked')).getText();
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

export class ShipmentDeleteDialog {
  private dialogTitle = element(by.id('bpf-delete-shipment-heading'));
  private confirmButton = element(by.id('bpf-confirm-delete-shipment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
