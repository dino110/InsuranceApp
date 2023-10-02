import React, { createContext, useContext, useState } from "react";

import { Discounts } from "./components/Header";
import { FormData } from "./components/MainForm";
import { Coverages } from "./components/SideBar";

export interface InsurancePrices {
  basePrice: number;
  totalPrice: number;
}

export interface CoveragePrices {
  bonusProtection: number;
  aoPlus: number;
  glassProtection: number;
}

export interface DiscountPrices {
  commercialDiscount: number;
  adviserDiscount: number;
  vipDiscount: number;
  strongCarSurcharge: number;
}

interface InsuranceContextType {
  discounts: Discounts;
  coverages: Coverages;
  mainForm: FormData;
  insurancePrices: InsurancePrices;
  coveragePrices: CoveragePrices;
  discountPrices: DiscountPrices;
  setDiscounts: React.Dispatch<
    React.SetStateAction<InsuranceContextType["discounts"]>
  >;
  setCoverages: React.Dispatch<
    React.SetStateAction<InsuranceContextType["coverages"]>
  >;
  setMainForm: React.Dispatch<
    React.SetStateAction<InsuranceContextType["mainForm"]>
  >;
  setInsurancePrices: React.Dispatch<
    React.SetStateAction<InsuranceContextType["insurancePrices"]>
  >;
  setCoveragePrices: React.Dispatch<
    React.SetStateAction<InsuranceContextType["coveragePrices"]>
  >;
  setDiscountPrices: React.Dispatch<
    React.SetStateAction<InsuranceContextType["discountPrices"]>
  >;
}

const InsuracneContext = createContext<InsuranceContextType | undefined>(
  undefined
);

export function useInsuranceContext() {
  const context = useContext(InsuracneContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

export function InsuranceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [discounts, setDiscounts] = useState({
    commercialDiscount: false,
    adviserDiscount: false,
    vipDiscount: false,
    strongCarSurcharge: false,
  });

  const [coverages, setCoverages] = useState({
    glassProtection: false,
    bonusProtection: false,
    aoPlus: false,
  });

  const [mainForm, setMainForm] = useState({
    name: "",
    birthdate: "",
    city: "",
    vehiclePower: "",
    voucher: "0",
    priceMatch: "",
  });

  const [discountPrices, setDiscountPrices] = useState({
    commercialDiscount: 0,
    adviserDiscount: 0,
    vipDiscount: 0,
    strongCarSurcharge: 0,
  });

  const [coveragePrices, setCoveragePrices] = useState({
    bonusProtection: 0,
    aoPlus: 0,
    glassProtection: 0,
  });

  const [insurancePrices, setInsurancePrices] = useState({
    basePrice: 0,
    totalPrice: 0,
  });

  const value = {
    discounts,
    setDiscounts,
    coverages,
    setCoverages,
    mainForm,
    setMainForm,
    discountPrices,
    setDiscountPrices,
    coveragePrices,
    setCoveragePrices,
    insurancePrices,
    setInsurancePrices,
  };

  return (
    <InsuracneContext.Provider value={value}>
      {children}
    </InsuracneContext.Provider>
  );
}
