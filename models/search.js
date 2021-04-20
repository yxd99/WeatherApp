const axios = require('axios');

class Search {
    history = []

    constructor(){
        //TODO constructor
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async city( place = '' ) {
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })
            const result = await instance.get();

            console.log(result.data);

            return [];
        }catch(error){
            return [];
        }
    }
}

module.exports = Search;