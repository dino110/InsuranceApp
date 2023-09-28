export interface FormData {
  name: string;
  birthdate: string;
  city: string;
  vehiclePower: string;
  voucher: string;
  priceMatch?: string;
}

export interface Discounts {
  commercialDiscount: boolean;
  adviserDiscount: boolean;
  vipDiscount: boolean;
  strongCarSurcharge: boolean;
}

export interface Coverages {
  bonusProtection: boolean;
  aoPlus: boolean;
  glassProtection: boolean;
}

export interface AllData extends FormData, Discounts, Coverages {}
