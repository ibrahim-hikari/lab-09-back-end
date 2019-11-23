`use strict`;

require('dotenv').config();
const express = require('express')
const cors = require('cors')
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());

server.get('/', (request, response) => {
    response.status(200).send('Hello everyone')
})



server.get('/event', eventHandler);



// ---- Location section ---- \\

const location = require('./location.js')
server.get('/location', location.locationHandler);



// ---- Weather section ---- \\
const weather = require('./weather.js')
server.get('/weather', weather.weatherHandler);


// ---- Event section ---- \\

function eventHandler(req, res) {
    getEvent(req.query.data)
        .then(eventData => res.status(200).json(eventData));

}

function getEvent(query) {
    const url = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENT_API_KEY}&location=${query.formatted_query}`;
    console.log('naseem', url);
    return superagent.get(url)
        .then(data => {
            const eventData = JSON.parse(data.text);
            return eventData.events.event.map((eventday) => {
                return new Event(eventday);
            });
        });
}

function Event(day) {
    this.link = day.url;
    this.name = day.title;
    this.event_data = day.start_time;
    this.summary = day.description;
}




server.get('/foo', (request, response) => {
    throw new Error('ops');
})

server.use('*', (request, response) => {
    response.status(404).send('Not Found')
})

server.use((error, request, response) => {
    response.status(500).send(error)
})



server.listen(PORT, () => console.log(`app listening on ${PORT}`))