#!/usr/bin/env node

const { program } = require("commander");
const pkg = require("../package.json");
const colors = require("colors");
const str =`
           /$$   /$$                    /$$ /$$
          |__/  | $$                   | $$|__/
  /$$$$$$  /$$ /$$$$$$         /$$$$$$$| $$ /$$
 /$$__  $$| $$|_  $$_//$$$$$$ /$$_____/| $$| $$
| $$  \ $$| $$  | $$ |______/| $$      | $$| $$
| $$  | $$| $$  | $$ /$$     | $$      | $$| $$
|  $$$$$$$| $$  |  $$$$/     |  $$$$$$$| $$| $$
 \____  $$|__/   \___/        \_______/|__/|__/
 /$$  \ $$                                     
|  $$$$$$/                                     
 \______/                                      
`;

program
  .version(pkg.version)
  // .option('-ak, --apikey <apikey>','Add api key if you want to access private repos as well')
  .command("input <file_name> <package> [update]", "input command example git-cli i input.csv axios@0.23.0 \n \t" +"add <update> to the cmd if you want to Create pull request for all repos whish are using an older version of package".blue)
  .command('show','view input.csv data')
  .description(str.green)
  .parse(process.argv);

