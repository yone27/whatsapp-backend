const Rooms = require('../models/Rooms')
const Users = require('../models/Users')

// Recibe un arreglo con los ids de los usuarios
exports.addRoom = async (req, res) => {
    try {
        // Buscamos el id del phone que envio
        const user = await Users.findOne({ phone: { $regex: '.*' + req.body.phone + '.*' } });
        const data = {
            members: [user._id],
            name: req.body.name,
            creatorId: req.body.creatorId
        }

        // Creamos room
        const room = await Rooms.create(data)

        if (room) {
            // buscar y modoficar user agregandole nueva room
            res.status(201).send(`Room creado satisfactoriamente`)
        } else {
            res.status(500).send('No se pudo crear la room')
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find()
            .populate('members')
            .populate('messages')
            console.log(rooms)
        if (rooms) {
            res.status(201).json(rooms)
        } else {
            res.status(500).send('No hay rooms')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}