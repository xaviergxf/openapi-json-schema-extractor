import "jasmine";
import * as path from 'path';
import * as fs from 'fs';
import * as execa from 'execa';
import { downloadAndExtractJsonSchemas, extractJsonSchemas } from '../openapi-json-schema-extractor';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

describe('Output directory is created?', () => {
    const inputFile = path.join(__dirname, 'swagger-file-1.json');
    var originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    });

    it('Output directory is created', async (done) => {
        const outputDir = path.join(__dirname, 'results', 'output_directory_is_created');
        await downloadAndExtractJsonSchemas(inputFile, outputDir);

        expect(fs.existsSync(outputDir)).toBeTruthy();
        let readdirResult = await readdir(outputDir);
        expect(readdirResult.length > 0).toBeTruthy();
        done();
    });

    it('Can export model metadata', async (done) => {
        const outputDir = path.join(__dirname, 'results', 'can_export_model_metadata');
        await extractJsonSchemas(inputFile, outputDir);
        expect(fs.existsSync(outputDir)).toBeTruthy();
        let readdirResult = await readdir(outputDir);
        expect(readdirResult.length > 0).toBeTruthy();

        done();
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});