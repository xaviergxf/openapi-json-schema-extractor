#!/usr/bin/env node
'use strict';

const path = require('path');
const http = require('http');
const request = require('request');
const url = require('url');
const fs = require('fs');

const args = process.argv;

async function main() {
    let inputKeyIndex = args.indexOf('--input');
    let outputKeyIndex = args.indexOf('--output');
    if (inputKeyIndex >= 0 && outputKeyIndex >= 0) {
        let input = args[inputKeyIndex + 1];
        let output = args[outputKeyIndex + 1];
        if (input && output) {
            if (await fs.exists(output))
                await fs.rmdir(output);
            await fs.mkdir(output);

            let openapiFilename = input;
            if (url.parse(input)) {
                openapiFilename = path.join(output, 'openapi.json');
                request(input).pipe(fs.createWriteStream(openapiFilename));
            }
            else {
                if (!fs.existsSync(openapiFilename))
                    throw new Error('--input filename ' + openapiFilename + ' doesn\'t exist');
                await processInput(openapiFilename);
            }
        }
    }
}

async function processInput(openapiFilename, outputDirectory) {
    console.log('Processing openapi file');
    const stdout = await execa.stdout('openapi-generator', ['generate', '-i', openapiFilename, '-g', 'typescript-angular', '-o', outputDirectory, '-additional-properties', 'ngVersion=7.0.0']);
    console.log('stdout openapi-generator: ' + stdout);
}

main();
