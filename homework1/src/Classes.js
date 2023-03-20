import React from "react";
import PropsClasses from "./PropsClasses";

export default class Classes extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "Jorge",
      lastName: "Picado",
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    console.log("Constructor");
  }

  componentDidMount() {
    //called only one time
    console.log("Did Mount");
    setTimeout(() => {
      this.setState({ firstName: "Arturo", lastName: "Roblero" }, () => {
        //console.log(this.state.firstName);
      });
    }, 3000);
  }

  componentDidUpdate() {
    console.log("Did Update");
  }

  componentWillUnmount() {
    console.log("Will Unmount");
  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  render() {
    console.log("Render");
    return (
      <div>
        <h3>Hello, my name is: {this.state.firstName}</h3>
        <input
          type="text"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange}
        />
        <PropsClasses lastName={this.state.lastName} />
        <input
          type="text"
          value={this.state.lastName}
          onChange={this.handleLastNameChange}
        />
      </div>
    );
  }
}
