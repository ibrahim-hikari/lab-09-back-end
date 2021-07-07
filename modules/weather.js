'use strict';
const superagent = require('superagent');
module.exports = getWeather;
function getWeather(location) {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${query.latitude},${query.longitude}`;
    return superagent.get(url)
        .then(data => parseWeather(data.body));
}

function parseWeather(data) {
    try {
        const weatherSummaries = data.daily.data.map(day => {
            return new weather(day);

        });
        return Promise.resolve(weatherSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}
function weather(day) {
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toString().slice(0, 15);
}