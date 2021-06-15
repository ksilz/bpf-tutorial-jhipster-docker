import dayjs from 'dayjs';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { IUser } from 'app/shared/model/user.model';
import { IShipment } from 'app/shared/model/shipment.model';

export interface IShoppingOrder {
  id?: number;
  name?: string;
  totalAmount?: number | null;
  ordered?: string | null;
  orders?: IProductOrder[] | null;
  buyer?: IUser;
  shipment?: IShipment | null;
}

export const defaultValue: Readonly<IShoppingOrder> = {};
