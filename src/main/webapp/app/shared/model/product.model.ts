import { IProductOrder } from 'app/shared/model/product-order.model';
import { ProductCategory } from 'app/shared/model/enumerations/product-category.model';

export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  pictureContentType?: string;
  picture?: string;
  specificationContentType?: string | null;
  specification?: string | null;
  category?: ProductCategory | null;
  inventory?: number;
  productOrders?: IProductOrder[] | null;
}

export const defaultValue: Readonly<IProduct> = {};
