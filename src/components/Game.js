import React from "react";
import styled from "styled-components";

import Item from "./Item";
import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 }
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = React.useState(100);
  const purchasedItems = {
    cursor: 0,
    grandma: 0,
    farm: 0
  };
  const handleClick = () => {
    //TODO
    console.log("I was clicked");
    setNumCookies(numCookies + 1);
  };

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>0</strong> cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(({ name, cost, value, id }, i) => {
          const numOwned = purchasedItems[id];
          return (
            <Item
              key={`${id}-${i}`}
              name={name}
              cost={cost}
              value={value}
              numOwned={numOwned}
              handleClick={handleClick}
            />
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
