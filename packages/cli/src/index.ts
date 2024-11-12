// 현재 사용하지는 않지만 기존 npm 배포 기획에 사용될 수 있어서 남겨둠

import chalk from 'chalk';

const serverPath =
    process.env.NODE_ENV === 'development'
        ? '../dist/server/index.js'
        : './server/index.js';

async function main() {
    console.log(chalk.blueBright('  Starting Cloud Canvas server...'));
    await import(serverPath);
    const open = await import('open');
    await open.default('http://localhost:3000');
}

main();
