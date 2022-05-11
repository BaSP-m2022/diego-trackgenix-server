import express from 'express';
import fileSystem from 'fs';
import projects from '../data/projects.json';

const router = express.Router();

router.get('/', (req, res) => {
  const filters = req.query;
  const filter = Object.keys(req.query);
  if (filter.length > 0) {
    const filteredProjects = projects.filter((p) => {
      let isValid = true;
      filter.forEach((key) => {
        if (key === 'active' || key === 'qaRate' || key === 'devRate' || key === 'pmRate' || key === 'tlRate') {
          isValid = (JSON.stringify(p[key])).toLowerCase() === filters[key].toLowerCase();
        } else {
          isValid = p[key] === filters[key];
        }
      });
      return isValid;
    });
    res.send(filteredProjects);
  } else {
    res.send(projects);
  }
});

router.delete('/:id', (req, res) => {
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

export default router;
