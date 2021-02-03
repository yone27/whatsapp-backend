const express = require('express')
const cors = require('cors')
const router = require('./routes')

// Settings
const app = express()
const Pusher = require("pusher");
app.set('port', process.env.PORT || 5000)

const pusher = new Pusher({
    appId: "1149613",
    key: "2e7998c3dd19bb8eff12",
    secret: "323f5c51811520e2b3a8",
    cluster: "us2",
    useTLS: true
});

// DB Config
require('./config/db')

const mongoose = require('mongoose')


const db = mongoose.connection

db.once('open', () => {
    const messageCollection = db.collection('messages')
    const changeStream = messageCollection.watch()

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument

            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log('error triger pusher');
        }
    })

})

//Middlewares
app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', '*')
//     next()
// })
// API Routes
app.use('/api/v1', router())

// Server start :D
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})