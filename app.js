const { mainInquirer, input, pause } = require('./helpers/inquirer');
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
                const place = await input('Ciudad:');
                await search.city( place );
                
                let result = `\nCiudad:`;
                result += `\nLatitud:`;
                result += `\nLongitud:`;
                result += `\nTemperatura:`;
                result += `\nMinima:`;
                result += `\nMaxima:`;

                console.log(result);

            }
        }
        await pause();
    }while(option);
}

main();