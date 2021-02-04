const Messages = require('../models/Messages')

exports.addMessage = async (req, res) => {
    const message = req.body
    try {
        const data = await Messages.create(message)

        if (data) {
            res.status(201).send(`New message created: \n ${data}`)
        } else {
            res.status(500).send(err)
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
            res.status(201).send('No hay datso')
        }
    } catch (error) {
        res.status(500).send(err)
    }
}