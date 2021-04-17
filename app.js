const { mainInquirer, input, pause } = require('./helpers/inquirer');

const main = async() => {
    let option;
    do{
        console.clear();
        option = await mainInquirer();
        switch(option){
            case 0:{
                console.log('Gracias por usar el sistema.');
                break;
            }
        }
        await pause();
    }while(option);
}

main();