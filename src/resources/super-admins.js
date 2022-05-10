import express from 'express';
import fs from 'fs';
import users from '../data/super-admins.json'

const router = express.Router(); //crear un router con express
const PORT = process.env.PORT || 3000;

//get the list with all the superadmins
router.get ('/getAll',(req,res)=>{
    res.send(users);
});
//get one superadmin by Id
router.get('/:id', (req,res)=>{
    const superadminId = req.params.id;
    const user = users.find((users)=>{
        return users.id == superadminId;
    });
    if (user){
        res.send(user);
    }
    else {
        res.send('User not found');
    }
})
// add a member to the list of superadmins
router.post('/add', (req,res) => {
    const superadminData = req.body;
    if (superadminData.id && superadminData.first_name && superadminData.last_name && superadminData.email && superadminData.pasword && superadminData.active){
        users.push(superadminData);
        fs.writeFile('src/data/super-admins.json', JSON.stringify(users), (err)=> {
            if (err){
                res.send(err);
            }
            else {
                res.send('User created');
            }
        })
        console.log('users', users);
    } 
    else {
        console.log('All fields must be completed');
    }    
})
//delete a superadmin
router.delete('/:id', (req, res) => {
    const superadminId = req.params.id;
    const usersFiltered = users.filter((user) => {
        return user.id != superadminId;
    });
    if (users.length == usersFiltered.length){
        res.send('could not delete user because it was not found');
    }
    else {
        fs.writeFile('src/data/super-admins.json', JSON.stringify(usersFiltered), (err)=> {
            if (err){
                res.send(err);
            }
            else {
                res.send('User deleted');
            }
        })
    }
})
module.exports = router;