// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';

// TODO: Create an array of questions for user input
const questions = [
    'What is the title of your project?',
    'Enter a description of your project:',
    'Enter instructions for how to install your project:',
    'Enter instructions for how to use your project:',
    'Enter guidelines for contributing to the project:',
    'Enter instructions for testing your project:'
];

const licenses = [
    'GNU General Public License v3.0',
    'MIT',
    'Creative Commons Attribution 4.0'
]

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
                projectData = projectData + '# ' + response.text + '\n\n';
                break;
            
            case 1: 
                // Add project Description
                projectData = projectData + '# Project Description \n' + response.text + '\n\n';
                break;
            
            case 2: 
                // Add installation instructions
                projectData = projectData + '# Installation Instructions \n' + response.text + '\n\n';
                break;

            case 3:
                // Add Project usage info
                projectData = projectData + '# Usage \n' + response.text + '\n\n';
                break;
            
            case 4: 
                // Add Project usage info
                projectData = projectData + '# Contribution Guidelines \n' + response.text + '\n\n';
                break;

            case 5:
                // Testing instructions
                projectData = projectData + '# Testing Instructions \n' + response.text + '\n\n';
                break;


        }
    }

    // Next, let's have the user choose a license for the project
    const response = await inquirer.prompt([
        {
            type: 'list',
            message: 'What license are you using for this project?',
            choices: licenses,
            name: 'text'
        }
    ])

    projectData += '# License \n';
    projectData += 'This project is licensed using ' + response.text + '\n\n';

    console.log(projectData);
    

    writeToFile('README.md', projectData);
}

// Function call to initialize app
init();
