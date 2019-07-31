import { NgModule } from '@angular/core';

import { MySimpleShopSharedLibsModule, FindLanguageFromKeyPipe, BpfAlertComponent, BpfAlertErrorComponent } from './';

@NgModule({
  imports: [MySimpleShopSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, BpfAlertComponent, BpfAlertErrorComponent],
  exports: [MySimpleShopSharedLibsModule, FindLanguageFromKeyPipe, BpfAlertComponent, BpfAlertErrorComponent]
})
export class MySimpleShopSharedCommonModule {}
