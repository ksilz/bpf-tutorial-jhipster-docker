import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MySimpleShopSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [MySimpleShopSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class MySimpleShopHomeModule {}
