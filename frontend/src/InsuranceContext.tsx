import React, { createContext, useContext, useState } from "react";

interface InsuranceContextType {
  checkboxes: {
    commercialDiscount: boolean;
    adviserDiscount: boolean;
    vipDiscount: boolean;
    strongCarSurcharge: boolean;
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
  setCheckboxes: React.Dispatch<
    React.SetStateAction<InsuranceContextType["checkboxes"]>
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
  const [checkboxes, setCheckboxes] = useState({
    commercialDiscount: false,
    adviserDiscount: false,
    vipDiscount: false,
    strongCarSurcharge: false,
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
    checkboxes,
    textFields,
    setCheckboxes,
    setTextFields,
  };

  return (
    <InsuracneContext.Provider value={value}>
      {children}
    </InsuracneContext.Provider>
  );
}
