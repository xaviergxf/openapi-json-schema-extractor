import * as path from 'path';
import * as request from 'request';
import * as url from 'url';
import * as fs from 'fs';
import * as del from 'del';
import * as modelMetadataGenerator from './model-metadata-generator';

const { promisify } = require("util");

const fsAsyncReadfile = promisify(fs.readFile);
const fsAsyncWritefile = promisify(fs.writeFile);
const fsAsyncMkdir = promisify(fs.mkdir);

export async function extractJsonSchemas(openapiFilename: string, outputDirectory: string) {
    const fileContent: string = await fsAsyncReadfile(openapiFilename, 'utf8');
    let openapiJson = JSON.parse(fileContent);
    if (fs.existsSync(outputDirectory))
        await del(outputDirectory);
    await fsAsyncMkdir(outputDirectory, { recursive: true });


    let jsonSchemas = modelMetadataGenerator.extractOpenApi2Schemas(openapiJson.definitions);
    Object.keys(jsonSchemas).forEach((jsonSchemaName: string) => {
        let outputSchemaFilename = path.join(outputDirectory, jsonSchemaName + '.ts');
        const fileData = `export const ${jsonSchemaName} = ${JSON.stringify(jsonSchemas[jsonSchemaName], null, "\t")};`;
        fsAsyncWritefile(outputSchemaFilename, fileData);
    });
}

export async function downloadAndExtractJsonSchemas(openapiUrlOrFilename: string, outputDirectory: string) {
    if (fs.existsSync(outputDirectory))
        await del(outputDirectory);
    await fsAsyncMkdir(outputDirectory, { recursive: true });

    let openapiFilename = openapiUrlOrFilename;
    let urlParseResult = url.parse(openapiUrlOrFilename);
    if (urlParseResult && urlParseResult.hostname) {
        openapiFilename = path.join(outputDirectory, 'openapi.json');
        request(openapiUrlOrFilename).on('error', function (err) {
            console.log('Error when downloading openapi: ' + err);
        }).pipe(fs.createWriteStream(openapiFilename));
    }
    else {
        if (!fs.existsSync(openapiFilename))
            throw new Error('--input filename ' + openapiFilename + ' doesn\'t exist');
    }
    const modelMetadataOutputDirectory = path.join(outputDirectory, 'model-metadata');
    await fsAsyncMkdir(modelMetadataOutputDirectory, { recursive: true });

    await this.extractJsonSchemas(openapiFilename, modelMetadataOutputDirectory);
}