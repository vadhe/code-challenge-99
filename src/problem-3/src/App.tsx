import { useMemo } from "react";
import { WalletRow } from "./components/WalletRow";

interface WalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}


// remove BoxProps import because BoxProps is not used in the file
// change props name to make it clear definition
interface WalletPageProps {
  children?: React.ReactNode;
}

// Mock hooks
const useWalletBalances = (): WalletBalance[] => [];
const usePrices = (): Record<string, number> => ({});

const classes = {
  row: "flex justify-between p-4 border-b",
};
const WalletPage: React.FC<WalletPageProps> = (props: WalletPageProps) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();
  // change type any to string because blockchain is a string
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.currency);
        // update lhsPriority to balancePriority because we are checking balance here and lhsPriority is not defined
        // and we can directly return the condition like this
        return balancePriority > -99 && balance.amount > 0;
      })
      // update callback sort function to make it more readable
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) => getPriority(lhs.currency) - getPriority(rhs.currency)
      );
    // remove prices from dependency array because prices is not used in the function
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance:WalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          // use formattedBalances instead of balance to get the formatted amount
          amount={formattedBalances[index].formatted}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  

  return <div {...rest}>{rows}</div>;
};


function App() {
  return (
    <>
        <WalletPage />
    </>
  );
}

export default App;