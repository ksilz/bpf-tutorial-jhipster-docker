import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.MySimpleShopProductModule),
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.MySimpleShopAddressModule),
      },
      {
        path: 'shopping-order',
        loadChildren: () => import('./shopping-order/shopping-order.module').then(m => m.MySimpleShopShoppingOrderModule),
      },
      {
        path: 'product-order',
        loadChildren: () => import('./product-order/product-order.module').then(m => m.MySimpleShopProductOrderModule),
      },
      {
        path: 'shipment',
        loadChildren: () => import('./shipment/shipment.module').then(m => m.MySimpleShopShipmentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MySimpleShopEntityModule {}
