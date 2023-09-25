import React, { createContext, useContext, useState } from "react";

import { Discounts } from "./components/Header";
import { FormData } from "./components/MainForm";
import { Coverages } from "./components/SideBar";

interface InsuranceContextType {
  discounts: Discounts;
  coverages: Coverages;
  mainForm: FormData;
  setDiscounts: React.Dispatch<
    React.SetStateAction<InsuranceContextType["discounts"]>
  >;
  setCoverages: React.Dispatch<
    React.SetStateAction<InsuranceContextType["coverages"]>
  >;
  setMainForm: React.Dispatch<
    React.SetStateAction<InsuranceContextType["mainForm"]>
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

  const value = {
    discounts,
    coverages,
    mainForm,
    setMainForm,
    setCoverages,
    setDiscounts,
  };

  return (
    <InsuracneContext.Provider value={value}>
      {children}
    </InsuracneContext.Provider>
  );
}
