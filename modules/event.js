'use strict';
const superagent = require('superagent');
module.exports = getEvents;

function getEvents(location) {
    const url = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENT_API_KEY}&location=${query.formatted_query}`;
    return superagent.get(url)
        .then(data => parseEventsData(JSON.parse(data.text)))
        .catch(err => console.error(err));
}
function parseEventsData(data) {
    try {
        const events = data.events.event.map(eventData => {
            const event = new Event(eventData);
            return event;
        });
        return Promise.resolve(events)
    } catch (e) {
        return Promise.reject(e);
    }
}

function Event(event) {
    this.link = event.url;
    this.name = event.title;
    this.event_date = event.start_time;
    this.summary = event.description;
}