const express = require('express');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find((p) => p.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('Project not found');
  }
});

module.exports = router;
