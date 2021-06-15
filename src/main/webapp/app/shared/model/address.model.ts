import { IUser } from 'app/shared/model/user.model';

export interface IAddress {
  id?: number;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string | null;
  postalCode?: string | null;
  user?: IUser;
}

export const defaultValue: Readonly<IAddress> = {};
