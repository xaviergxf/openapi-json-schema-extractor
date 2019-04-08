#!/usr/bin/env node

import { downloadAndExtractJsonSchemas } from './openapi-json-schema-extractor';

const args = process.argv;

export async function main() {
    let inputKeyIndex = args.indexOf('--input');
    let outputKeyIndex = args.indexOf('--output');
    if (inputKeyIndex >= 0 && outputKeyIndex >= 0) {
        let openapiUrlOrFilename = args[inputKeyIndex + 1];
        let outputDirectory = args[outputKeyIndex + 1];
        downloadAndExtractJsonSchemas(openapiUrlOrFilename, outputDirectory);
    }
}


main().catch(r=>console.error(r));
