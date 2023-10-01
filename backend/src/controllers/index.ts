import { Request, Response } from "express";
import {
  calculateAge,
  getConstantByAge,
  calculateBasePrice,
  calculateCoverages,
  calculateDiscountsAndTotalPrice,
} from "../utils";
import axios from "axios";
import Insurance from "../model/insurance.model";

export const getInsurancePrice = async (req: Request, res: Response) => {
  const { mainForm, discounts, coverages } = req.body;

  if (!mainForm) {
    return res.status(400).send({ error: "No data provided!" });
  }

  var InsuranceData = {
    userData: mainForm,
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
    },
  };

  //
  if (mainForm.priceMatch === "") {
    const customerAge = calculateAge(mainForm.birthdate);
    const ageConsant = getConstantByAge(customerAge);

    const cityPopulation = 10; //await getCityPopulation(mainForm.city);
    /*
    if (cityPopulation.error) {
      return res
        .status(Number(cityPopulation.status))
        .send({ error: cityPopulation.error });
    } else if (cityPopulation.cityPopulation === "0") {
      return res
        .status(404)
        .send({ error: "There is no data for provided city" });
    }*/

    if (ageConsant === 0) {
      return res
        .status(400)
        .send({ error: "User must be at least 18 years old" });
    }
    const basePrice = calculateBasePrice(
      ageConsant,
      10 // +cityPopulation.cityPopulation
    );

    const coveragePrices = calculateCoverages(
      basePrice,
      customerAge,
      mainForm.vehiclePower,
      coverages
    );

    const { discountPrices, totalPrice } = calculateDiscountsAndTotalPrice(
      basePrice,
      discounts,
      coveragePrices,
      +mainForm.voucher
    );

    InsuranceData.coveragePrices = coveragePrices;
    InsuranceData.discountPrices = discountPrices;
    InsuranceData.insurancePrices = {
      basePrice,
      totalPrice,
    };
  } else {
    // Price match calculation
    const basePrice = +(
      mainForm.priceMatch /
      (1 +
        (coverages?.bonusProtection || 0) * (12 / 100) -
        (discounts?.commercialDiscount || 0) * (10 / 100))
    ).toFixed(2);
    const bonusProtection = coverages?.bonusProtection
      ? +((basePrice * 12) / 100).toFixed(2)
      : 0;
    const commercialDiscount = discounts?.commercialDiscount
      ? +((basePrice * 10) / 100).toFixed(2)
      : 0;

    InsuranceData.coveragePrices.bonusProtection = bonusProtection;
    InsuranceData.insurancePrices.basePrice = basePrice;
    InsuranceData.discountPrices.commercialDiscount = commercialDiscount;
    InsuranceData.insurancePrices.totalPrice = +mainForm.priceMatch;
  }

  const insurance = new Insurance(InsuranceData);
  insurance
    .save()
    .then()
    .catch((error: any) => {
      console.log(error);
    });
  res.send(InsuranceData);
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
    const err = error.response.data.error || "Some error occurred";
    return { error: err, status: error.response.status || 500 };
  }
};
