const xmlConverter = require("xml-js");
const fs = require("fs");

const FILE_NAME = "Onisep_Ideo_Fiches_Formations_14032022";
const xml = require("fs").readFileSync(`./in/${FILE_NAME}.xml`, "utf8");

const options = { ignoreComment: true, /* alwaysChildren: true, */ compact: true, spaces: 4 };
const jsonResult = xmlConverter.xml2json(xml, options);

fs.writeFile(`./out/${FILE_NAME}.json`, jsonResult, "utf8", function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});
