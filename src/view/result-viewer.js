import { Component } from "react";

export default class ResultViewer extends Component {
  render() {
    let temp;
    console.log(this.props);
    if (this.props.list === "-") {
      return <p>This list is empty</p>;
    }
    try {
      temp = JSON.parse(this.props.list).results.bindings;
    } catch (e) {
      console.log("some error values");
      temp = [];
    } finally {
      //   temp = [];
    }
    return (
      <p>
        <p style={{ alignContent: "center", fontSize: 10 }}>Result is</p>
        {temp
          .filter((item) => item.result.type === "literal")
          .map((item) => (
            <p
              style={{ alignContent: "center", fontSize: 14 }}
              key={item.result.value}
            >
              {item.result.value}
            </p>
          ))}
      </p>
    );
  }
}
