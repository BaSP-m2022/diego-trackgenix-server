import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const MONGO_URL = 'mongodb+srv://BaSP-2022:ZZXZy7c0QaLlWbYR@basp-database.tp3ys.mongodb.net/BaSP-database?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Fail to connect', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
