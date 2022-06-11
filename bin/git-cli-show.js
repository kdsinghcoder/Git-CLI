const program = require("commander");
const colors = require("colors");
const parseInput = require("../lib/parseInput");
const fs = require("fs");

program.parse(process.argv);
newF();
async function newF() {
  if (!fs.existsSync("./data/input.csv")) {
    console.log("Input file in not found in ./data folder".red);
    console.log("add input file too folder".blue);
    program.outputHelp();
  } else {
    let parsedData = await parseInput("./data/input.csv");
    console.table(parsedData);
  }
}
