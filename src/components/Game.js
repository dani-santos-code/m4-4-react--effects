import React, { createContext, useContext } from "react";
import styled from "styled-components";
import { GameContext } from "./GameContext";

import cookieSrc from "../cookie.svg";
import Item from "./Item";

import { items } from "../data";

export const ItemContext = createContext(null);

const Game = () => {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    cookiesPerSecond
  } = useContext(GameContext);

  React.useEffect(() => {
    document.title = `🍪${numCookies} cookies - Cookie Clicker Workshop`;
    return () => {
      document.title = `Cookie Clicker Workshop`;
    };
  }, [numCookies]);

  React.useEffect(() => {
    const handleSpaceClick = e => {
      if (e.code === "Space") {
        setNumCookies(numCookies + 1);
      }
    };
    window.addEventListener("keydown", handleSpaceClick);
    return () => {
      window.removeEventListener("keydown", handleSpaceClick);
    };
  }, [numCookies, setNumCookies]);

  const handleClick = (cost, name) => {
    const identifier = name.toLowerCase();
    let currentValue = purchasedItems[identifier];
    const updatePurchasedItems = {
      ...purchasedItems,
      [identifier]: currentValue + 1
    };
    if (numCookies >= cost) {
      setPurchasedItems(updatePurchasedItems);
      setNumCookies(numCookies - cost);
    } else {
      alert("You have insufficient funds!");
      return;
    }
  };

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cookiesPerSecond}</strong> cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(({ name, cost, value, id }, i) => {
          const numOwned = purchasedItems[id];
          const key = `${id}-${i}`;
          const isFirstItem = () => i === 0;
          return (
            <ItemContext.Provider
              key={key}
              value={{
                isFirstItem,
                name,
                cost,
                value,
                numOwned,
                handleClick
              }}
            >
              <Item />
            </ItemContext.Provider>
          );
        })}
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  justify-content: space-around;
`;
const GameArea = styled.div`
  /* flex: 1;*/
  display: grid;
  align-content: center;
  align-self: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin-top: 100px;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
