var spawn = require('child_process').spawn;
var spawn = require('domain').spawn;
var path = require('path');
var http = require('http');
var url = require('url');
var fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest, { flags: "wx" });

    const request = http.get(url, response => {
      if (response.statusCode === 200) {
        response.pipe(file);
      } else {
        file.close();
        fs.unlink(dest, () => { }); // Delete temp file
        reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
      }
    });

    request.on("error", err => {
      file.close();
      fs.unlink(dest, () => { }); // Delete temp file
      reject(err.message);
    });

    file.on("finish", () => {
      resolve();
    });

    file.on("error", err => {
      file.close();

      if (err.code === "EEXIST") {
        reject("File already exists");
      } else {
        fs.unlink(dest, () => { }); // Delete temp file
        reject(err.message);
      }
    });
  });
}
const args = process.argv;

function main() {
  let inputKeyIndex = args.indexOf('--input');
  let outputKeyIndex = args.indexOf('--output');
  if (inputKeyIndex >= 0 && outputKeyIndex >= 0) {
    let input = args[inputKeyIndex + 1];
    let output = args[outputKeyIndex + 1];
    if (input && output) {
      if(fs.existsSync(output))
        fs.rmdirSync(output);

      let openapiFilename = input;
      if (url.parse(input)) {
        openapiFilename = path.join(output, 'openapi.json');
        download(input, output).then(_ => processInput(openapiFilename));
      }
      else {
        if (!fs.existsSync(openapiFilename))
          throw new Error('--input filename '+openapiFilename+' doesn\'t exist');
        processInput(openapiFilename);
      }
    }
  }
}

function processInput(openapiFilename) {

}

main();
