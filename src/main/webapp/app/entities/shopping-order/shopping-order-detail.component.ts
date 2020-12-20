import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShoppingOrder } from 'app/shared/model/shopping-order.model';

@Component({
  selector: 'bpf-shopping-order-detail',
  templateUrl: './shopping-order-detail.component.html',
})
export class ShoppingOrderDetailComponent implements OnInit {
  shoppingOrder: IShoppingOrder | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingOrder }) => (this.shoppingOrder = shoppingOrder));
  }

  previousState(): void {
    window.history.back();
  }
}
