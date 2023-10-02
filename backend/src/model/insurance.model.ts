import { Schema, model } from "mongoose";

import { InsuranceData } from "../types";

const InsuranceSchema = new Schema<InsuranceData>({
  userData: {
    name: String,
    birthdate: String,
    city: String,
    vehiclePower: String,
    voucher: String,
    priceMatch: String,
  },
  coveragePrices: {
    bonusProtection: Number,
    aoPlus: Number,
    glassProtection: Number,
  },
  discountPrices: {
    commercialDiscount: Number,
    adviserDiscount: Number,
    vipDiscount: Number,
    strongCarSurcharge: Number,
  },
  insurancePrices: {
    basePrice: Number,
    totalPrice: Number,
  },
});
const Insurance = model<InsuranceData>("Insurance", InsuranceSchema);

export default Insurance;
