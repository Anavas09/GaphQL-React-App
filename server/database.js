const mongoose = require('mongoose');

//mongodb+srv://anavas:<password>@graphql-anavas-2ntlo.mongodb.net/test?retryWrites=true&w=majority

const URI = 'mongodb+srv://anavas:15463mongo@graphql-anavas-2ntlo.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.info('DB is connected'))
    .catch(err => console.error(err))

module.exports = mongoose;