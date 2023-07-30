const express = require("express")
const router = express.Router()

const Users = require('../models/users')

router.get('/', async (req, res) => {
    try{
        const allUsers = await Users.find().exec()
        res.status(200).json(allUsers);
    }
    catch(err){
        res.status(500)
    }
})

//Log a user in
router.post('/login/', async (req, res) => {
    try {
      const { name, password} = req.body;
      const user = await Users.findOne({ name, password }).exec();
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(204).json({ message: 'User not found.' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Could not load user. Try again.' });
    }
  });
  


//Create User
router.post('/', async (req,res) =>{
    const { name, password, role } = req.body;
    const newUser = {
        name: req.body.name,
        password: req.body.password,
        role: req.body.role

    }

    try{
        // Check if a user with the same name already exists
        const existingUser = await Users.findOne({ name }).exec();
        if (existingUser) {
            // User with the same name already exists
            res.status(202).json({ message: 'Name is already in use' });
        } 
        else {
            await Users.insertMany(newUser);
            const user = await Users.findOne({ name, password }).exec();
            res.status(201).json(user)
    }}
    catch(err){
        res.status(203)
    }
})

router.patch('/:id', async (req,res) =>{
    const id = req.params.id;
    const updatedUser = req.body;

    try{
        userUpdated = await Users.findByIdAndUpdate(id, updatedUser)
        if (userUpdated == null){
            res.status(203).json({ message: 'No user found.' });
        }

        else{
            res.status(204).json(updatedUser)
        }
    }
    catch{
        res.status(300).json({ message: 'Something went wrong. Try again.' });
    }

})

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const deletedUser = req.body
    try{
        userToDelete = await Users.findByIdAndDelete(id)
        if (userToDelete == null){
            res.status(300).json({ message: 'User not Found. Check your Information.' });
        }

        else{
            res.status(204).json(deletedUser)
        }
    }

    catch{
        res.status(500).json({ message: 'Something went wrong. Try again.' });
    }

})

module.exports = router