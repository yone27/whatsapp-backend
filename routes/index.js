const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

module.exports = () => {
    
    router.get('/messages/sync', messageController.getMessages)

    router.post('/messages/new', messageController.addMessage)

    return router
}