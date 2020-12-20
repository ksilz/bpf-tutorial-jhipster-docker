export interface IAddress {
  id?: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postalCode?: string;
  userLogin?: string;
  userId?: number;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public addressLine1?: string,
    public addressLine2?: string,
    public city?: string,
    public postalCode?: string,
    public userLogin?: string,
    public userId?: number
  ) {}
}
