import type { Coin } from "@/types/coin";

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API;
const API_KEY = "CG-jMP4Aic6NeM8dxY9pCxSyDn8";

const getHeaders = () => ({
  "x-cg-demo-api-key": API_KEY,
});

export const coinApi = {
  async getCoinList(): Promise<Coin[]> {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd`,
      {
        headers: getHeaders(),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch coin list: ${response.status}`);
    }
    
    const coinList = await response.json();
    return coinList.map((coin: { name: string; id: string; symbol: string }) => ({
      label: coin.symbol.toUpperCase(),
      value: coin.id,
      symbol: coin.symbol,
    }));
  },

  async getExchangeRate(fromCoin: string, toCoinSymbol: string): Promise<number | null> {
    const response = await fetch(
      `${API_BASE_URL}/simple/price?ids=${fromCoin}&vs_currencies=${toCoinSymbol}`,
      {
        headers: getHeaders(),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rate: ${response.status}`);
    }
    
    const rate = await response.json();
    return rate?.[fromCoin]?.[toCoinSymbol] ?? null;
  },
};