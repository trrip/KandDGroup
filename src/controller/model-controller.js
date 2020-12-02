import DataModel from "../model/data-model";

class DataSourceController {
  constructor(listOfQuerries, listOfNames) {
    this.listHolder = [];
    console.log(listOfNames.length);
    for (let i = 0; i < listOfNames.length; i++) {
      console.log(i);
      this.listHolder.push(new DataModel(listOfQuerries[i], listOfNames[i]));
      console.log(this.listHolder);
    }
  }
}
let obj = new DataSourceController(
  [
    `PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?result where { 
    ?movie movie:releaseDate ?o
    FILTER(year(?o) <= year("2018-01-01"^^<http://www.w3.org/2001/XMLSchema#date>))
    ?movie movie:revenue ?rev.
    FILTER(?rev >= 200000000)
    ?movie movie:title ?result
}
`,
    `
PREFIX foo: <http://foo.example/>
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?result where {
?s movie:title movie:Justice%20League.
?s actor:birthDate ?o
FILTER(year(NOW()) - year(?o) <= 30)
?s actor:name ?result
}`,
    `
PREFIX foo: <http://foo.example/>
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?result where {
movie:Justice%20League movie:id ?o.
?o movie:mean_vote ?result
}
`,
    `
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?result where {
?movie movie:revenue ?revenue.
{
select (MAX(?rev) as ?revv) where {
?movie1 movie:releaseDate ?o1.
FILTER(year(?o1) = year("2017-01-01"^^<http://www.w3.org/2001/XMLSchema#date>))
?movie1 movie:revenue ?rev  
 }
}
FILTER(?revenue = ?revv)
?movie movie:title ?result
}`,
    `
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?result where {
actor:Gal%20Gadot movie:title ?o1.
?o1 movie:title ?result
}
`,
    `
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?result where {
?movie movie:revenue ?revenue.
{
select (MAX(?rev) as ?revv) where {
?movie1 movie:releaseDate ?o1.
?movie1 movie:revenue ?rev.  
 }
}
FILTER(?revenue = ?revv)
?movie movie:Cast ?result
}
`,
    `
PREFIX foo: <http://foo.example/>
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?result where {
?o movie:mean_vote ?vote.
FILTER(?vote > 7.5)
?p movie:id ?o.
?p movie:title ?result
}`,
  ],
  [
    `Which movies came before X(2018) year where gross revenue was over Y(200,000,000) dollars?`,
    `Who are the people involved in the movie with age less than X(30) year?`,
    `How well was the X (Justice leauge) movie received by the people? `,
    `Which movie performed best in box office in X(2017) year based on gross revenue?`,
    `Actor/Actress X (Gal Gadot) appeared in which movies?`,
    `Who were the cast in top grossing movie?`,
    `Which movies are rated X (7.5) or higher/lower(higher)?`,
  ]
);

export default obj;
