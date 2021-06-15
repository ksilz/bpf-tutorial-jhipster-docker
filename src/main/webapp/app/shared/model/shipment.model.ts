import dayjs from 'dayjs';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';
import { IUser } from 'app/shared/model/user.model';

export interface IShipment {
  id?: number;
  shippedAt?: string;
  order?: IShoppingOrder;
  shippedBy?: IUser;
}

export const defaultValue: Readonly<IShipment> = {};
