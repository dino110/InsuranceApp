export interface CustomerData {
  name: string;
  birthdate: string;
  city: string;
  vehiclePower: string;
  voucher: string;
  priceMatch: string;
}

export interface Discounts {
  commercialDiscount: boolean;
  adviserDiscount: boolean;
  vipDiscount: boolean;
  strongCarSurcharge: boolean;
}

export interface DiscountPrices {
  commercialDiscount: number;
  adviserDiscount: number;
  vipDiscount: number;
  strongCarSurcharge: number;
}

export interface Coverages {
  bonusProtection: boolean;
  aoPlus: boolean;
  glassProtection: boolean;
}

export interface CoveragePrices {
  bonusProtection: number;
  aoPlus: number;
  glassProtection: number;
}

export interface InsurancePrices {
  basePrice: number;
  totalPrice: number;
}

export interface InsuranceData {
  userData: CustomerData;
  coveragePrices: CoveragePrices;
  discountPrices: DiscountPrices;
  insurancePrices: InsurancePrices;
}
