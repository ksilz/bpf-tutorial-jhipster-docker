import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from './shopping-order.service';

@Component({
  selector: 'bpf-shopping-order-delete-dialog',
  templateUrl: './shopping-order-delete-dialog.component.html'
})
export class ShoppingOrderDeleteDialogComponent {
  shoppingOrder: IShoppingOrder;

  constructor(
    protected shoppingOrderService: ShoppingOrderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.shoppingOrderService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'shoppingOrderListModification',
        content: 'Deleted an shoppingOrder'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'bpf-shopping-order-delete-popup',
  template: ''
})
export class ShoppingOrderDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ shoppingOrder }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ShoppingOrderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.shoppingOrder = shoppingOrder;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/shopping-order', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/shopping-order', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
