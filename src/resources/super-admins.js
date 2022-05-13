import express from 'express';
import users from '../data/super-admins.json';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query) {
    const filter = req.query;
    const filters = Object.keys(req.query);
    const usersFiltered = users.filter((user) => {
      let isValid = true;
      filters.forEach((key) => {
        isValid = isValid && user[key] === filter[key];
      });
      return isValid;
    });
    res.send(usersFiltered);
  } else {
    res.send(users);
  }
});

router.get('/:id', (req, res) => {
    const superadminId = req.params.id;
    const user = users.find((u) => u.id === superadminId);
    if (user) {
      res.send(user);
    } else {
      res.send('User not found');
    }
  });

  router.post('/add', (req, res) => {
    const superadminData = req.body;
    if (superadminData.id && superadminData.first_name && superadminData.last_name
      && superadminData.email && superadminData.pasword && superadminData.active) {
      users.push(superadminData);
      fs.writeFile('src/data/super-admins.json', JSON.stringify(users), (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('User created');
        }
      });
    } else {
      res.send('All fields must be completed');
    }
  });

router.put('/:id', (req, res) => {
  const userUpdateData = req.body;
  const userUpdated = users.map((user) => {
    if (user.id === req.params.id) {
      return userUpdateData;
    }
    return users;
  });
  fs.writeFile('src/data/super-admin.json', JSON.stringify(userUpdated), (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send(' User Updated');
    }
  });
});

router.delete('/:id', (req, res) => {
  const superadminId = req.params.id;
  const usersFiltered = users.filter((user) => user.id !== superadminId);
  if (users.length === usersFiltered.length) {
    res.send('could not delete user because it was not found');
  } else {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(usersFiltered), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('User deleted');
      }
    });
  }
});

export default router;
