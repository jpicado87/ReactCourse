import React from "react";

export const StudentsListFunction = ({ studentsList }) => {
  return (
    <React.Fragment>
      {studentsList.map((student) => (
        <li
          key={
            student.firstName +
            "_" +
            student.lastName +
            "_" +
            student.age +
            "_function"
          }
        >
          <p>First Name: {student.firstName}</p>
          <p>Last Name: {student.lastName}</p>
          <p>Age: {student.age}</p>
        </li>
      ))}
    </React.Fragment>
  );
};
