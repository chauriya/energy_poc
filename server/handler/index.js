const axios = require('axios').default
const constants = require('../constant');

module.exports = {
    getLatLong: async function(req, res) {
        if(req.query.location) {
            const { data } = await axios.get(`${constants.SERVER_URL.OPEN_WEATHER_MAP}/geo/1.0/direct?q=${req.query.location}&limit=1&appid=${constants.KEYS.OWM_APP_KEY}`);
            res.json({...data[0], latitude_min: data[0].lat - 1, latitude_max: data[0].lat + 1, longitude_min: data[0].lon - 1, longitude_max: data[0].lon + 1});
        } else {
            res.status(400).json("Query parameter 'location' is required");
        }
    },

    getTemporalDaily: async function(req, res) {
        try {
            if(req.query.location) {
                const location = await axios.get(`${constants.SERVER_URL.OPEN_WEATHER_MAP}/geo/1.0/direct?q=${req.query.location}&limit=1&appid=${constants.KEYS.OWM_APP_KEY}`);
                const lat = parseFloat(location.data[0].lat);
                const lon = parseFloat(location.data[0].lon);
                const d = new Date();
                const year = req.query.year || d.getFullYear();
                const { data } = await axios.get(`${constants.SERVER_URL.NASA_POWER}/api/temporal/daily/regional?latitude-min=${lat - 1}&latitude-max=${lat + 1}&longitude-min=${lon - 1}&longitude-max=${lon + 1}&parameters=T2M&community=SB&start=${year}0101&end=${year}1231&format=JSON`);
                let approxLat = 0;
                let approxLon = 0;
                if(lat%1 > 0.50) {
                    approxLat = parseInt(lat) + 0.75;
                } else {
                    approxLat = parseInt(lat) + 0.25;
                }
                if(lon%1 > 0.50) {
                    approxLon = parseInt(lon) + 0.75;
                } else {
                    approxLon = parseInt(lon) + 0.25;
                }
                const result = data.features.filter(function (list){
                    return list.geometry.coordinates.filter(value => [approxLat, approxLon].includes(value)).length === 2;
                })
                res.json({...result[0], lat,approxLat, lon, approxLon});
                
            } else {
                res.status(400).json("Query parameter 'location' is required");
            }
        } catch (err) {
            res.status(err.response.status).json(err);
        }
    } 
} 