export interface IProductOrder {
  id?: number;
  amount?: number;
  buyerLogin?: string;
  buyerId?: number;
  productName?: string;
  productId?: number;
  overallOrderName?: string;
  overallOrderId?: number;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public amount?: number,
    public buyerLogin?: string,
    public buyerId?: number,
    public productName?: string,
    public productId?: number,
    public overallOrderName?: string,
    public overallOrderId?: number
  ) {}
}
