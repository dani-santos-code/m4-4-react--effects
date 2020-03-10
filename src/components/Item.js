import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

const StyledCostInfo = styled.div`
  color: grey;
`;
const StyledH2 = styled.h2``;

const PurchasedItems = styled.div`
  font-size: 30px;
`;
const Item = ({ name, value, cost, quantity }) => {
  return (
    <>
      <Wrapper>
        <ItemWrapper>
          <StyledH2>{name}</StyledH2>
          <StyledCostInfo>
            Cost: {cost} cookie(s). Produces {value} cookie/second
          </StyledCostInfo>
        </ItemWrapper>
        <PurchasedItems>{quantity}</PurchasedItems>
      </Wrapper>
    </>
  );
};

export default Item;
