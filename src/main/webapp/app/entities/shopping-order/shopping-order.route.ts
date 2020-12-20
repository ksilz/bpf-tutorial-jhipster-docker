import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShoppingOrder, ShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from './shopping-order.service';
import { ShoppingOrderComponent } from './shopping-order.component';
import { ShoppingOrderDetailComponent } from './shopping-order-detail.component';
import { ShoppingOrderUpdateComponent } from './shopping-order-update.component';

@Injectable({ providedIn: 'root' })
export class ShoppingOrderResolve implements Resolve<IShoppingOrder> {
  constructor(private service: ShoppingOrderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShoppingOrder> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shoppingOrder: HttpResponse<ShoppingOrder>) => {
          if (shoppingOrder.body) {
            return of(shoppingOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
      authorities: [Authority.USER],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShoppingOrderDetailComponent,
    resolve: {
      shoppingOrder: ShoppingOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShoppingOrderUpdateComponent,
    resolve: {
      shoppingOrder: ShoppingOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShoppingOrderUpdateComponent,
    resolve: {
      shoppingOrder: ShoppingOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'mySimpleShopApp.shoppingOrder.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
