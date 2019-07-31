import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('bpf-product div table .btn-danger'));
  title = element.all(by.css('bpf-product div h2#page-heading span')).first();

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

export class ProductUpdatePage {
  pageTitle = element(by.id('bpf-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  priceInput = element(by.id('field_price'));
  descriptionInput = element(by.id('field_description'));
  pictureInput = element(by.id('file_picture'));
  specificationInput = element(by.id('file_specification'));
  categorySelect = element(by.id('field_category'));
  inventoryInput = element(by.id('field_inventory'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return await this.priceInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setPictureInput(picture) {
    await this.pictureInput.sendKeys(picture);
  }

  async getPictureInput() {
    return await this.pictureInput.getAttribute('value');
  }

  async setSpecificationInput(specification) {
    await this.specificationInput.sendKeys(specification);
  }

  async getSpecificationInput() {
    return await this.specificationInput.getAttribute('value');
  }

  async setCategorySelect(category) {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect() {
    return await this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption(timeout?: number) {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setInventoryInput(inventory) {
    await this.inventoryInput.sendKeys(inventory);
  }

  async getInventoryInput() {
    return await this.inventoryInput.getAttribute('value');
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

export class ProductDeleteDialog {
  private dialogTitle = element(by.id('bpf-delete-product-heading'));
  private confirmButton = element(by.id('bpf-confirm-delete-product'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
