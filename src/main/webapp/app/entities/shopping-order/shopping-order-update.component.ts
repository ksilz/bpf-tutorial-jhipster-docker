import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IShoppingOrder, ShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from './shopping-order.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'bpf-shopping-order-update',
  templateUrl: './shopping-order-update.component.html',
})
export class ShoppingOrderUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  orderedDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(90)]],
    totalAmount: [null, [Validators.min(0)]],
    ordered: [],
    buyerId: [null, Validators.required],
  });

  constructor(
    protected shoppingOrderService: ShoppingOrderService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingOrder }) => {
      this.updateForm(shoppingOrder);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(shoppingOrder: IShoppingOrder): void {
    this.editForm.patchValue({
      id: shoppingOrder.id,
      name: shoppingOrder.name,
      totalAmount: shoppingOrder.totalAmount,
      ordered: shoppingOrder.ordered,
      buyerId: shoppingOrder.buyerId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shoppingOrder = this.createFromForm();
    if (shoppingOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.shoppingOrderService.update(shoppingOrder));
    } else {
      this.subscribeToSaveResponse(this.shoppingOrderService.create(shoppingOrder));
    }
  }

  private createFromForm(): IShoppingOrder {
    return {
      ...new ShoppingOrder(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      totalAmount: this.editForm.get(['totalAmount'])!.value,
      ordered: this.editForm.get(['ordered'])!.value,
      buyerId: this.editForm.get(['buyerId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShoppingOrder>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
