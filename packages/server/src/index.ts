import path from 'node:path';
import express from 'express';
import chalk from 'chalk';
import { api as apiRouter } from './api';

const port = process.env.PORT || 3000;

const staticDir = path.join(
    process.cwd(),
    process.env.NODE_ENV === 'development' ? '../client/dist' : './client',
);

// check directory: development mode only
console.log('  - env:\t', process.env.NODE_ENV);
console.log('  - cwd:\t', process.cwd());
console.log('  - dirname:\t', __dirname);
console.log('  - static:\t', staticDir);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(staticDir));

// Client
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: staticDir });
});

// API
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(chalk.greenBright(`\n  Server listening on port ${port}\n`));
    console.log(
        chalk.whiteBright('  - Local:'),
        chalk.cyanBright(`http://localhost:${port}`),
    );
    console.log(
        chalk.whiteBright('  - Client path:'),
        chalk.blueBright(path.relative(process.cwd(), staticDir)),
    );
});
