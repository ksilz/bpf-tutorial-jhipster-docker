import { element, by, ElementFinder } from 'protractor';

export class AddressComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('bpf-address div table .btn-danger'));
  title = element.all(by.css('bpf-address div h2#page-heading span')).first();
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

export class AddressUpdatePage {
  pageTitle = element(by.id('bpf-address-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  addressLine1Input = element(by.id('field_addressLine1'));
  addressLine2Input = element(by.id('field_addressLine2'));
  cityInput = element(by.id('field_city'));
  postalCodeInput = element(by.id('field_postalCode'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAddressLine1Input(addressLine1: string): Promise<void> {
    await this.addressLine1Input.sendKeys(addressLine1);
  }

  async getAddressLine1Input(): Promise<string> {
    return await this.addressLine1Input.getAttribute('value');
  }

  async setAddressLine2Input(addressLine2: string): Promise<void> {
    await this.addressLine2Input.sendKeys(addressLine2);
  }

  async getAddressLine2Input(): Promise<string> {
    return await this.addressLine2Input.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode: string): Promise<void> {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput(): Promise<string> {
    return await this.postalCodeInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class AddressDeleteDialog {
  private dialogTitle = element(by.id('bpf-delete-address-heading'));
  private confirmButton = element(by.id('bpf-confirm-delete-address'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
