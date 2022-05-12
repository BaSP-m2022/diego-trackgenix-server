import express from 'express';
import fs from 'fs';
import admins from '../data/admins.json';

const router = express.Router();

router.get('/', (req, res) => {
  const allAdmins = admins;
  res.send(allAdmins);
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

export default router;
