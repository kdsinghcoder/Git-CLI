const axios = require("axios");

function versionCompare(v1, v2) {
  var vnum1 = 0,
    vnum2 = 0;

  for (var i = 0, j = 0; i < v1.length || j < v2.length; ) {
    while (i < v1.length && v1[i] != ".") {
      vnum1 = vnum1 * 10 + (v1[i] - "0");
      i++;
    }

    while (j < v2.length && v2[j] != ".") {
      vnum2 = vnum2 * 10 + (v2[j] - "0");
      j++;
    }

    if (vnum1 > vnum2) return 1;
    if (vnum2 > vnum1) return -1;

    vnum1 = vnum2 = 0;
    i++;
    j++;
  }
  return 0;
}

async function CheckVer(VerRepo, verCur) {
  if (versionCompare(VerRepo, verCur) < 0) return false;
  else return true;
}

async function getVersion(url, name) {
  try {
    if (url.charAt(url.length - 1) == "/") {
      url = url.substring(0, url.length - 1);
    }
    var urlData = url.trim().split("/");
    // console.log(urlData);
    var userName = urlData[3];
    var repo = urlData[4];

    const res = await axios.get(
      "https://api.github.com/repos/" +
        userName +
        "/" +
        repo +
        "/contents/package.json"
    );
    var nextUrl = res["data"]["download_url"];
    const res2 = await axios.get(nextUrl);
    if (res2["data"]["dependencies"][name])
      var ver = res2["data"]["dependencies"][name].substring(1);
    else var ver = "nil";
      // console.log(ver);
    return ver;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { CheckVer, getVersion };
