import "./App.css";
// import Classes from "./Classes";
// import Functions from "./Functions";
import { StudentsListFunction } from "./StudentsListFunction";
import StudentsListClass from "./StudentsListClass";

const studentsList = [
  {
    firstName: "José",
    lastName: "Pérez",
    age: 20,
  },
  {
    firstName: "Juan",
    lastName: "Pérez",
    age: 20,
  },
  {
    firstName: "Luis",
    lastName: "Pérez",
    age: 20,
  },
  {
    firstName: "Cristian",
    lastName: "Pérez",
    age: 20,
  },
  {
    firstName: "Fiorella",
    lastName: "Pérez",
    age: 20,
  },
  {
    firstName: "Yensy",
    lastName: "Pérez",
    age: 20,
  },
];

function App() {
  return (
    <div>
      <h1>Classes Example</h1>
      {/* <h2>Input</h2>
      <Classes /> */}
      <h2>List</h2>
      <ul>
        <StudentsListClass studentsList={studentsList} />
      </ul>
      <h1>FunctionsExample</h1>
      {/* <h2>Input</h2>
      <Functions /> */}
      <h2>List</h2>
      <ul>
        <StudentsListFunction studentsList={studentsList} />
      </ul>
    </div>
  );
}

export default App;
