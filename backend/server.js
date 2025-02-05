require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express();

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
// app.get('/', (req, res) => {
//     res.json({mssg: 'welcome to this page'})
// })

app.use('/api/workouts', workoutRoutes) // requiring api path workouts

// listen for requests 
app.listen(process.env.PORT, () => {
    console.log(`listening on port 4000`)
})









