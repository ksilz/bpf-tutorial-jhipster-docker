import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: './product/product.module#MySimpleShopProductModule'
      },
      {
        path: 'address',
        loadChildren: './address/address.module#MySimpleShopAddressModule'
      },
      {
        path: 'shopping-order',
        loadChildren: './shopping-order/shopping-order.module#MySimpleShopShoppingOrderModule'
      },
      {
        path: 'product-order',
        loadChildren: './product-order/product-order.module#MySimpleShopProductOrderModule'
      },
      {
        path: 'shipment',
        loadChildren: './shipment/shipment.module#MySimpleShopShipmentModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MySimpleShopEntityModule {}
