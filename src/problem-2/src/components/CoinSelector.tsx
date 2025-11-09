import type { Coin } from "@/types/coin";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface CoinSelectorProps {
  coins: Coin[];
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const CoinSelector = ({ 
  coins, 
  value, 
  onChange, 
  isLoading = false,
  placeholder = "Select a token" 
}: CoinSelectorProps) => {
  if (isLoading) {
    return <Skeleton className="h-9 w-[180px] rounded-lg" />;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Token List</SelectLabel>
          {coins.map((coin) => (
            <SelectItem key={coin.value} value={coin.value}>
              {coin.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};