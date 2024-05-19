import express from 'express';
import sleepRouter from './routes/sleep.route.js';

const app = express();

//using express middleware for parsing JSON-encoded bodies of incoming requests
app.use(express.json());


//route declaration
app.use('/api/sleep', sleepRouter);

export default app;
