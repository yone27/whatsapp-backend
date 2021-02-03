const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true); // para quitar un warnings

mongoose.set('useFindAndModify', false); // Quitamos los warnings de findOneAndUpdate / delete
mongoose.connect('mongodb://localhost/whatsapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log("db is connect"))
    .catch(err => console.error(err,'aloo'))

mongoose.connection.on('error', error => {
    console.log(error);
})

// Importar los modelos
require('../models/Messages')
