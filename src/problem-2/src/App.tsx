import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

function App() {
  const [coinList, setCoinList] = useState<
    { label: string; value: string; symbol: string }[]
  >([]);
  const [fromCoin, setFromCoin] = useState<string>("bitcoin");
  const [toCoin, setToCoin] = useState<string>("solana");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const getCoinList = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/coins/markets?vs_currency=usd`,
      {
        headers: {
          "x-cg-demo-api-key": "CG-jMP4Aic6NeM8dxY9pCxSyDn8",
        },
      }
    );
    const coinList = await response.json();
    setCoinList(
      coinList.map((coin: { name: string; id: string; symbol: string }) => ({
        label: coin.symbol.toUpperCase(),
        value: coin.id,
        symbol: coin.symbol,
      }))
    );
  };
  useEffect(() => {
    getCoinList();
  }, []);
  const getExchangeRate = async (fromCoin: string, toCoin: string) => {
    const toCoinSymbol = coinList.find((coin) => coin.value === toCoin);
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/simple/price?ids=${fromCoin}&vs_currencies=${toCoinSymbol?.symbol}`,
      {
        headers: {
          "x-cg-demo-api-key": "CG-jMP4Aic6NeM8dxY9pCxSyDn8",
        },
      }
    );
    const rate = await response.json();
    setExchangeRate(rate?.[fromCoin]?.[toCoinSymbol?.symbol ?? ""] ?? null);
  };
  useEffect(() => {
    if (fromCoin && toCoin && coinList.length > 0) {
      getExchangeRate(fromCoin, toCoin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCoin, toCoin, coinList]);
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl">Currency Swap</CardTitle>
            <CardDescription>
              Exchange your assets instantly with the best rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Label className="text-sm font-medium text-muted-foreground mb-2">
                From
              </Label>
              <div className="flex gap-4">
                <Select
                  defaultValue="bitcoin"
                  onValueChange={(value) => setFromCoin(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Token List</SelectLabel>
                      {coinList.map((coin) => (
                        <SelectItem key={coin.value} value={coin.value}>
                          {coin.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="w-10 h-10 flex items-center mx-auto mt-6 border p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#737373"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-down-up-icon lucide-arrow-down-up"
                >
                  <path d="m3 16 4 4 4-4" />
                  <path d="M7 20V4" />
                  <path d="m21 8-4-4-4 4" />
                  <path d="M17 4v16" />
                </svg>
              </div>
              <Label className="text-sm font-medium text-muted-foreground mb-2">
                To
              </Label>

              <div className="flex gap-4">
                <Select
                  defaultValue="solana"
                  onValueChange={(value) => setToCoin(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Token List</SelectLabel>
                      {coinList.map((coin) => (
                        <SelectItem key={coin.value} value={coin.value}>
                          {coin.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input type="number" placeholder="0.00" />
              </div>
            </form>
            <div className="flex justify-between border p-2 rounded-lg mt-4">
              <div className="text-muted-foreground text-sm">Exchange Rate</div>
              <div>
                1{" "}
                {coinList
                  .find((coin) => coin.value === fromCoin)
                  ?.symbol.toUpperCase()}{" "}
                = {exchangeRate}{" "}
                {coinList
                  .find((coin) => coin.value === toCoin)
                  ?.symbol.toUpperCase()}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Swap
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default App;
