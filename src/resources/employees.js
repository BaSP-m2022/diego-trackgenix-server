const express = require('express');
// const fileSystem = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();
router.get('/getAll', (req, res) => {
  employees.map();
  res.send(employees);
});

// router.get('/:deleteEmploy', (req, res) => {
//   const user = req.params.deleteEmploy;
// });
module.exports = router;
