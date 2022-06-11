const program = require("commander");
const colors = require("colors");
const { CheckVer, getVersion } = require("../lib/lib");
const { Update_pull } = require("../lib/Update_pull");
const parseInput = require("../lib/parseInput");
const { Validate } = require("../lib/Validate");


program.parse(process.argv);
newF();
async function newF() {

  var veli = Validate(process.argv);
  var update = false;

  if (!veli) {
    program.outputHelp();
  }
  else {
    if (process.argv[4] == "update") {
      update = true;
    }
    //read input file i.e input.csv

    const csvPath = "./data/" + process.argv[2];
    let parsedData = await parseInput(csvPath);
    // console.log(parsedData);
    var split = process.argv[3].split("@");
    // console.log(split);
    var count = 0;
    parsedData.forEach(async function (item) {
      var ver = await getVersion(item["repo"], split[0]);
      if (ver) {
        count++;
      }
      item["version"] = ver;
      if (count == parsedData.length) {
        //check for versio_satisfaction
        count = 0;
        // console.table(parsedData);
        parsedData.forEach(async function (item) {
          var ver_s = await CheckVer(item["version"], split[1]);
          if (ver_s == true || ver_s == false) {
            count++;
            // console.log(ver_s);
          }
          item["version_satisfied"] = ver_s;
          if (count == parsedData.length) {
            if (update == false) {
              callback();
            } else {
              count = 0;
              //handle Update Query
              parsedData.forEach(async function (item) {
                if (item["version_satisfied"] == false) {
                  var update = await Update_pull(item["repo"], split[0], split[1]);
                } else {
                  var update = " ";
                }
                if (update) {
                  count++;
                }
                item["update_pr"] = update;
                if (count == parsedData.length) {
                  console.table(parsedData);
                }
              });

            }
          }
        });
      }
    });
    function callback() {
      console.table(parsedData);
    }
  }
}
