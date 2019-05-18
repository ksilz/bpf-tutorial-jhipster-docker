import { Moment } from 'moment';

export interface IShipment {
  id?: number;
  shippedAt?: Moment;
  orderName?: string;
  orderId?: number;
  shippedByLogin?: string;
  shippedById?: number;
}

export class Shipment implements IShipment {
  constructor(
    public id?: number,
    public shippedAt?: Moment,
    public orderName?: string,
    public orderId?: number,
    public shippedByLogin?: string,
    public shippedById?: number
  ) {}
}
