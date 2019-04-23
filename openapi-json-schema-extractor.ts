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
    let jsonSchemas = modelMetadataGenerator.extractOpenApi2Schemas(openapiJson.definitions);
    const jsonSchemasCount = Object.keys(jsonSchemas).length;
    if(jsonSchemasCount >0)
    {
        if (fs.existsSync(outputDirectory))
            await del(outputDirectory);
        await fsAsyncMkdir(outputDirectory, { recursive: true });

        let modelMetadataEnumFileText:string = 'export interface ModelMetadatas {\n';
        let modelMetadataEnumFilename = path.join(outputDirectory, 'models-metadata.ts');
        let indexFileText:string = '';
        let indexFilename = path.join(outputDirectory, 'index.ts');
        await Promise.all(Object.keys(jsonSchemas).map(async (jsonSchemaName: string, jsonSchemaIndex:number) => {
            let outputSchemaFilename = path.join(outputDirectory, jsonSchemaName + 'ModelMetadata.ts');
            const fileData = `import {OpenAPI} from '@xaviergxf/openapi-json-schema-extractor';

    export const ${jsonSchemaName}ModelMetadata: OpenAPI.SchemaObject = ${JSON.stringify(jsonSchemas[jsonSchemaName], null, "\t")};`;
            await fsAsyncWritefile(outputSchemaFilename, fileData);

            indexFileText = indexFileText+`export * from './${jsonSchemaName}ModelMetadata';\n\r`;

            modelMetadataEnumFileText += `${jsonSchemaName}:any;\n`;
        }));
        modelMetadataEnumFileText+='}';
        indexFileText = indexFileText+`export * from './models-metadata';\n\r`;

        await fsAsyncWritefile(modelMetadataEnumFilename, modelMetadataEnumFileText);
        await fsAsyncWritefile(indexFilename, indexFileText);
    }
}