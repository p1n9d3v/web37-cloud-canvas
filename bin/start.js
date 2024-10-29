#!/usr/bin/env node
const { exec } = require("child_process");
const path = require("path");

const serverPath = path.join(__dirname, "../packages/server/dist/index.js"); // 번들된 서버 파일 경로

exec(`node ${serverPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting cloud-canvas: ${error.message}`);
    console.error(stderr);
    return;
  }
  console.log(stdout);
});
