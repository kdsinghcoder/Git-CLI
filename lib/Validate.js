const fs = require("fs");
function Validate(data){
    if (!data[2]) {
        console.log("File Name is required".red);
        return false;
      } else if (!data[3]) {
        console.log("enter Package ex - axios@0.23.0".red);
        return false;
      } else if (!fs.existsSync("./data/" + data[2])) {
        console.log("Input file in not found in ./data folder".red);
        console.log("add input file too folder".blue);
        return false;
      } else if (data[4] && data[4] != "update") {
        console.log("only update cmd is possible additionally".red);
        return false;
      } 

      return true;
}

module.exports = { Validate};
