// use "import" to import libraries
import express from 'express';
import projectsRouter from './resources/projects';
import projects from './data/projects.json';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/projects', projectsRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.get('/projects', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
