import axios from "axios";

import { Discounts } from "../components/Header";
import { FormData } from "../components/MainForm";
import { Coverages } from "../components/SideBar";

export const getInsurancePrice = async (data: {
  coverages: Coverages;
  discounts: Discounts;
  formData: FormData;
}): Promise<{}> => {
  try {
    const insurancePrice = await axios.post(
      `http://localhost:4000/api/getPrice`,
      data
    );
    if (insurancePrice.status === 200) {
      return insurancePrice.data;
    } else {
      return {
        totalPrice: 0,
      };
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    return {
      totalPrice: 0,
    };
  }
};
