import { Schema, model } from "mongoose";

import { FinalData } from "../types";

const InsuranceSchema = new Schema<FinalData>({
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
    voucher: Number,
  },
});
const Insurance = model<FinalData>("Insurance", InsuranceSchema);

export default Insurance;
