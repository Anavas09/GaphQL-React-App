const mongoose = require('mongoose');

//mongodb+srv://anavas:15463mongo@graphql-anavas-2ntlo.mongodb.net/test?retryWrites=true&w=majority

const URI = 'mongodb+srv://anavas:15463mongo@graphql-anavas-2ntlo.mongodb.net/graphql-anavas?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => {
        db.connection.db.listCollections().toArray((err, names)=>{
            console.log(names)
        })
        console.info('DB is connected')})
    .catch(err => console.error(err))

module.exports = mongoose;