export interface Coin {
  label: string;
  value: string;
  symbol: string;
}

export interface SwapState {
  coinList: Coin[];
  fromCoin: string;
  toCoin: string;
  exchangeRate: number | null;
  fromAmount: number | null;
  toAmount: number | null;
  isSwapping: boolean;
}