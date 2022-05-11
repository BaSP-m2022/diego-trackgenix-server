import express from 'express';

import fs from 'fs';
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
          isValid = (JSON.stringify(employ[key])).toLocaleLowerCase
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

router.delete('/:id', (req, res) => {
  const employeeId = req.params.id;
  const filteredEmployee = employees.filter((e) => e.id !== employeeId);
  if (employees.length === filteredEmployee.length) {
    res.send('Employee not found.');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployee), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Employee deleted');
      }
    });
  }
});

// router.get('/:deleteEmploy', (req, res) => {
//   const user = req.params.deleteEmploy;
// });
export default router;
