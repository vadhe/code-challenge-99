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
import { CoinSelector } from "./components/CoinSelector";
import { ExchangeRateDisplay } from "./components/ExchangeRateDisplay";
import { SwapButton } from "./components/SwapButton";
import { useSwap } from "./hooks/useSwap";

function App() {
  const {
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
  } = useSwap();
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-4">
        <Card className="w-full max-w-sm">
          <form onSubmit={handleSwapSubmit}>
            <CardHeader className="text-center">
              <CardTitle className="text-4xl">Currency Swap</CardTitle>
              <CardDescription>
                Exchange your assets instantly with the best rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label className="text-sm font-medium text-muted-foreground mb-2">
                From
              </Label>
              <div className="flex gap-4">
                <CoinSelector
                  coins={coinList}
                  value={fromCoin}
                  onChange={setFromCoin}
                  isLoading={isLoadingCoins}
                />
                <Input
                  type="number"
                  value={fromAmount ?? ""}
                  onChange={(e) => handleFromAmountChange(Number(e.target.value))}
                  placeholder="0.00"
                />
              </div>
              
              <SwapButton onClick={handleSwapCoins} />
              
              <Label className="text-sm font-medium text-muted-foreground mb-2">
                To
              </Label>
              <div className="flex gap-4">
                <CoinSelector
                  coins={coinList}
                  value={toCoin}
                  onChange={setToCoin}
                  isLoading={isLoadingCoins}
                />
                <Input
                  disabled
                  value={toAmount ?? ""}
                  type="number"
                  placeholder="0.00"
                />
              </div>
              
              <ExchangeRateDisplay
                exchangeRate={exchangeRate}
                fromCoin={fromCoin}
                toCoin={toCoin}
                coinList={coinList}
                isLoading={isLoadingRate}
              />
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isSwapDisabled}
              >
                {isSwapping ? "Swapping..." : "Swap"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default App;
