require('dotenv').config();
const { mainInquirer, input, pause, listPlaces } = require('./helpers/inquirer');
const { primary } = require('./helpers/color');
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
                const placeSelected = await listPlaces( places );
                if(placeSelected == 0) {
                    break;
                };
                const infoPlace = places.find( place => place.id == placeSelected);
                const weatherPlace = await search.weatherPlace( infoPlace.latitude, infoPlace.longitude );

                let result = `\n${ primary('Ciudad: ') } ${ infoPlace.name }`;
                result += `\n${ primary('Latitud: ') } ${ infoPlace.latitude }`;
                result += `\n${ primary('Longitud: ') } ${ infoPlace.longitude }`;
                result += `\n${ primary('Clima: ') } ${ weatherPlace.description }`;
                result += `\n${ primary('Temperatura: ') } ${ weatherPlace.temperature }`;
                result += `\n${ primary('Temperatura Minima: ') } ${ weatherPlace.temperature_min }`;
                result += `\n${ primary('Temperatura Maxima: ') } ${ weatherPlace.temperature_max }`;

                console.log(result);
                break;

            }
        }
        await pause();
    }while(option);
}

main();