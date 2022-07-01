import express from 'express';
import cors from 'cors';
import Router from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
