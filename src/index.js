// use "import" to import libraries
// const express = require('express');
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const projects = require('./data/projects.json');
const projectsRouter = require('./resources/projects');

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
