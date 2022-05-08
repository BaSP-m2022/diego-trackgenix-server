const express = require('express');
const fileSystem = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getAllProjects', (req, res) => {
  if (req.query) {
    const filter = req.query;
    const filters = Object.keys(req.query);
    const filteredProjects = projects.filter((project) => {
      let isValid = true;
      filters.forEach((key) => {
        console.log(key, project[key], filter[key]);
        isValid = isValid && project[key] === filter[key];
      });
      return isValid;
    });
    res.send(filteredProjects);
  } else {
    res.send(projects);
  }
});

router.delete('/deleteProject/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.filter((p) => p.id !== projectId);
  if (projects.length === filteredProjects.length) {
    res.send('Could not delete project, project not found');
  } else {
    fileSystem.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project deleted');
      }
    });
  }
});

module.exports = router;
