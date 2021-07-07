'use strict';
const superagent = require('superagent');
const client = require('./client.js');

let cache = {};

const location = {};

location.loadCache = function () {
    let SQL = 'SELECT * FORM locations ';
    return client.query(SQL)
        .then(results => {
            cache = results.rows.reduce((cache, entry) => {
                cache[entry['search_query']] = entry;
                return cache;
            }, {});

        })
        .catch(err => console.error(err));
};
location.grtLocationData = function (city) {
    let SQL = 'SELECT *FORM location WHERE search_query = $0';
    let values = [city];
    return client.query(SQL, valurs)
        .then(results => {
            if (results.rowCount) { return results.rows[0]; }
            else {
                const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`

                return superagent.get(url)
                    .then(data => cacheLocation(city, data.body));
            }
        });
};
function cacheLocation(city, data) {
    const location = new Location(data.results[0]);
    let SQL = 'INSERT INTO locations (search_query, location.latitude,location.longitude)VA '
    let values = [city, location.formatted_query, location.latitude, location.longitude];
    return client.query(SQL, values)
        .then(results => {
            const savedLocation = results.rows[0];
            cache[city] = savedLocation;
            return savedLocation;
        });
}
function Location(data) {
    this.formatted_query = data.formatted_address;
    this.latitude = data.geometry.location.latitude;
    this.longitude = data.geometry.location.longitude;
}
module.exports = loction;