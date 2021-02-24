#!/usr/bin/env node
import chalk from 'chalk';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileAsync.js';
import prompt from './prompt.js';
import commands from './commands.js';

const args = process.argv;
const adapter = new FileSync('db.json');
const db = await lowdb(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [], hobbies: [], }).write();

// usage represents the help guide
const usage = function () {
  const usageText = `
  todo helps you manage you todo tasks.

  usage:
    todo <command>

    commands can be:

    hobby:    list all of your girl friend hobbies 
              or add a new one
    kiss:     kiss you
    help:     used to print the usage guide
  `;
  console.log(usageText);
}

// used to log errors to the console in red color
function errorLog(error) {
  const eLog = chalk.red(error);
  console.log(eLog);
}

// show all of your girl's hobbies
function showHobbies() {
  const hobbies = db.get('hobbies').value();
  let index = 1;
  hobbies.forEach(hobby => {
    const todoText = `${index++}. ${hobby}`
    console.log(todoText);
  });
}

// add a new hobby
function newHobbies() {
  showHobbies();
  const q = chalk.blue(`Type in your girl friend's hobby (or enter to quit): `);
  prompt(q).then(hobby => {
    if (hobby) {
      db.get('hobbies')
        .push(hobby)
        .write();
    }
    console.log(chalk.green('Ok!'));
  });
}

function kissMe() {
  console.log(chalk.blue('I hate when other girls checking on you'));
}

// we make sure the length of the arguments is exactly three
if (args.length > 3) {
  errorLog(`only one argument can be accepted`);
  usage();
}

//...
switch (args[2]) {
  case commands.help:
    usage();
    break
  case commands.hobby:
    newHobbies();
    break;
  case commands.kiss:
    kissMe();
    break;
  default:
    errorLog('invalid command passed');
    usage();
}