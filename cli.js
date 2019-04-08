#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openapi_json_schema_extractor_1 = require("./openapi-json-schema-extractor");
const args = process.argv;
async function main() {
    let inputKeyIndex = args.indexOf('--input');
    let outputKeyIndex = args.indexOf('--output');
    if (inputKeyIndex >= 0 && outputKeyIndex >= 0) {
        let openapiUrlOrFilename = args[inputKeyIndex + 1];
        let outputDirectory = args[outputKeyIndex + 1];
        openapi_json_schema_extractor_1.downloadAndExtractJsonSchemas(openapiUrlOrFilename, outputDirectory);
    }
}
exports.main = main;
main().catch(r => console.error(r));
//# sourceMappingURL=cli.js.map