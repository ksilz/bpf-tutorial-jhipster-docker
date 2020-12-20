import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IShipment, Shipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from './shipment.service';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from 'app/entities/shopping-order/shopping-order.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IShoppingOrder | IUser;

@Component({
  selector: 'bpf-shipment-update',
  templateUrl: './shipment-update.component.html',
})
export class ShipmentUpdateComponent implements OnInit {
  isSaving = false;
  orders: IShoppingOrder[] = [];
  users: IUser[] = [];
  shippedAtDp: any;

  editForm = this.fb.group({
    id: [],
    shippedAt: [null, [Validators.required]],
    orderId: [null, Validators.required],
    shippedById: [null, Validators.required],
  });

  constructor(
    protected shipmentService: ShipmentService,
    protected shoppingOrderService: ShoppingOrderService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shipment }) => {
      this.updateForm(shipment);

      this.shoppingOrderService
        .query({ filter: 'shipment-is-null' })
        .pipe(
          map((res: HttpResponse<IShoppingOrder[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IShoppingOrder[]) => {
          if (!shipment.orderId) {
            this.orders = resBody;
          } else {
            this.shoppingOrderService
              .find(shipment.orderId)
              .pipe(
                map((subRes: HttpResponse<IShoppingOrder>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IShoppingOrder[]) => (this.orders = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(shipment: IShipment): void {
    this.editForm.patchValue({
      id: shipment.id,
      shippedAt: shipment.shippedAt,
      orderId: shipment.orderId,
      shippedById: shipment.shippedById,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shipment = this.createFromForm();
    if (shipment.id !== undefined) {
      this.subscribeToSaveResponse(this.shipmentService.update(shipment));
    } else {
      this.subscribeToSaveResponse(this.shipmentService.create(shipment));
    }
  }

  private createFromForm(): IShipment {
    return {
      ...new Shipment(),
      id: this.editForm.get(['id'])!.value,
      shippedAt: this.editForm.get(['shippedAt'])!.value,
      orderId: this.editForm.get(['orderId'])!.value,
      shippedById: this.editForm.get(['shippedById'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipment>>): void {
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
