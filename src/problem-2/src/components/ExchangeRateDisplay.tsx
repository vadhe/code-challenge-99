import type { Coin } from "@/types/coin";
import { Skeleton } from "@/components/ui/skeleton";

interface ExchangeRateDisplayProps {
  exchangeRate: number | null;
  fromCoin: string;
  toCoin: string;
  coinList: Coin[];
  isLoading?: boolean;
}

export const ExchangeRateDisplay = ({ 
  exchangeRate, 
  fromCoin, 
  toCoin, 
  coinList, 
  isLoading = false 
}: ExchangeRateDisplayProps) => {
  const fromSymbol = coinList.find((coin) => coin.value === fromCoin)?.symbol.toUpperCase();
  const toSymbol = coinList.find((coin) => coin.value === toCoin)?.symbol.toUpperCase();

  return (
    <div className="flex justify-between border p-2 rounded-lg mt-4">
      <div className="text-muted-foreground text-sm">Exchange Rate</div>
      {isLoading ? (
        <Skeleton className="h-5 w-1/2 rounded-lg" />
      ) : exchangeRate && fromSymbol && toSymbol ? (
        <div>
          1 {fromSymbol} = {exchangeRate} {toSymbol}
        </div>
      ) : (
        <div className="text-muted-foreground text-sm">Not available</div>
      )}
    </div>
  );
};