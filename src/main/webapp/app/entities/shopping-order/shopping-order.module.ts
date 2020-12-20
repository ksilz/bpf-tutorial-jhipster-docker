import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MySimpleShopSharedModule } from 'app/shared/shared.module';
import { ShoppingOrderComponent } from './shopping-order.component';
import { ShoppingOrderDetailComponent } from './shopping-order-detail.component';
import { ShoppingOrderUpdateComponent } from './shopping-order-update.component';
import { ShoppingOrderDeleteDialogComponent } from './shopping-order-delete-dialog.component';
import { shoppingOrderRoute } from './shopping-order.route';

@NgModule({
  imports: [MySimpleShopSharedModule, RouterModule.forChild(shoppingOrderRoute)],
  declarations: [ShoppingOrderComponent, ShoppingOrderDetailComponent, ShoppingOrderUpdateComponent, ShoppingOrderDeleteDialogComponent],
  entryComponents: [ShoppingOrderDeleteDialogComponent],
})
export class MySimpleShopShoppingOrderModule {}
