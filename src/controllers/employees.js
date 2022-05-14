import express from 'express';

import fs from 'fs';
// import models from '../models';
import employees from '../data/employees.json';

const router = express.Router();

router.get('/', (req, res) => {
  const objectOfFilters = req.query;
  const arrayOfFiltersKeyNames = Object.keys(req.query);
  if (arrayOfFiltersKeyNames.length > 0) {
    const filteredEmploy = employees.filter((employ) => {
      let isValid = true;
      arrayOfFiltersKeyNames.forEach((key) => {
        if (key === 'active') {
          isValid = JSON.stringify(employ[key]).toLocaleLowerCase
            === objectOfFilters[key].toLocaleLowerCase;
        } else {
          isValid = employ[key] === objectOfFilters[key];
        }
      });
      return isValid;
    });
    res.send(filteredEmploy);
  } else {
    res.send(employees);
  }
});

router.get('/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find((p) => p.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('Employee not found');
  }
});

router.post('/', (req, res) => {
  const employeeData = req.body;
  employees.push(employeeData);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('New Employee Created');
    }
  });
});

router.put('/:id', (req, res) => {
  const employeeUpdateData = req.body;
  let employeeNotFound = false;
  const employeeUpdated = employees.map((p) => {
    if (p.id === req.params.id) {
      employeeNotFound = true;
      return employeeUpdateData;
      // eslint-disable-next-line no-else-return
    } else {
      return p;
    }
  });
  if (employeeNotFound) {
    fs.writeFile(
      'src/data/employees.json',
      JSON.stringify(employeeUpdated),
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Employee Updated Succesfully');
        }
      },
    );
  } else {
    res.send('Employee Not Found');
  }
});

router.delete('/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmployee = employees.filter((e) => e.id !== employeeId);
  if (employees.length === filteredEmployee.length) {
    res.send('Employee not found.');
  } else {
    fs.writeFile(
      'src/data/employees.json',
      JSON.stringify(filteredEmployee),
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Employee deleted');
        }
      },
    );
  }
});

export default router;
