import React, { Component } from "react";

export default class StudentsListClass extends Component {
  render() {
    const { studentsList } = this.props;
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
              "_class"
            }
          >
            <p>First Name: {student.firstName}</p>
            <p>Last Name: {student.lastName}</p>
            <p>Age: {student.age}</p>
          </li>
        ))}
      </React.Fragment>
    );
  }
}
