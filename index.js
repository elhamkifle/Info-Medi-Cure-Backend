const express = require("express");
const cors = require('cors');

const app = express()
app.use(express.json())
const mongoose = require("mongoose")

mongoose.connect('mongodb://0.0.0.0:27017/InfoMediCure', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(cors());

const informationRouter = require('./routes/diseaseInformation')
app.use('/information', informationRouter)

const usersRouter = require('./routes/usersRoute')
app.use('/', usersRouter)

const eventsRouter = require('./routes/eventsRoute')
app.use('/events', eventsRouter) 



app.listen(3000, () => console.log('Server Started'))