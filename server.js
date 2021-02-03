const express = require('express')
const router = require('./routes')

// Settings
const app = express()
app.set('port', process.env.PORT || 5000)

//Middlewares
app.use(express.json())

// DB Config
require('./config/db')

// API Routes
app.use('/api/v1', router())

// Server start :D
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})