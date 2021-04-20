const axios = require('axios');

class Search {
    history = []

    constructor(){
        //TODO constructor
    }

    get paramsMapBox(){
        return {
            'access_token': 'pk.eyJ1IjoieXhkOTkiLCJhIjoiY2tucGM3ZXRyMWVtYTJ3bzU1Z3dwZmhzNyJ9.iRaiBOX79qFCytBmj-7lmA',
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