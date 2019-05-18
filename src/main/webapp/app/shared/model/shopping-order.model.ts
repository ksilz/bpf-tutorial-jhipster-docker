import { Moment } from 'moment';
import { IProductOrder } from 'app/shared/model/product-order.model';

export interface IShoppingOrder {
  id?: number;
  name?: string;
  totalAmount?: number;
  ordered?: Moment;
  orders?: IProductOrder[];
  buyerLogin?: string;
  buyerId?: number;
  shipmentId?: number;
}

export class ShoppingOrder implements IShoppingOrder {
  constructor(
    public id?: number,
    public name?: string,
    public totalAmount?: number,
    public ordered?: Moment,
    public orders?: IProductOrder[],
    public buyerLogin?: string,
    public buyerId?: number,
    public shipmentId?: number
  ) {}
}
