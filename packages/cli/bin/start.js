#!/usr/bin/env node
const { exec } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, '../dist/server/index.js');

exec(`node ${serverPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error starting cloud-canvas: ${error.message}`);
        console.error(stderr);
        return;
    }
    console.log(stdout);
});
