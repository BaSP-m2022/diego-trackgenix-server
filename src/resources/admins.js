const express = require('express');

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
        isValid = (JSON.stringify(admin[key])).toLowerCase() === objectOfFilters[key].toLowerCase();
      });
      return isValid;
    });
    res.send(filteredAdmins);
  } else {
    res.send(adminsList);
  }
});

module.exports = router;
