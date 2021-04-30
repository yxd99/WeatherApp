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
                search.addHistory( { ...infoPlace } );
                const info = await search.showInfo({ ...infoPlace });
                console.log( info );
                break;

            }

            case 2: {
                const history = search.history;
                const placeSelected = await listPlaces( history );
                if( placeSelected == 0 ){
                    break;
                }
                const infoPlace = history.find( place => place.id == placeSelected );
                const info = await search.showInfo({ ...infoPlace });
                console.log( info );
                break;
            }
        }
        await pause();
    }while(option);
}

main();