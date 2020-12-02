#Which movies came before X year where gross revenue was over Y dollars?
#Who are the people involved in the movie with age less than X year?
#How well was the movie received by the people?
#Which movie performed best in box office in X year based on gross revenue?
#Actor/Actress X appeared in which movies?
#Who were the cast in top grossing movie?
#Which movies are rated X or higher/lower?

For 1
#Which movies came before X year where gross revenue was over Y dollars?
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?rev ?title where {
?movie movie:releaseDate ?o
FILTER(year(?o) <= year("2018-01-01"^^<http://www.w3.org/2001/XMLSchema#date>))
?movie movie:revenue ?rev.
FILTER(?rev >= 200000000)
?movie movie:title ?title
}

For 2
#Who are the people involved in the movie with age less than X year?
PREFIX foo: <http://foo.example/>
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?n where {
?s movie:title movie:Justice%20League.
?s actor:birthDate ?o
FILTER(year(NOW()) - year(?o) <= 30)
?s actor:name ?n
}

For 3
#How well was the movie received by the people?

PREFIX foo: <http://foo.example/>
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?vote where {
movie:Justice%20League movie:id ?o.
BIND(URI(CONCAT( "http://foo.example/Movie/", ?o)) AS ?name)
?name movie:mean_vote ?vote
}

For 4
#Which movie performed best in box office in X year based on gross revenue?
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?cast where {
?movie movie:revenue ?revenue.
{
select (MAX(?rev) as ?revv) where {
?movie1 movie:releaseDate ?o1.
FILTER(year(?o1) = year("2017-01-01"^^<http://www.w3.org/2001/XMLSchema#date>))
?movie1 movie:revenue ?rev  
 }
}
FILTER(?revenue = ?revv)
?movie movie:title ?cast
}

For 5
#Actor/Actress X appeared in which movies?

PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?o where {
actor:Gal%20Gadot movie:title ?o1.
?o1 movie:title ?o
}

For 6
#Who were the cast in top grossing movie?

PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?cast where {
?movie movie:revenue ?revenue.
{
select (MAX(?rev) as ?revv) where {
?movie1 movie:releaseDate ?o1
?movie1 movie:revenue ?rev.  
 }
}
FILTER(?revenue = ?revv)
?movie movie:Cast ?cast
}

For 7
#Which movies are rated X or higher/lower?

PREFIX foo: <http://foo.example/>
PREFIX actor: <http://foo.example/Actors/>
PREFIX movie: <http://foo.example/Movie/>
PREFIX movieDetails: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?id where {
?o movie:mean_vote ?vote.
FILTER(?vote > 7.5)
?p movie:id ?o.
?p movie:title ?id
}
