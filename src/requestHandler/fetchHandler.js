import { Component } from "react";
import ResultViewer from "../view/result-viewer";
import graphdb from "../graph-handler";
import obj from "../controller/model-controller";
export default class RequestHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { result: "-", currentValue: "" };
  }
  clickHandler = (event) => {
    if (event.target.value === "") return;
    //   perform the actiont
    let tempquerry = this.state.querry;
    // console.log(graphdb);

    const select = event.target.value;

    graphdb.Query.query(select, (err, data) => {
      console.log(data);
      console.log(err);
      this.setState({ result: data, currentValue: select });
    }); // fetch("")

    this.setState({ result: tempquerry });
  };

  render() {
    let storage = obj;
    console.log(storage);
    return (
      <div>
        <h1>Selct your query here</h1>
        <select value={this.state.currentValue} onChange={this.clickHandler}>
          <option value=""></option>
          {storage.listHolder.map((s) => (
            <option value={s.querry}>{s.querryName}</option>
          ))}
        </select>
        {/* <h6>{this.state.result}</h6> */}
        <ResultViewer list={this.state.result} />
      </div>
    );
  }
}
