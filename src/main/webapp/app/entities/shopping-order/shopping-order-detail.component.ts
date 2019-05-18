import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShoppingOrder } from 'app/shared/model/shopping-order.model';

@Component({
  selector: 'bpf-shopping-order-detail',
  templateUrl: './shopping-order-detail.component.html'
})
export class ShoppingOrderDetailComponent implements OnInit {
  shoppingOrder: IShoppingOrder;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ shoppingOrder }) => {
      this.shoppingOrder = shoppingOrder;
    });
  }

  previousState() {
    window.history.back();
  }
}
