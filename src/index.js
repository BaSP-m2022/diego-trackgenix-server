// use "import" to import libraries
import express from 'express';
import adminsRouter from './resources/admins';
// use "require" to import JSON files
import adminsList from './data/admins.json';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/admins', adminsRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: adminsList,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
