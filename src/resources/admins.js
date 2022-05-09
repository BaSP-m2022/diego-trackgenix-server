const express = require('express');
const fs = require('fs');

const router = express.Router();
const adminsList = require('../data/admins.json');

router.get('/', (req, res) => {
  const objectOfFilters = req.query;
  const arrayOfFiltersKeyNames = Object.getOwnPropertyNames(req.query);
  const arrayOfFiltersValue = Object.keys(req.query);
  if (arrayOfFiltersKeyNames.length > 0) {
    const filteredAdmins = adminsList.filter((admin) => {
      let isValid = true;
      arrayOfFiltersValue.forEach((key) => {
        if (req.query.active) {
          isValid = (JSON.stringify(admin[key])).toLowerCase()
                        === objectOfFilters[key].toLowerCase();
        } else {
          isValid = admin[key] === objectOfFilters[key];
        }
      });
      return isValid;
    });
    res.send(filteredAdmins);
  } else {
    res.send(adminsList);
  }
});

router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const adminData = req.body;
  const adminRequired = adminsList.find((admin) => adminId === admin.id);
  if (adminRequired) {
    adminRequired.first_name = adminData.first_name;
    adminRequired.last_name = adminData.last_name;
    adminRequired.email = adminData.email;
    adminRequired.gender = adminData.gender;
    adminRequired.active = adminData.active;
    fs.writeFile('src/data/admins.json', JSON.stringify(adminsList), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('The admin list was updated');
      }
    });
  } else {
    res.send('The id of the admin is invalid');
  }
});

module.exports = router;
