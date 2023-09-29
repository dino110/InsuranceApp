import { Discounts, Coverages, CoveragePrices, DiscountPrices } from "../types";

export const calculateBasePrice = (
  ageConsant: number,
  cityPopulaton: number
): number => {
  const cityConst = Math.pow(cityPopulaton, 1 / 6);
  const basePrice = Math.round(cityConst * ageConsant) * 10;
  return basePrice;
};

export const calculateCoverages = (
  basePrice: number,
  customerAge: number,
  vehiclePower: number,
  coverages: Coverages
): CoveragePrices => {
  const bonusProtection = coverages.bonusProtection
    ? +((basePrice * 12) / 100).toFixed(2)
    : 0;
  const aoPlus = coverages.aoPlus ? (customerAge < 30 ? 55 : 105) : 0;
  const glassProtection = coverages.glassProtection
    ? +((vehiclePower * 80) / 100).toFixed(2)
    : 0;

  return {
    bonusProtection,
    aoPlus,
    glassProtection,
  };
};

export const calculateDiscountsAndTotalPrice = (
  basePrice: number,
  discounts: Discounts,
  coveragePrices: CoveragePrices,
  voucher: number
): { discountPrices: DiscountPrices; totalPrice: number } => {
  const coveragesArr = [...Object.values(coveragePrices)];

  //negative value so we can sum it
  const commercialDiscount = discounts.commercialDiscount
    ? -(basePrice / 10)
    : 0;

  //negative value so we can sum it
  const adviserDiscount =
    discounts.adviserDiscount &&
    coveragesArr.filter((item) => item > 0).length >= 2
      ? -(
          (coveragesArr.reduce((acc, value) => acc + value, 0) * 20) /
          100
        ).toFixed(2)
      : 0;

  const strongCarSurcharge = discounts.strongCarSurcharge ? basePrice / 10 : 0;

  const totalPriceBefore = [
    basePrice,
    ...coveragesArr,
    commercialDiscount,
    adviserDiscount,
    strongCarSurcharge,
  ].reduce((acc, value) => acc + value, 0);
  const vipDiscount = discounts.vipDiscount
    ? -((totalPriceBefore * 5) / 100).toFixed(2)
    : 0;

  const totalPrice = +(totalPriceBefore + vipDiscount - voucher).toFixed(2);

  return {
    discountPrices: {
      commercialDiscount,
      adviserDiscount,
      vipDiscount,
      strongCarSurcharge,
    },
    totalPrice,
  };
};

export const calculateAge = (birthdate: string): number => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  const age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
};

export const getConstantByAge = (age: number): number => {
  switch (true) {
    case age >= 18 && age < 20:
      return 5.41;
    case age >= 20 && age < 25:
      return 3.1;
    case age >= 25 && age < 35:
      return 1.87;
    case age >= 35 && age < 40:
      return 1.65;
    case age >= 40 && age < 45:
      return 1.61;
    case age >= 45 && age < 50:
      return 1.59;
    case age >= 50 && age < 55:
      return 1.51;
    case age >= 55 && age < 60:
      return 1.47;
    case age >= 60 && age < 65:
      return 1.45;
    case age >= 65 && age < 70:
      return 1.49;
    case age >= 70 && age < 75:
      return 1.57;
    case age >= 75 && age < 80:
      return 1.71;
    case age >= 80:
      return 1.88;
    default:
      return 0;
  }
};
