import React from "react";
import PropTypes from "prop-types";
import { items } from "../data";
import usePersistedState from "../hooks/use-persisted-state.hook";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  let totalCookiesPerSecond = 0;
  const [numCookies, setNumCookies] = usePersistedState(1000, "numCookies");
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0
  });

  const calculateCookiesPerSecond = purchasedItems => {
    const cookiesAmount = items.map(({ value, id }) => {
      const numOwned = purchasedItems[id];
      return numOwned * value;
    });

    totalCookiesPerSecond = cookiesAmount.reduce(
      (currentValue, incrementor) => {
        return currentValue + incrementor;
      }
    );
    return totalCookiesPerSecond;
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.elementType.isRequired
};
