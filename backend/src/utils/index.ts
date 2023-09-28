import { Discounts, Coverages, FormData } from "../types";

export const calculateBasePrice = (
  ageConsant: number,
  cityPopulaton: number
): number => {
  return (ageConsant * cityPopulaton) / 10;
};

export const calculateCoverages = (
  basePrice: number,
  customerAge: number,
  vehiclePower: number,
  coverages: Coverages
): { [key: string]: number } => {
  const bonusProtection = coverages.bonusProtection
    ? (basePrice * 12) / 100
    : 0;
  const aoPlus = coverages.aoPlus ? (customerAge < 30 ? 55 : 105) : 0;
  const glassProtection = coverages.glassProtection
    ? (vehiclePower * 80) / 100
    : 0;

  return {
    bonusProtection,
    aoPlus,
    glassProtection,
  };
};

export const calculateDiscountsAndTotalPrice = (
  basePrice: number,
  voucher: number,
  discounts: Discounts,
  bonusProtection: number,
  aoPlus: number,
  glassProtection: number
): { [key: string]: number } => {
  const coveragesArr = [bonusProtection, aoPlus, glassProtection];

  //negative value so we can sum it
  const commercialDiscount = discounts.commercialDiscount
    ? -(basePrice / 10)
    : 0;

  //negative value so we can sum it
  const adviserDiscount =
    discounts.adviserDiscount &&
    coveragesArr.filter((item) => item > 0).length >= 2
      ? -((coveragesArr.reduce((acc, value) => acc + value, 0) * 20) / 100)
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
    ? -((totalPriceBefore * 5) / 100)
    : 0;

  const totalPrice = totalPriceBefore + vipDiscount - voucher;

  return {
    commercialDiscount,
    adviserDiscount,
    vipDiscount,
    strongCarSurcharge,
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
