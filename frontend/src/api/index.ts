import axios from "axios";

import { Discounts } from "../components/Header";
import { FormData } from "../components/MainForm";
import { Coverages } from "../components/SideBar";
import {
  InsurancePrices,
  CoveragePrices,
  DiscountPrices,
} from "../InsuranceContext";

interface AllPrices {
  insurancePrices: InsurancePrices;
  coveragePrices: CoveragePrices;
  discountPrices: DiscountPrices;
}

interface SuccessResponse {
  status: "success";
  data: AllPrices;
}

interface ErrorRespone {
  status: "error";
  message: string;
}

type ResponseType = SuccessResponse | ErrorRespone;

export const getInsurancePrice = async (data: {
  mainForm: FormData;
  coverages: Coverages;
  discounts: Discounts;
}): Promise<ResponseType> => {
  try {
    const insurancePrice = await axios.post(
      `http://localhost:4000/api/getPrice`,
      data
    );
    return {
      status: "success",
      data: insurancePrice.data,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.response.data,
    };
  }
};
