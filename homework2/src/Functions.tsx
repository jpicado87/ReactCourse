import React from "react";
import { PropsFunctions } from "./PropsFunctions";

export default function Functions() {
  const [firstName, setFirstName] = React.useState<string>("Jorge");
  const [lastName] = React.useState("Picado");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  return (
    <>
      <h1>Hi, my name is {firstName}</h1>
      <section></section>
      <input type="text" value={firstName} onChange={handleChange} />
      <PropsFunctions lastName={lastName} />
    </>
  );
}
