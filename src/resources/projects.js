import express from 'express';
import fileSystem from 'fs';
import projects from '../data/projects.json';

const router = express.Router();

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    res.send(project);
  } else {
    res.send('Project not found');
  }
});

router.post('/', (req, res) => {
  const projectData = req.body;
  projects.push(projectData);
  fileSystem.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project created');
    }
  });
});

router.put('/:id', (req, res) => {
  const projectUpdatedData = req.body;
  let projectFound = false;
  const projectsUpdated = projects.map((p) => {
    if (p.id === req.params.id) {
      projectFound = true;
      return projectUpdatedData;
    }
    return p;
  });
  if (projectFound) {
    fileSystem.writeFile('src/data/projects.json', JSON.stringify(projectsUpdated), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project updated');
      }
    });
  } else {
    res.send('Project not found');
  }
});

router.put('/addEmployee/:id', (req, res) => {
  const employeeData = req.body;
  let projectFound = false;
  const projectUpdated = projects.map((p) => {
    if (p.id === req.params.id) {
      projectFound = true;
      return {
        ...p,
        [employeeData.role]:
            [...p[employeeData.role], {
              name: employeeData.name,
              id: employeeData.id,
            }],
      };
    }
    return p;
  });
  if (projectFound) {
    fileSystem.writeFile('src/data/projects.json', JSON.stringify(projectUpdated), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project updated');
      }
    });
  } else {
    res.send('Project not found');
  }
});

export default router;
