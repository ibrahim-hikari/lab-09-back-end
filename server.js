`use strict`;

require('dotenv').config();
const express = require('express')
const cors = require('cors')
const superagent = require('superagent');
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;
const server = express();

server.use(cors());

server.get('/', (request, response) => {
    response.status(200).send('Hello everyone')
})



server.get('/location', locationHandler);
server.get('/weather', weatherHandler);
server.get('/events', eventsHandler);
server.get('/movies', moviesHandler);
server.get('/yelp', yelpHandler);
server.get('/trails', trailsHandler);


const client = require('./modules/client.js');
const location = require('./modules/location.js');
const weather = require('./modules/weather.js');
const events = require('./modules/events.js');
const movies = require('./modules/movies.js');
const yelp = require('./modules/yelp.js');
const trails = require('./modules/trails.js');

server.use('*', notFoundHandler);
server.ues(errorHandler);

function locationHandler(req, res) {
    const city = req.query.data;
    location.getLoctionDtata(city)
        .then(data => sendJson(data, res))
        .catch((error) => errorHndler(error, req, res));
}

function weatherHandler(req, res) {
    const location = req.query.data;
    weather(location)
        .then(summaries => sendJson(summaries, res))
        .catch((error) => errorHndler(error, req, res));
}

function eventsHandler(req, res) {
    const location = req.query.data.formatted_query;
    events(location)
        .then(eventslist => sendJson(eventslist, res))
        .catch((error) => errorHndler(error, req, res));
}

function yelpHandler(req, res) {
    const location = req.query.data.search_query;
    yelp(location)
        .then(reviews => sendJson(reviews, res))
        .catch((error) => errorHndler(error, req, res));
}

function trailsHandler(req, res) {
    const latitude = req.query.data.latitude;
    const longitude = req.query.data.longitude;
    trails(latitude, longitude)
        .then(trailslist => sendJson(trailslist, res))
        .catch((error) => errorHndler(error, req, res));
}


function moviesHandler(req, res) {
    const location = req.query.data.formatted_query;
    movies(location)
        .then(trailslist => sendJson(trailslist, res))
        .catch((error) => errorHndler(error, req, res));
}

function sendJson(data, res) {
    res.status(200).json(data);
}

function notFoundHandler(req, res) {
    res.status(404).send('what?');
}

function errorHandler(error, req, res) {
    res.status(500).send('error');
}

function startServer() {
    server.listen(PORT, () => console.log(`server up on ${PORT}`));
}

client.connect()
    .then(startServer)
    .catch(err => console.error(err));