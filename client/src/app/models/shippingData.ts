export interface ShippingData {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  saveAddress?: boolean | undefined;
  state: string;
  zip: number;
  cardName: string;
  cardNumber: number;
  expDate: number;
  cvv: number;
}
