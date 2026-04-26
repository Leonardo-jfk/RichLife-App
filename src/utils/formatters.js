// export const formatCurrency = (amount) => {
//   return new Intl.NumberFormat("fr-FR", {
//     style: "currency",
//     currency: "EUR",
//     minimumFractionDigits: 2,
//   }).format(amount);
// };
//
// export const formatDate = (date) => {
//   return new Date(date).toLocaleDateString("fr-FR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// };
//
// export const formatMonth = (date) => {
//   return new Date(date).toLocaleDateString("fr-FR", {
//     month: "long",
//     year: "numeric",
//   });
// };


// src/utils/formatters.js

export const formatCurrency = (amount, currency = "EUR", locale = "fr-FR") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date, locale = "fr-FR") => {
  return new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatMonth = (date, locale = "fr-FR") => {
  return new Date(date).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
};