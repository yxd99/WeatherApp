require('dotenv').config();
const { mainInquirer, input, pause, listPlaces } = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async() => {
    const search = new Search();
    let option;
    do{
        console.clear();
        option = await mainInquirer();
        switch(option){
            case 0:{
                console.log('Gracias por usar el sistema.');
                break;
            }

            case 1:{
                const wordSearch = await input('Ciudad:');
                const places = await search.city( wordSearch );
                const placeSelected = await listPlaces(places);
                if(placeSelected == 0) {
                    break;
                };
                const infoPlace = places.find( place => place.id == placeSelected);
                let result = `\nCiudad: ${ infoPlace.name }`;
                result += `\nLatitud: ${ infoPlace.latitude }`;
                result += `\nLongitud: ${ infoPlace.longitude }`;
                result += `\nTemperatura:`;
                result += `\nMinima:`;
                result += `\nMaxima:`;

                console.log(result);
                break;

            }
        }
        await pause();
    }while(option);
}

main();