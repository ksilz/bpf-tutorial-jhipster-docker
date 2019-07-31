import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from './shopping-order.service';
import { ShoppingOrderComponent } from './shopping-order.component';
import { ShoppingOrderDetailComponent } from './shopping-order-detail.component';
import { ShoppingOrderUpdateComponent } from './shopping-order-update.component';
import { ShoppingOrderDeletePopupComponent } from './shopping-order-delete-dialog.component';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';

@Injectable({ providedIn: 'root' })
export class ShoppingOrderResolve implements Resolve<IShoppingOrder> {
  constructor(private service: ShoppingOrderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShoppingOrder> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ShoppingOrder>) => response.ok),
        map((shoppingOrder: HttpResponse<ShoppingOrder>) => shoppingOrder.body)
      );
    }
    return of(new ShoppingOrder());
  }
}

export const shoppingOrderRoute: Routes = [
  {
    path: '',
    component: ShoppingOrderComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ShoppingOrderDetailComponent,
    resolve: {
      shoppingOrder: ShoppingOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ShoppingOrderUpdateComponent,
    resolve: {
      shoppingOrder: ShoppingOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ShoppingOrderUpdateComponent,
    resolve: {
      shoppingOrder: ShoppingOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const shoppingOrderPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ShoppingOrderDeletePopupComponent,
    resolve: {
      shoppingOrder: ShoppingOrderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
