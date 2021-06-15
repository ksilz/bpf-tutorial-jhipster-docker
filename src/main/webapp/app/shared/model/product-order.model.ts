import { IUser } from 'app/shared/model/user.model';
import { IProduct } from 'app/shared/model/product.model';
import { IShoppingOrder } from 'app/shared/model/shopping-order.model';

export interface IProductOrder {
  id?: number;
  amount?: number;
  buyer?: IUser;
  product?: IProduct;
  overallOrder?: IShoppingOrder;
}

export const defaultValue: Readonly<IProductOrder> = {};
