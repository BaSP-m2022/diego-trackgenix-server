const express = require('express');
const fileSystem = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getProjectById/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    res.send(project);
  } else {
    res.send('Project not found');
  }
});

router.post("/addProject", (req, res) => {
    const projectData = req.body;
    projects.push(projectData);
    fileSystem.writeFile("src/data/projects.json", JSON.stringify(projects), (err) => {
        if(err){
            res.send(err)
        } else {
            res.send("Project created")
        }
    })
})

module.exports = router;
