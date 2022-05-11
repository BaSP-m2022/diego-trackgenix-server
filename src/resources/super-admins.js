import express from 'express';
import users from '../data/super-admins.json';

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

router.put('/:id', (req, res) => {
  const userUpdateData = req.body;
  const userUpdated = users.map((user) => {
    if (user.id === req.params.id) {
      return userUpdateData;
    }
    return users;
  });
  userUpdateData.writeFile('src/data/super-admin.json', JSON.stringify(userUpdated), (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send(' User Updated');
    }
  });
});

export default router;
