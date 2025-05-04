import React from "react";
import { useContext } from "react";
import { SettingsContext } from "../../context/settingsContext";

const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€"
};

export const Currency = ({ amount }) => {
  const { settings } = useContext(SettingsContext);
  const symbol = currencySymbols[settings.currency] || "$";
  return (
    <span>
      {symbol}{Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </span>
  );
};
