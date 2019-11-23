`use strict`;

weatherFunctions = {};

weatherFunctions.weatherHandler = function(req, res) {
    // Query String = ?a=b&c=d
    getWeather(req.query.data)
        .then(weatherData => res.status(200).json(weatherData));

}

weatherFunctions.getWeather = function(query) {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${query.latitude},${query.longitude}`;
    console.log('url', url);
    return superagent.get(url)
        .then(data => {
            let weather = data.body;
            return weather.daily.data.map((day) => {
                return new Weather(day);
            });
        });
}

weatherFunctions.Weather = function(day) {
    this.forecast = day.summary;
    this.time = new Date(day.time * 1000).toDateString();
}

module.exports = weatherFunctions;