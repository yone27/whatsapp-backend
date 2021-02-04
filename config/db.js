const mongoose = require('mongoose')
const keys = require("./keys");

mongoose.connect(keys.mongoURI, {
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
require('../models/Users')
require('../models/Messages')
require('../models/Rooms')
