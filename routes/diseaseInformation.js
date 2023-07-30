const express = require("express")
const router = express.Router()

const Information = require('../models/diseaseInformation')

router.get('/', async (req, res) => {
    try{
        const information = await Information.find().exec()
        res.status(200).json(information)
    }
    catch(err){
        res.status(201)
    }
})


router.post('/', async (req,res) =>{
    const newInformation = {
        diseaseName: req.body.diseaseName,
        diseaseDescription: req.body.diseaseDescription,
        symptoms: req.body.symptoms

    }

    try{
        await Information.insertMany(newInformation)
        res.status(201).json(newInformation)
    }
    catch(err){
        res.status(204)
    }
})

router.put('/:id', async (req,res) =>{
    const id = req.params.id;
    const updatedInfo = req.body;

    try{
        infoUpdated = await Information.findByIdAndUpdate(id, updatedInfo)
        if (infoUpdated == null){
            res.status(200).json({ message: 'No information found.' });
        }

        else{
            res.status(204).json(updatedInfo)
        }
    }
    catch{
        res.status(201).json({ message: 'Something went wrong. Try again.' });
    }

})

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const deletedInfo = req.body
    try{
        infoToDelete = await Information.findByIdAndDelete(id)
        if (infoToDelete == null){
            res.status(200).json({ message: 'Information not found.' });
        }

        else{
            res.status(204).json(deletedInfo)
        }
    }

    catch{
        res.status(201).json({ message: 'Something went wrong. Try again.' });
    }

})

module.exports = router