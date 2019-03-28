import path from 'path';
import fs from 'fs';
import execa from 'execa';
//import rimraf from 'rimraf';
import { promisify } from 'util';
import test from 'ava';

const readdir = promisify(fs.readdir);

test('Output directory is created', async t => {
    const inputFile = path.join(__dirname, 'test', 'swagger - file - 1.json');
    const outputDir = path.join(__dirname, 'test', 'test-result-1');
    const stdout = await execa.stdout(path.join(__dirname, 'cli.js'), ['--input', inputFile, '--output', outputDir]);
    t.true(fs.existsSync(outputDir));
    console.log('123');
    console.log(stdout);
    let readdirResult = await readdir(outputDir);
    t.true(readdirResult.length>0);
    //rimraf.sync(path.join(__dirname, 'download-cli-master.zip'));
});