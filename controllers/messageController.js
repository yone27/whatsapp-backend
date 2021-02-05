const Messages = require('../models/Messages')
const Rooms = require('../models/Rooms')

// Recibe datos del mensaje y room para hacer respectivos updates
exports.addMessage = async (req, res) => {
    // DATOS DEL MENSAJE
    const messageData = {
        message: req.body.message,
        timestamp: req.body.timestamp,
        author: req.body.author,
    }
    // DATOS DEL ROOM
    const roomData = {
        id: req.body.roomId
    }

    try {

        // Agregando mensaje
        const message = await Messages.create(messageData)

        if (message) {
            // buscar y modoficar room agregandole nuevo mensaje
            const room = await Rooms.findById(roomData.id)

            if (room) {
                room.messages.push(message)
                const upadteRoom = await room.save();

                if (upadteRoom) {
                    res.status(201).send(`Mensaje creado satisfactoriamente: \n ${message}`)
                }
            };
        } else {
            res.status(500).send('No se pudo guardar el mensaje')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getMessages = async (req, res) => {
    try {
        const data = await Messages.find()
        if (data) {
            res.status(201).send(data)
        } else {
            res.status(201).send('No hay data')
        }
    } catch (error) {
        res.status(500).send(err)
    }
}