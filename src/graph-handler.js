const GraphDB = require("graphdb-js");

let graphdb = new GraphDB({
  hostname: "localhost",
  repository: "Movies",
});

export default graphdb;
