import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShipment } from 'app/shared/model/shipment.model';

type EntityResponseType = HttpResponse<IShipment>;
type EntityArrayResponseType = HttpResponse<IShipment[]>;

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  public resourceUrl = SERVER_API_URL + 'api/shipments';

  constructor(protected http: HttpClient) {}

  create(shipment: IShipment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shipment);
    return this.http
      .post<IShipment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(shipment: IShipment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shipment);
    return this.http
      .put<IShipment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IShipment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IShipment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(shipment: IShipment): IShipment {
    const copy: IShipment = Object.assign({}, shipment, {
      shippedAt: shipment.shippedAt != null && shipment.shippedAt.isValid() ? shipment.shippedAt.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.shippedAt = res.body.shippedAt != null ? moment(res.body.shippedAt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((shipment: IShipment) => {
        shipment.shippedAt = shipment.shippedAt != null ? moment(shipment.shippedAt) : null;
      });
    }
    return res;
  }
}
