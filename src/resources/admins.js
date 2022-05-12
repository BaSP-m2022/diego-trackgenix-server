import express from 'express';
import fs from 'fs';
import adminsList from '../data/admins.json';

const router = express.Router();

router.get('/', (req, res) => {
  const objectOfFilters = req.query;
  const arrayOfFiltersKeyNames = Object.keys(req.query);
  if (arrayOfFiltersKeyNames.length > 0) {
    const filteredAdmins = adminsList.filter((admin) => {
      let isValid = true;
      arrayOfFiltersKeyNames.forEach((key) => {
        if (key === 'active') {
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
  let adminFound = false;
  const adminListUpdated = adminsList.map((person) => {
    if (adminId === person.id) {
      adminFound = true;
      return adminData;
    }
    return person;
  });
  if (adminFound) {
    fs.writeFile('src/data/admins.json', JSON.stringify(adminListUpdated), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('The admin list was updated');
      }
    });
  } else {
    res.send('Admin not found');
  }
});

export default router;
