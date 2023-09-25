import React, { createContext, useContext, useState } from "react";

interface InsuranceContextType {
  discounts: {
    commercialDiscount: boolean;
    adviserDiscount: boolean;
    vipDiscount: boolean;
    strongCarSurcharge: boolean;
  };
  coverages: {
    glassProtection: boolean;
    bonusProtection: boolean;
    aoPlus: boolean;
  };
  textFields: {
    name: string;
    birthdate: string;
    city: string;
    vehiclePower: string;
    voucher: string;
    priceMatch: string;
  };
  setDiscounts: React.Dispatch<
    React.SetStateAction<InsuranceContextType["discounts"]>
  >;
  setCoverages: React.Dispatch<
    React.SetStateAction<InsuranceContextType["coverages"]>
  >;
  setTextFields: React.Dispatch<
    React.SetStateAction<InsuranceContextType["textFields"]>
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

  const [textFields, setTextFields] = useState({
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
    textFields,
    setTextFields,
    setCoverages,
    setDiscounts,
  };

  return (
    <InsuracneContext.Provider value={value}>
      {children}
    </InsuracneContext.Provider>
  );
}
