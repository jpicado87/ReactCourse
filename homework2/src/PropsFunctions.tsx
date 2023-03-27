import React from "react";

interface IPropsFunctions {
  lastName: string;
}

export const PropsFunctions: React.FC<IPropsFunctions> = (props) => {
  return (
    <>
      <p>{props.lastName}</p>
    </>
  );
};
