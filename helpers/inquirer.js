require('colors');
const inquirer = require('inquirer');

const primary = (text) => text.cyan;

console.clear();

const mainInquirer = async() => {
    const choices = [{
        value: 1,
        name: `${ primary('1.') } Buscar ciudad`
    },{
        value: 2,
        name: `${ primary('2.') } Historial`
    },{
        value: 0,
        name: `${ primary('3.') } Salir`
    }];

    const question = {
        type: 'list',
        name: 'option',
        message: 'Seleccione una opción',
        choices
    }

    const { option } = await inquirer.prompt(question);

    return option;
}

const input = async( message ) => {
    const question = {
        type: 'input',
        name: 'inputInquirer',
        message
    };
    
    const { inputInquirer } = await inquirer.prompt(question);
    
    return inputInquirer;
}

const checkbox = async( choices, message ) => {
    const question = {
        type: 'checkbox',
        name: 'checkboxInquirer',
        choices,
        message
    }

    const { checkboxInquirer } = await inquirer.prompt(question);

    return checkboxInquirer;
}

const list = async( choices, message ) => {
    const question = {
        type: 'list',
        name: 'checkboxInquirer',
        choices,
        message
    }

    const { checkboxInquirer } = await inquirer.prompt(question);

    return checkboxInquirer;
}

const pause = async() => {
    const question = [
        {
            type: "input",
            name: "confirm",
            message: `\nPresione ${'ENTER'.green} para continuar.\n`
        }
    ];

    const { confirm } = await inquirer.prompt(question);

    return confirm;
}


module.exports = {
    mainInquirer,
    input,
    checkbox,
    list,
    pause
}