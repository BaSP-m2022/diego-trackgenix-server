const express = require('express');

const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

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
  const employeeData = req.params.body;
  employees.map(employeeData);
  fs.appendFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Employee Updated');
    }
  });
});

module.exports = router;
