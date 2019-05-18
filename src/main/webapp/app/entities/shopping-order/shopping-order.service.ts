import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';

type EntityResponseType = HttpResponse<IShoppingOrder>;
type EntityArrayResponseType = HttpResponse<IShoppingOrder[]>;

@Injectable({ providedIn: 'root' })
export class ShoppingOrderService {
  public resourceUrl = SERVER_API_URL + 'api/shopping-orders';

  constructor(protected http: HttpClient) {}

  create(shoppingOrder: IShoppingOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shoppingOrder);
    return this.http
      .post<IShoppingOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(shoppingOrder: IShoppingOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shoppingOrder);
    return this.http
      .put<IShoppingOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IShoppingOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IShoppingOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(shoppingOrder: IShoppingOrder): IShoppingOrder {
    const copy: IShoppingOrder = Object.assign({}, shoppingOrder, {
      ordered: shoppingOrder.ordered != null && shoppingOrder.ordered.isValid() ? shoppingOrder.ordered.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.ordered = res.body.ordered != null ? moment(res.body.ordered) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((shoppingOrder: IShoppingOrder) => {
        shoppingOrder.ordered = shoppingOrder.ordered != null ? moment(shoppingOrder.ordered) : null;
      });
    }
    return res;
  }
}
