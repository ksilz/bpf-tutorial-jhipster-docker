import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from './shopping-order.service';

@Component({
  templateUrl: './shopping-order-delete-dialog.component.html',
})
export class ShoppingOrderDeleteDialogComponent {
  shoppingOrder?: IShoppingOrder;

  constructor(
    protected shoppingOrderService: ShoppingOrderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shoppingOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shoppingOrderListModification');
      this.activeModal.close();
    });
  }
}
