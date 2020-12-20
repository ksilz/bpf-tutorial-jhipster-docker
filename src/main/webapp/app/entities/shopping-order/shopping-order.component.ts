import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from './shopping-order.service';
import { ShoppingOrderDeleteDialogComponent } from './shopping-order-delete-dialog.component';

@Component({
  selector: 'bpf-shopping-order',
  templateUrl: './shopping-order.component.html',
})
export class ShoppingOrderComponent implements OnInit, OnDestroy {
  shoppingOrders?: IShoppingOrder[];
  eventSubscriber?: Subscription;

  constructor(
    protected shoppingOrderService: ShoppingOrderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.shoppingOrderService.query().subscribe((res: HttpResponse<IShoppingOrder[]>) => (this.shoppingOrders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShoppingOrders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShoppingOrder): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShoppingOrders(): void {
    this.eventSubscriber = this.eventManager.subscribe('shoppingOrderListModification', () => this.loadAll());
  }

  delete(shoppingOrder: IShoppingOrder): void {
    const modalRef = this.modalService.open(ShoppingOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shoppingOrder = shoppingOrder;
  }
}
