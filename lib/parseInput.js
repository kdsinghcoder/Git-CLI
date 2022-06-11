var fs = require('fs');
const Papa = require('papaparse');
module.exports = async (inputFileName) =>{
    const file = fs.createReadStream(inputFileName);
    return new Promise(resolve => {
        Papa.parse(file, {
          header: true,
          complete: results => {
            resolve(results.data);
          }
        });
    });
};