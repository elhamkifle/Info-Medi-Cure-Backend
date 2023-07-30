const express = require("express")
const router = express.Router()

const Events = require('../models/events')

router.get('/', async (req, res) => {
    try{
        const event = await Events.find().exec()
        res.status(200).json(event)
    }
    catch(err){
        res.status(500)
    }
})


router.post('/', async (req, res) => {
    const { name, description, date, time } = req.body;
    const newEvent = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time

    }   

    try{
        const existingEvent = await Events.findOne({ name }).exec();
        if (existingEvent) {
            // Event with the same name already exists
            res.status(204).json({ message: 'Name is already in use' });
        } 
        else {
            await Events.insertMany(newEvent);
            const event = await Events.findOne({ name, description, date, time }).exec();
            res.status(201).json(event);
    }
}
    catch(err){
        res.status(400)
    }
})

router.put('/:id', async (req,res) =>{
    const { name, description, date, time } = req.body;
    const id = req.params.id;
    const updatedEvent = req.body;

    try{
        eventUpdated = await Events.findByIdAndUpdate(id, updatedEvent)
        if (eventUpdated == null){
            res.status(404).json({ message: 'No event found.' });
        }

        else{
            const event = await Events.findOne({ name, description, date, time }).exec();
            res.status(201).json(event);
        }
    }
    catch (err) {
        console.log(err);
        res.status(300).json({ message: 'Something went wrong. Try again.' });
    }

})

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const deletedEvent = req.body
    try{
        eventToDelete = await Events.findByIdAndDelete(id)
        if (eventToDelete == null){
            res.status(404).json({ message: 'Event not found.' });
        }

        else{
            res.status(204).json(deletedEvent)
        }
    }

    catch{
        res.status(500).json({ message: 'Something went wrong. Try again.' });
    }

})

module.exports = router