// use "import" to import libraries
import express from 'express';

import Router from './routes';

const app = express();

app.use(express.json());
app.use(Router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
