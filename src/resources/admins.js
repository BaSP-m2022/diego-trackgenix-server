import express from 'express';
import fs from 'fs';
import admins from '../data/admins.json';

const router = express.Router();

router.get('/', (req, res) => {
  const objectOfFilters = req.query;
  const arrayOfFiltersKeyNames = Object.keys(req.query);
  if (arrayOfFiltersKeyNames.length > 0) {
    const filteredAdmins = admins.filter((admin) => {
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
    res.send(admins);
  }
});

router.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const admin = admins.find((a) => a.id === adminId);
  if (admin) {
    res.send(admin);
  } else {
    res.send('Admin not found');
  }
});

router.post('/', (req, res) => {
  const adminData = req.body;
  admins.push(adminData);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Admin Created');
    }
  });
});

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((admin) => admin.id !== adminId);
  if (admins.length === filteredAdmins.length) {
    res.send('Admin not found.');
  } else {
    fs.writeFile(
      'src/data/admins.json',
      JSON.stringify(filteredAdmins),
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('admin deleted');
        }
      },
    );
  }
});

router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const adminData = req.body;
  let adminFound = false;
  const adminListUpdated = admins.map((person) => {
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
