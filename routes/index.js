const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/MessageController')
const AuthController = require('../controllers/AuthController')
const UsersController = require('../controllers/UsersController')
const RoomController = require('../controllers/RoomController')


module.exports = () => {
    // Auth routes

    // @desc signup user
    // @access Public
    router.post("/signup", AuthController.signup);

    // @desc signin user and return JWT token
    // @access Public
    router.post("/signin", AuthController.signin);

    router.post("/test", AuthController.test);

    // Messages
    router.get('/messages/sync', MessageController.getMessages)
    router.post('/messages/new', MessageController.addMessage)

    // Rooms
    router.get('/rooms', RoomController.getRooms)

    router.post('/rooms/add', RoomController.addRoom)

    return router
}