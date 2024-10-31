#!/usr/bin/env node
import chalk from 'chalk';

const serverPath =
    process.env.NODE_ENV === 'development'
        ? '../dist/server/index.js'
        : './server/index.js';

async function main() {
    console.log(chalk.blueBright('  Starting Cloud Canvas server...'));
    import(serverPath);
}

main();
