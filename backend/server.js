const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')
const userRoutes = require('./controller/userRoutes.js')
const eventRoutes = require('./controller/eventRoutes.js')


dotenv.config()
const connectDB = require('./config/db.js')
const { notFound, errorHandler } = require('./middlewear/errorhandler.js');



const app = express()
app.use(cors());
app.use(express.json())
connectDB()

app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes)


app.use(notFound)
app.use(errorHandler)

app.listen(process.env.BPORT || 5000, () => { console.log("Backend Started at port", process.env.BPORT) })


