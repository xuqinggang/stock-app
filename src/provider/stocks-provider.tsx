import React, { PropsWithChildren } from "react";

import stocksStore, { StocksStore } from "@/store/stocks";

interface GlobalContextProps {
  stocksStore: StocksStore;
}

const StocksContext = React.createContext<GlobalContextProps>({
  stocksStore,
});

export function StocksProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <StocksContext.Provider value={{ stocksStore }}>
      {children}
    </StocksContext.Provider>
  );
}

export function useStocks() {
  return React.useContext(StocksContext);
}
