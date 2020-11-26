import { Component } from "react";
export default class RequestHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { querry: "", result: "s" };
  }
  clickHandler = (event) => {
    //   perform the actiont
    let tempquerry = this.state.querry;
    this.setState({ result: tempquerry });
  };
  onInputChangeHandler = (change) => {
    this.setState({ querry: change.target.value });
  };
  render() {
    return (
      <div>
        <h1>Enter your querry here</h1>
        <input
          type="text"
          value={this.querry}
          onChange={this.onInputChangeHandler}
        ></input>
        <button onClick={this.clickHandler}>click me to get result</button>
        <h1>{this.state.result}</h1>
      </div>
    );
  }
}
