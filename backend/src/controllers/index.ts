import { Request, Response } from "express";
import {
  calculateAge,
  getConstantByAge,
  calculateBasePrice,
  calculateCoverages,
  calculateDiscountsAndTotalPrice,
} from "../utils";
import {
  Coverages,
  Discounts,
  FormData,
  CoveragePrices,
  DiscountPrices,
  InsuranceData,
} from "../types";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import Insurance from "../model/insurance.model";

const axios = setupCache(Axios);

interface RequestBody {
  mainForm: FormData;
  discounts?: Discounts;
  coverages?: Coverages;
}

export const getInsurancePrice = async (
  req: Request<RequestBody>,
  res: Response
) => {
  const { mainForm, discounts, coverages } = req.body;

  if (!mainForm) {
    return res.status(400).send({ error: "No data provided!" });
  }

  var InsuranceData: InsuranceData = {
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

  // if provided priceMatch is not bigger than 0 or its NaN, ie priceMatch not provided
  if (!(Number(mainForm.priceMatch) > 0)) {
    const customerAge = calculateAge(mainForm.birthdate);
    const ageConsant = getConstantByAge(customerAge);

    if (ageConsant === 0) {
      return res
        .status(400)
        .send({ error: "User must be at least 18 years old" });
    }

    const cityPopulation = await getCityPopulation(mainForm.city);

    if (cityPopulation?.error) {
      return res
        .status(Number(cityPopulation.status))
        .send({ error: cityPopulation.error });
    } else if (cityPopulation.cityPopulation === 0) {
      return res
        .status(404)
        .send({ error: "There is no data for provided city" });
    }

    const basePrice: number = calculateBasePrice(
      ageConsant,
      100000 //Number(cityPopulation.cityPopulation)
    );

    const coveragePrices: CoveragePrices = calculateCoverages(
      basePrice,
      customerAge,
      Number(mainForm.vehiclePower),
      coverages
    );

    const {
      discountPrices,
      totalPrice,
    }: { discountPrices: DiscountPrices; totalPrice: number } =
      calculateDiscountsAndTotalPrice(
        basePrice,
        coveragePrices,
        Number(mainForm.voucher) || 0,
        discounts
      );

    InsuranceData.coveragePrices = coveragePrices;
    InsuranceData.discountPrices = discountPrices;
    InsuranceData.insurancePrices = {
      basePrice,
      totalPrice,
    };
  } else {
    // Price match calculation
    const basePrice: number = +(
      +mainForm.priceMatch /
      (1 +
        (coverages?.bonusProtection ? 12 / 100 : 0) -
        (discounts?.commercialDiscount ? 10 / 100 : 0))
    ).toFixed(2);
    const bonusProtection: number = coverages?.bonusProtection
      ? +((basePrice * 12) / 100).toFixed(2)
      : 0;
    const commercialDiscount: number = discounts?.commercialDiscount
      ? +((basePrice * 10) / 100).toFixed(2)
      : 0;

    InsuranceData.coveragePrices.bonusProtection = bonusProtection;
    InsuranceData.discountPrices.commercialDiscount = commercialDiscount;
    InsuranceData.insurancePrices.basePrice = basePrice;
    InsuranceData.insurancePrices.totalPrice = +mainForm.priceMatch;
  }

  const insurance = new Insurance(InsuranceData);
  insurance
    .save()
    .then(() => console.log("Data saved to DB.."))
    .catch((error: any) => {
      console.log(error);
    });
  res.send(InsuranceData);
};

const getCityPopulation = async (
  city: string
): Promise<{ cityPopulation?: number; error?: string; status?: number }> => {
  try {
    const populationResponse = await axios.get(
      `https://api.api-ninjas.com/v1/city?name=${city}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "TV8D326FoECzom44sqmBwg==yquXqD3ZS6bH8r14", //`${process.env.API_KEY}`
        },
        id: city,
        cache: {
          ttl: 1000 * 60 * 60 * 12, // 12 hours
        },
      }
    );
    if (populationResponse.data[0]?.population) {
      const cityPopulation: number = populationResponse.data[0].population;
      return {
        cityPopulation,
      };
    } else {
      return {
        cityPopulation: 0,
      };
    }
  } catch (error: any) {
    const err = error.response.data.error || "Some error occurred";
    return { error: err, status: error.response.status || 500 };
  }
};
