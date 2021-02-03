const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yoneiker:yoneiker@cluster0-t41nx.mongodb.net/whatsapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log("db is connect"))
    .catch(err => console.error(err, 'aloo'))

mongoose.connection.on('error', error => {
    console.log(error);
})

// Importar los modelos
require('../models/Messages')
