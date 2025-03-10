// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
import { text } from 'stream/consumers';

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
    let textString = '';

    for (let i = 0; i < data.length; i++) {
        textString += data[i]
        if (i < data.length - 1) {
            textString += '\n\n';
        }
    }
    fs.writeFileSync(fileName, textString, 'utf8');
}

// TODO: Create a function to initialize app
async function init() {

    // This is an array, where each element contains the complete text for a given section
    const projectSections = [];

    // We are going to lay out the sections like so:
    // Title
    // License
    // Table of Contents
    // ...

    // Note that we won't necessarily be prompting the user for this information in this order, so pay attention!

    for (let i = 0; i < questions.length; i++) {
        let sectionText = '';

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
                sectionText = '# ' + response.text;
                break;
            
            case 1: 
                // Add project Description
                sectionText = '## Project Description \n' + response.text;
                break;
            
            case 2: 
                // Add installation instructions
                sectionText = '## Installation Instructions \n' + response.text;
                break;

            case 3:
                // Add Project usage info
                sectionText = '## Usage \n' + response.text;
                break;
            
            case 4: 
                // Add Project usage info
                sectionText = '## Contribution Guidelines \n' + response.text;
                break;

            case 5:
                // Testing instructions
                sectionText = '## Testing Instructions \n' + response.text;
                break;
        }

        projectSections.push(sectionText);
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

    let sectionText = '## License \n';
    sectionText += 'This project is licensed using ' + response.text;
    projectSections.splice(1,0,sectionText);

    // Now, let's prompt the user for their Github username and an email they can be contacted at
    const userInfo = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is your Github username?',
            name: 'username'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email'
        }
    ]);

    sectionText = '## Questions \n';
    sectionText += 'This repository was created by ' + userInfo.username + '\n';
    sectionText += 'They can be contacted at ' + userInfo.email;
    projectSections.push(sectionText);

    // When all of our information is present, we are going to conclude by adding a section for table of contents
    sectionText = '## Table of Contents \n\n';
    sectionText += '- [License](#license)\n';
    sectionText += '- [Project Description](#Project-Description)\n';
    sectionText += '- [Installation](#Installation-Instructions)\n'
    sectionText += '- [Usage](#usage)\n';
    sectionText += '- [Contribution Guidelines](#contribution-guidelines)\n';
    sectionText += '- [Testing Instructions](#testing-instructions)\n';
    sectionText += '- [Questions](#questions)';
    projectSections.splice(1,0,sectionText);

    console.log(projectSections);
    writeToFile('README.md', projectSections);
}

// Function call to initialize app
init();
