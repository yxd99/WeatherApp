const axios = require('axios');

class Search {
    history = []

    constructor(){
        //TODO: constructor
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': process.env.LANGUAGE_API,
            'limit': 5
        }
    }

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': process.env.LANGUAGE_API,
            'units': 'metric'
        }
    }

    async city( place = '' ) {
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })
            const result = await instance.get();

            return result.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                longitude: place.center[0],
                latitude: place.center[1]
            }));
        }catch(error){
            return [];
        }
    }

    async weatherPlace( latitude, longitude ){
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { 
                    ...this.paramsOpenWeather,
                    'lat': latitude,
                    'lon': longitude
                }
            });

            const result = await instance.get();
            const { weather, main } = result.data;

            return {
                'description': weather[0].description,
                'temperature': main.temp,
                'temperature_min': main.temp_min,
                'temperature_max': main.temp_max
            }

        }catch( error ){
            throw error;
        }

    }
}

module.exports = Search;