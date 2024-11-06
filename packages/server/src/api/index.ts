import { Router } from 'express';

export const api: Router = Router();

api.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome! API is running' });
});

api.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});
