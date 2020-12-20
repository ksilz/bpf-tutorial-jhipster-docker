import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductOrder, ProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from './product-order.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from 'app/entities/shopping-order/shopping-order.service';

type SelectableEntity = IUser | IProduct | IShoppingOrder;

@Component({
  selector: 'bpf-product-order-update',
  templateUrl: './product-order-update.component.html',
})
export class ProductOrderUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  products: IProduct[] = [];
  shoppingorders: IShoppingOrder[] = [];

  editForm = this.fb.group({
    id: [],
    amount: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
    buyerId: [null, Validators.required],
    productId: [null, Validators.required],
    overallOrderId: [null, Validators.required],
  });

  constructor(
    protected productOrderService: ProductOrderService,
    protected userService: UserService,
    protected productService: ProductService,
    protected shoppingOrderService: ShoppingOrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productOrder }) => {
      this.updateForm(productOrder);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));

      this.shoppingOrderService.query().subscribe((res: HttpResponse<IShoppingOrder[]>) => (this.shoppingorders = res.body || []));
    });
  }

  updateForm(productOrder: IProductOrder): void {
    this.editForm.patchValue({
      id: productOrder.id,
      amount: productOrder.amount,
      buyerId: productOrder.buyerId,
      productId: productOrder.productId,
      overallOrderId: productOrder.overallOrderId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productOrder = this.createFromForm();
    if (productOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.productOrderService.update(productOrder));
    } else {
      this.subscribeToSaveResponse(this.productOrderService.create(productOrder));
    }
  }

  private createFromForm(): IProductOrder {
    return {
      ...new ProductOrder(),
      id: this.editForm.get(['id'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      buyerId: this.editForm.get(['buyerId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      overallOrderId: this.editForm.get(['overallOrderId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductOrder>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
