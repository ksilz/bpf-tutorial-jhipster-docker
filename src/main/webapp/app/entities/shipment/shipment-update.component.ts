import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IShipment, Shipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from './shipment.service';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { ShoppingOrderService } from 'app/entities/shopping-order';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'bpf-shipment-update',
  templateUrl: './shipment-update.component.html'
})
export class ShipmentUpdateComponent implements OnInit {
  shipment: IShipment;
  isSaving: boolean;

  orders: IShoppingOrder[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    shippedAt: [null, [Validators.required]],
    orderId: [null, Validators.required],
    shippedById: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected shipmentService: ShipmentService,
    protected shoppingOrderService: ShoppingOrderService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ shipment }) => {
      this.updateForm(shipment);
      this.shipment = shipment;
    });
    this.shoppingOrderService
      .query({ filter: 'shipment-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IShoppingOrder[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShoppingOrder[]>) => response.body)
      )
      .subscribe(
        (res: IShoppingOrder[]) => {
          if (!this.shipment.orderId) {
            this.orders = res;
          } else {
            this.shoppingOrderService
              .find(this.shipment.orderId)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IShoppingOrder>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IShoppingOrder>) => subResponse.body)
              )
              .subscribe(
                (subRes: IShoppingOrder) => (this.orders = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(shipment: IShipment) {
    this.editForm.patchValue({
      id: shipment.id,
      shippedAt: shipment.shippedAt != null ? shipment.shippedAt.format(DATE_TIME_FORMAT) : null,
      orderId: shipment.orderId,
      shippedById: shipment.shippedById
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const shipment = this.createFromForm();
    if (shipment.id !== undefined) {
      this.subscribeToSaveResponse(this.shipmentService.update(shipment));
    } else {
      this.subscribeToSaveResponse(this.shipmentService.create(shipment));
    }
  }

  private createFromForm(): IShipment {
    const entity = {
      ...new Shipment(),
      id: this.editForm.get(['id']).value,
      shippedAt:
        this.editForm.get(['shippedAt']).value != null ? moment(this.editForm.get(['shippedAt']).value, DATE_TIME_FORMAT) : undefined,
      orderId: this.editForm.get(['orderId']).value,
      shippedById: this.editForm.get(['shippedById']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipment>>) {
    result.subscribe((res: HttpResponse<IShipment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackShoppingOrderById(index: number, item: IShoppingOrder) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
