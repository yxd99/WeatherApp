const axios = require('axios');

class Search {
    history = []

    constructor(){
        //TODO constructor
    }

    async city( place = '' ) {
        try{
            const result = await axios.get('https://reqres.in/api/users?page=2');
            console.log(result.data);

            return [];
        }catch(error){
            return [];
        }
    }
}

module.exports = Search;