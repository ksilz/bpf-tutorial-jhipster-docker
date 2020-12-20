import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductOrder, ProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from './product-order.service';
import { IUser, UserService } from 'app/core';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from 'app/entities/shopping-order';

@Component({
  selector: 'bpf-product-order-update',
  templateUrl: './product-order-update.component.html'
})
export class ProductOrderUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  products: IProduct[];

  shoppingorders: IShoppingOrder[];

  editForm = this.fb.group({
    id: [],
    amount: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
    buyerId: [null, Validators.required],
    productId: [null, Validators.required],
    overallOrderId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productOrderService: ProductOrderService,
    protected userService: UserService,
    protected productService: ProductService,
    protected shoppingOrderService: ShoppingOrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productOrder }) => {
      this.updateForm(productOrder);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.shoppingOrderService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IShoppingOrder[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShoppingOrder[]>) => response.body)
      )
      .subscribe((res: IShoppingOrder[]) => (this.shoppingorders = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productOrder: IProductOrder) {
    this.editForm.patchValue({
      id: productOrder.id,
      amount: productOrder.amount,
      buyerId: productOrder.buyerId,
      productId: productOrder.productId,
      overallOrderId: productOrder.overallOrderId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      buyerId: this.editForm.get(['buyerId']).value,
      productId: this.editForm.get(['productId']).value,
      overallOrderId: this.editForm.get(['overallOrderId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductOrder>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }

  trackShoppingOrderById(index: number, item: IShoppingOrder) {
    return item.id;
  }
}
