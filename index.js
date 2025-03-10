// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';

// TODO: Create an array of questions for user input
const questions = [
    'What is the title of your project?',
    'Enter a description of your project:',
    // 'Enter instructions for how to install your project:',
    // 'Enter instructions for how to use your project:',
    // 'Enter guidelines for contributing to the project:',
    // 'Enter instructions for testing your project:'
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, 'utf8');
}

// TODO: Create a function to initialize app
async function init() {

    // Iterate through all the questions presented in questions
    let projectData = '';

    for (let i = 0; i < questions.length; i++) {
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: questions[i],
                name: 'text'
            },
        ]);

        switch(i) {
            case 0:
                // Add project title
                projectData = projectData + '#' + response.text + '\n\n';
                break;
            
            case 1: 
                // Add project Description
                projectData = projectData + '#Project Description \n' + response.text + '\n';
                break;
        }
    }

    console.log(projectData);
    

    writeToFile('README.md', projectData);
}

// Function call to initialize app
init();
