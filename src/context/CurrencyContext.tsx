// // src/context/CurrencyContext.tsx
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { createContext, useContext, useEffect, useState } from "react";

// type CurrencyType = "EUR" | "USD" | "GBP" | "CHF" | "ARS";

// interface CurrencyContextType {
//   currency: CurrencyType;
//   setCurrency: (currency: CurrencyType) => void;
//   formatCurrency: (amount: number) => string;
// }

// const CurrencyContext = createContext<CurrencyContextType | undefined>(
//   undefined,
// );

// export const CurrencyProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [currency, setCurrencyState] = useState<CurrencyType>("EUR");

//   useEffect(() => {
//     loadCurrency();
//   }, []);

//   const loadCurrency = async () => {
//     try {
//       const savedCurrency = await AsyncStorage.getItem("@app_currency");
//       if (
//         savedCurrency === "EUR" ||
//         savedCurrency === "USD" ||
//         savedCurrency === "GBP" ||
//         savedCurrency === "CHF" ||
//         savedCurrency === "ARS"
//       ) {
//         setCurrencyState(savedCurrency);
//       }
//     } catch (error) {
//       console.error("Erreur chargement devise:", error);
//     }
//   };

//   const setCurrency = async (newCurrency: CurrencyType) => {
//     setCurrencyState(newCurrency);
//     try {
//       await AsyncStorage.setItem("@app_currency", newCurrency);
//     } catch (error) {
//       console.error("Erreur sauvegarde devise:", error);
//     }
//   };

//   // const formatCurrency = (amount: number) => {
//   //   return new Intl.NumberFormat("fr-FR", {
//   //     // style: "currency",
//   //     currency: currency,
//   //     minimumFractionDigits: 2,
//   //   }).format(amount);
//   // };

// //   return (
// //     <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
// //       {children}
// //     </CurrencyContext.Provider>
// //   );
// // };

// const formatCurrency = (amount: number) => {
//   const formattedNumber = new Intl.NumberFormat("fr-FR", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);

//   return `${formattedNumber} ${currency}`;
// };
// };
// export const useCurrency = () => {
//   const context = useContext(CurrencyContext);
//   if (!context) {
//     throw new Error("useCurrency must be used within CurrencyProvider");
//   }
//   return context;
// };

// src/context/CurrencyContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// Liste des principales devises du monde
export const CURRENCIES = [
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
  { code: "USD", name: "Dollar US", flag: "🇺🇸", symbol: "$" },
  { code: "GBP", name: "Livre Sterling", flag: "🇬🇧", symbol: "£" },
  { code: "CHF", name: "Franc Suisse", flag: "🇨🇭", symbol: "Fr" },
  { code: "ARS", name: "Peso Argentin", flag: "🇦🇷", symbol: "$" },
  { code: "CAD", name: "Dollar Canadien", flag: "🇨🇦", symbol: "$" },
  { code: "AUD", name: "Dollar Australien", flag: "🇦🇺", symbol: "$" },
  { code: "JPY", name: "Yen Japonais", flag: "🇯🇵", symbol: "¥" },
  { code: "CNY", name: "Yuan Chinois", flag: "🇨🇳", symbol: "¥" },
  { code: "INR", name: "Roupie Indienne", flag: "🇮🇳", symbol: "₹" },
  { code: "BRL", name: "Real Brésilien", flag: "🇧🇷", symbol: "R$" },
  { code: "MXN", name: "Peso Mexicain", flag: "🇲🇽", symbol: "$" },
  { code: "KRW", name: "Won Sud-Coréen", flag: "🇰🇷", symbol: "₩" },
  { code: "SGD", name: "Dollar de Singapour", flag: "🇸🇬", symbol: "$" },
  { code: "NZD", name: "Dollar Néo-Zélandais", flag: "🇳🇿", symbol: "$" },
  { code: "SEK", name: "Couronne Suédoise", flag: "🇸🇪", symbol: "kr" },
  { code: "NOK", name: "Couronne Norvégienne", flag: "🇳🇴", symbol: "kr" },
  { code: "DKK", name: "Couronne Danoise", flag: "🇩🇰", symbol: "kr" },
  { code: "ZAR", name: "Rand Sud-Africain", flag: "🇿🇦", symbol: "R" },
  { code: "TRY", name: "Lire Turque", flag: "🇹🇷", symbol: "₺" },
  { code: "RUB", name: "Rouble Russe", flag: "🇷🇺", symbol: "₽" },
  { code: "PLN", name: "Zloty Polonais", flag: "🇵🇱", symbol: "zł" },
  { code: "HUF", name: "Forint Hongrois", flag: "🇭🇺", symbol: "Ft" },
  { code: "CZK", name: "Couronne Tchèque", flag: "🇨🇿", symbol: "Kč" },
  { code: "AED", name: "Dirham Émirati", flag: "🇦🇪", symbol: "د.إ" },
  { code: "SAR", name: "Riyal Saoudien", flag: "🇸🇦", symbol: "﷼" },
  { code: "ILS", name: "Shekel Israélien", flag: "🇮🇱", symbol: "₪" },
  { code: "THB", name: "Baht Thaïlandais", flag: "🇹🇭", symbol: "฿" },
  { code: "MYR", name: "Ringgit Malaisien", flag: "🇲🇾", symbol: "RM" },
  { code: "IDR", name: "Roupie Indonésienne", flag: "🇮🇩", symbol: "Rp" },
  { code: "PHP", name: "Peso Philippin", flag: "🇵🇭", symbol: "₱" },
];

export type CurrencyType = (typeof CURRENCIES)[number]["code"];

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  formatCurrency: (amount: number) => string;
  getCurrencyInfo: (code: CurrencyType) => (typeof CURRENCIES)[0];
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
      const validCurrencies = CURRENCIES.map((c) => c.code);
      if (
        savedCurrency &&
        validCurrencies.includes(savedCurrency as CurrencyType)
      ) {
        setCurrencyState(savedCurrency as CurrencyType);
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

  const getCurrencyInfo = (code: CurrencyType) => {
    return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
  };

  const formatCurrency = (amount: number) => {
    // const info = getCurrencyInfo(currency);
    const formattedNumber = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return `${formattedNumber} ${currency}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatCurrency, getCurrencyInfo }}
    >
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
