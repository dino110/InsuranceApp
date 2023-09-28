import { Request, Response } from "express";
import {
  calculateAge,
  getConstantByAge,
  calculateBasePrice,
  calculateCoverages,
  calculateDiscountsAndTotalPrice,
} from "../utils";
import axios from "axios";

export const getInsurancePrice = async (req: Request, res: Response) => {
  const { mainForm, discounts, coverages } = req.body;

  const customerAge = calculateAge(mainForm.birthdate);
  const ageConsant = getConstantByAge(customerAge);

  const cityPopulation = await getCityPopulation(mainForm.city);

  if (cityPopulation.error) {
    return res.status(Number(cityPopulation.status)).send(cityPopulation.error);
  }
  const basePrice = 100; /*calculateBasePrice(
    ageConsant,
    Number(cityPopulation.cityPopulation)
  );*/

  const voucher = Number(mainForm.voucher);

  const { bonusProtection, aoPlus, glassProtection } = calculateCoverages(
    basePrice,
    customerAge,
    mainForm.vehiclePower,
    coverages
  );

  const {
    commercialDiscount,
    adviserDiscount,
    vipDiscount,
    strongCarSurcharge,
    totalPrice,
  } = calculateDiscountsAndTotalPrice(
    basePrice,
    voucher,
    discounts,
    bonusProtection,
    aoPlus,
    glassProtection
  );

  const finalData = {
    coveragePrices: {
      bonusProtection,
      aoPlus,
      glassProtection,
    },
    discountPrices: {
      commercialDiscount,
      adviserDiscount,
      vipDiscount,
      strongCarSurcharge,
    },
    insurancePrices: {
      basePrice,
      totalPrice,
      voucher,
    },
  };

  console.log(finalData);
  res.send(finalData);
};

const getCityPopulation = async (
  city: string
): Promise<{ [key: string]: string }> => {
  try {
    const populationResponse = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/population/cities",
      { city: city },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const cityPopulation =
      populationResponse.data.data.populationCounts[0].value;
    return {
      cityPopulation,
    };
  } catch (error: any) {
    return { error: error.response.data.msg, status: error.response.status };
  }
};
