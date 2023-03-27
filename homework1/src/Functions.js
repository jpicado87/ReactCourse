import React from "react";
import PropsFunctions from "./PropsFunctions";

let timerId = null;

export default function Functions() {
  const [firstName, setFirstName] = React.useState("Jorge");
  const [lastName, setLastName] = React.useState("Picado");

  React.useEffect(() => {
    ////called only one time
    console.log("Did Mount");
    timerId = setTimeout(() => {
      setFirstName("Arturo");
      setLastName("Roblero");
    }, 3000);

    return () => {
      console.log("Will Unmount");
      clearTimeout(timerId);
    };
  }, []);

  React.useEffect(() => {
    console.log("Did Update");
    console.log(firstName);
  }, [firstName]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  console.log("Render");
  return (
    <div>
      <h3>Hello, my Name is: {firstName} </h3>
      <input type="text" value={firstName} onChange={handleFirstNameChange} />
      <PropsFunctions lastName={lastName} age={29} />
      <input type="text" value={lastName} onChange={handleLastNameChange} />
    </div>
  );
}
