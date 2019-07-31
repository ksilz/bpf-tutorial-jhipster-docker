import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IShoppingOrder, ShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from './shopping-order.service';
import { IUser, UserService } from 'app/core';
import { IShipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from 'app/entities/shipment';

@Component({
  selector: 'bpf-shopping-order-update',
  templateUrl: './shopping-order-update.component.html'
})
export class ShoppingOrderUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  shipments: IShipment[];
  orderedDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(90)]],
    totalAmount: [null, [Validators.min(0)]],
    ordered: [],
    buyerId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected shoppingOrderService: ShoppingOrderService,
    protected userService: UserService,
    protected shipmentService: ShipmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ shoppingOrder }) => {
      this.updateForm(shoppingOrder);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.shipmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IShipment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShipment[]>) => response.body)
      )
      .subscribe((res: IShipment[]) => (this.shipments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(shoppingOrder: IShoppingOrder) {
    this.editForm.patchValue({
      id: shoppingOrder.id,
      name: shoppingOrder.name,
      totalAmount: shoppingOrder.totalAmount,
      ordered: shoppingOrder.ordered,
      buyerId: shoppingOrder.buyerId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      totalAmount: this.editForm.get(['totalAmount']).value,
      ordered: this.editForm.get(['ordered']).value,
      buyerId: this.editForm.get(['buyerId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShoppingOrder>>) {
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

  trackShipmentById(index: number, item: IShipment) {
    return item.id;
  }
}
