// src/context/CurrencyContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type CurrencyType = "EUR" | "USD" | "GBP" | "CHF" | "ARS";

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrencyState] = useState<CurrencyType>("EUR");

  useEffect(() => {
    loadCurrency();
  }, []);

  const loadCurrency = async () => {
    try {
      const savedCurrency = await AsyncStorage.getItem("@app_currency");
      if (
        savedCurrency === "EUR" ||
        savedCurrency === "USD" ||
        savedCurrency === "GBP" ||
        savedCurrency === "CHF" ||
        savedCurrency === "ARS"
      ) {
        setCurrencyState(savedCurrency);
      }
    } catch (error) {
      console.error("Erreur chargement devise:", error);
    }
  };

  const setCurrency = async (newCurrency: CurrencyType) => {
    setCurrencyState(newCurrency);
    try {
      await AsyncStorage.setItem("@app_currency", newCurrency);
    } catch (error) {
      console.error("Erreur sauvegarde devise:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
};
