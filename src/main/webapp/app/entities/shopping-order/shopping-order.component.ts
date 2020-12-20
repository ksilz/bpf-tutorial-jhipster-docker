import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { AccountService } from 'app/core';
import { ShoppingOrderService } from './shopping-order.service';

@Component({
  selector: 'bpf-shopping-order',
  templateUrl: './shopping-order.component.html'
})
export class ShoppingOrderComponent implements OnInit, OnDestroy {
  shoppingOrders: IShoppingOrder[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected shoppingOrderService: ShoppingOrderService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.shoppingOrderService
      .query()
      .pipe(
        filter((res: HttpResponse<IShoppingOrder[]>) => res.ok),
        map((res: HttpResponse<IShoppingOrder[]>) => res.body)
      )
      .subscribe(
        (res: IShoppingOrder[]) => {
          this.shoppingOrders = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInShoppingOrders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IShoppingOrder) {
    return item.id;
  }

  registerChangeInShoppingOrders() {
    this.eventSubscriber = this.eventManager.subscribe('shoppingOrderListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
