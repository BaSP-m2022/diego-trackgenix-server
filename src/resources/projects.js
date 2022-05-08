const express = require('express');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getById/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    res.send(project);
  } else {
    res.send('Project not found');
  }
});

module.exports = router;
