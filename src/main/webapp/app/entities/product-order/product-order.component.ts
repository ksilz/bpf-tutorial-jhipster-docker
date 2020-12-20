import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from './product-order.service';
import { ProductOrderDeleteDialogComponent } from './product-order-delete-dialog.component';

@Component({
  selector: 'bpf-product-order',
  templateUrl: './product-order.component.html',
})
export class ProductOrderComponent implements OnInit, OnDestroy {
  productOrders?: IProductOrder[];
  eventSubscriber?: Subscription;

  constructor(
    protected productOrderService: ProductOrderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productOrderService.query().subscribe((res: HttpResponse<IProductOrder[]>) => (this.productOrders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductOrders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductOrder): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductOrders(): void {
    this.eventSubscriber = this.eventManager.subscribe('productOrderListModification', () => this.loadAll());
  }

  delete(productOrder: IProductOrder): void {
    const modalRef = this.modalService.open(ProductOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productOrder = productOrder;
  }
}
