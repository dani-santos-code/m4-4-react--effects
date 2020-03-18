import React from "react";

const usePersistedState = (amount, setter) => {
  const initialNumCookies = () =>
    Number(window.localStorage.getItem(setter)) || amount;

  const [numCookies, setNumCookies] = React.useState(initialNumCookies);

  React.useEffect(() => {
    window.localStorage.setItem("numCookies", setNumCookies);
  }, [setter]);

  return [numCookies, setNumCookies];
};

export default usePersistedState;
