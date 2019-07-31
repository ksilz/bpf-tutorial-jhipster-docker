import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MySimpleShopSharedCommonModule, BpfLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MySimpleShopSharedCommonModule],
  declarations: [BpfLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [BpfLoginModalComponent],
  exports: [MySimpleShopSharedCommonModule, BpfLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MySimpleShopSharedModule {
  static forRoot() {
    return {
      ngModule: MySimpleShopSharedModule
    };
  }
}
