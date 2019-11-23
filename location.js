`use strict`;

const locationFunctions = {};
const superagent = require('superagent');

locationFunctions.locationHandler = function (req, res) {
    getLocation(req.query.data)
        .then(locationData => res.status(200).json(locationData));
}


getLocation = function(city) {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`
    console.log('url', url);

    return superagent.get(url)
        .then(data => {
            return new Location(city, data.body);
        })

}

Location = function(city, data) {
    this.search_query = city;
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;

}

module.exports = locationFunctions;