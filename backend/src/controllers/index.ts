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

  var finalData = {
    coveragePrices: {
      bonusProtection: 0,
      aoPlus: 0,
      glassProtection: 0,
    },
    discountPrices: {
      commercialDiscount: 0,
      adviserDiscount: 0,
      vipDiscount: 0,
      strongCarSurcharge: 0,
    },
    insurancePrices: {
      basePrice: 0,
      totalPrice: 0,
      voucher: 0,
    },
  };

  if (mainForm.priceMatch === "") {
    const customerAge = calculateAge(mainForm.birthdate);
    const ageConsant = getConstantByAge(customerAge);

    const cityPopulation = await getCityPopulation(mainForm.city);

    if (cityPopulation.error) {
      return res
        .status(Number(cityPopulation.status))
        .send(cityPopulation.error);
    } else if (cityPopulation.cityPopulation === "0") {
      return res.status(404).send("There is no data for provided city");
    }

    const basePrice = calculateBasePrice(
      ageConsant,
      Number(cityPopulation.cityPopulation)
    );

    if (basePrice === 0) {
      return res.status(400).send("User must be at least 18 years old");
    }

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

    finalData = {
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
  } else {
    const basePrice = +(
      mainForm.priceMatch /
      (1 +
        (coverages.bonusProtection * 12) / 100 -
        (discounts.commercialDiscount * 10) / 100)
    ).toFixed(2);
    const bonusProtection = coverages.bonusProtection
      ? +((basePrice * 12) / 100).toFixed(2)
      : 0;
    const commercialDiscount = discounts.commercialDiscount
      ? +((basePrice * 10) / 100).toFixed(2)
      : 0;

    finalData.coveragePrices.bonusProtection = bonusProtection;
    finalData.insurancePrices.basePrice = basePrice;
    finalData.discountPrices.commercialDiscount = commercialDiscount;
    finalData.insurancePrices.totalPrice = Number(mainForm.priceMatch);
    console.log(finalData);
    //res.send(finalData);
  }
  res.send(finalData);
};

const getCityPopulation = async (
  city: string
): Promise<{ [key: string]: string }> => {
  try {
    const populationResponse = await axios.get(
      `https://api.api-ninjas.com/v1/city?name=${city}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "TV8D326FoECzom44sqmBwg==yquXqD3ZS6bH8r14",
        },
      }
    );
    if (populationResponse.data[0]) {
      const cityPopulation = populationResponse.data[0].population;
      return {
        cityPopulation,
      };
    } else {
      return {
        cityPopulation: "0",
      };
    }
  } catch (error: any) {
    const err = error.response.data.error;
    return { error: err, status: error.response.status };
  }
};
