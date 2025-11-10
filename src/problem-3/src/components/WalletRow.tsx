import React from "react";

interface WalletRowProps {
  className?: string;
  amount?: string | number;
  usdValue?: string | number;
  formattedAmount?: string | number;
}

export const WalletRow: React.FC<WalletRowProps> = ({
  className,
  amount = "0.00",
  usdValue = "$0.00",
  formattedAmount = "0.00",
}) => {
  return (
    <div
      className={`${className}`}
    >
        <span>Amount</span>
        <span>{formattedAmount}</span>
        <span>{amount}</span>
        <span>{usdValue}</span>
    </div>
  );
};
