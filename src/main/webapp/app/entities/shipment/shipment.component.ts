import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from './shipment.service';
import { ShipmentDeleteDialogComponent } from './shipment-delete-dialog.component';

@Component({
  selector: 'bpf-shipment',
  templateUrl: './shipment.component.html',
})
export class ShipmentComponent implements OnInit, OnDestroy {
  shipments?: IShipment[];
  eventSubscriber?: Subscription;

  constructor(protected shipmentService: ShipmentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.shipmentService.query().subscribe((res: HttpResponse<IShipment[]>) => (this.shipments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShipments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShipment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShipments(): void {
    this.eventSubscriber = this.eventManager.subscribe('shipmentListModification', () => this.loadAll());
  }

  delete(shipment: IShipment): void {
    const modalRef = this.modalService.open(ShipmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shipment = shipment;
  }
}
