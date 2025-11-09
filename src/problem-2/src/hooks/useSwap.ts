import { useState, useEffect } from "react";
import type { Coin } from "@/types/coin";
import { coinApi } from "@/services/coinApi";
import { toast } from "sonner";

export const useSwap = () => {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const [fromCoin, setFromCoin] = useState<string>("bitcoin");
  const [toCoin, setToCoin] = useState<string>("solana");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [isLoadingCoins, setIsLoadingCoins] = useState<boolean>(true);
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(false);

  useEffect(() => {
    const loadCoinList = async () => {
      try {
        const coins = await coinApi.getCoinList();
        setCoinList(coins);
      } catch (error) {
        console.error("Failed to load coin list:", error);
        toast.error("Failed to load coin list. Please refresh the page.");
      } finally {
        setIsLoadingCoins(false);
      }
    };

    loadCoinList();
  }, []);

  useEffect(() => {
    const getExchangeRate = async () => {
      if (!fromCoin || !toCoin || coinList.length === 0) return;

      setIsLoadingRate(true);
      try {
        const toCoinSymbol = coinList.find((coin) => coin.value === toCoin)?.symbol;
        if (!toCoinSymbol) return;

        const rate = await coinApi.getExchangeRate(fromCoin, toCoinSymbol);
        setExchangeRate(rate);
      } catch (error) {
        console.error("Failed to get exchange rate:", error);
        toast.error("Failed to get exchange rate. Please try again.");
        setExchangeRate(null);
      } finally {
        setIsLoadingRate(false);
      }
    };

    getExchangeRate();
  }, [fromCoin, toCoin, coinList]);

  const handleFromAmountChange = (amount: number) => {
    setFromAmount(amount);
    if (exchangeRate && amount > 0) {
      setToAmount(amount * exchangeRate);
    } else {
      setToAmount(null);
    }
  };

  const handleSwapCoins = () => {
    const tempCoin = fromCoin;
    const tempAmount = fromAmount;
    setFromCoin(toCoin);
    setToCoin(tempCoin);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromAmount || fromAmount <= 0) {
      toast.error("Please enter a valid amount to swap");
      return;
    }

    if (!fromCoin || !toCoin) {
      toast.error("Please select both currencies");
      return;
    }

    if (!exchangeRate) {
      toast.error("Exchange rate is not available");
      return;
    }

    setIsSwapping(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const fromSymbol = coinList
        .find((coin) => coin.value === fromCoin)
        ?.symbol.toUpperCase();
      const toSymbol = coinList
        .find((coin) => coin.value === toCoin)
        ?.symbol.toUpperCase();

      toast.success(
        `Successfully swapped ${fromAmount} ${fromSymbol} for ${toAmount} ${toSymbol}!`
      );

      setFromAmount(null);
      setToAmount(null);
    } catch {
      toast.error("Swap failed. Please try again.");
    } finally {
      setIsSwapping(false);
    }
  };

  const isSwapDisabled = isSwapping || !fromAmount || !toAmount || !exchangeRate;

  return {
    coinList,
    fromCoin,
    toCoin,
    exchangeRate,
    fromAmount,
    toAmount,
    isSwapping,
    isLoadingCoins,
    isLoadingRate,
    isSwapDisabled,
    
    setFromCoin,
    setToCoin,
    handleFromAmountChange,
    handleSwapCoins,
    handleSwapSubmit,
  };
};