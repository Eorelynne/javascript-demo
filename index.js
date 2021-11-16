//Require/import the Express module
//the full package is assigned to express.
const express = require('express');

//Create a web server. webServer often named app instead
const webServer = express();

//Serve all content in the frontend folder
webServer.use(express.static('frontend'));

//Start the web server on a specific port
//and then write to the console that it is up and running
webServer.listen(3000, () =>
  console.log('listening on port 3000'));

//Read json from the persons.json file
let persons = require('./persons.json');

//Create a route/url that serves all the persons data
webServer.get('/persons', (request, response) => {
  response.json(persons);
});


//Create a route/url that serves the data for ONE person
//based on which id we send to the route
//:id -> id is a request parameter
webServer.get('/persons/:id', (request, response) => {
  //A request parameter can be read like this
  //note that the plus sign converts from string to number
  let id = +request.params.id;
  //search for a person in the persons array that
  //has an id identical to the id we read from the request
  let person = persons.find(person => id === person.id);
  //Return the person data as json 
  response.json(person || null);
});

//Create a route/url that serves the data for persons
//whose name matches the search parameter
webServer.get('/persons/namesearch/:search', (request, response) => {
  //A request parameter can be read like //this, (note that we convert to lower //case)
  let search = request.params.search.toLowerCase();
  //search for a person in the persons array that
  //has an id identical to the id we read from the request
  let foundPersons = persons.filter(person =>
    (person.first_name + '' + person.last_name).toLowerCase().includes(search)
  );
  //Return the person data as json
  //Only return the first 25 hits if more than 25 persons found.
  response.json(foundPersons.slice(0, 25));
});
