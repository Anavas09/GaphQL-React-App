const express = require('express');
const graphqlHTTP = require('express-graphql');
const morgan = require('morgan')
const cors = require('cors')
const { mongoose } = require('./database');

const schema = require('./schema/schema')

const app = express();

//Set port number
app.set('port', process.env.PORT || 4000);

//Allow cross-origin requests
app.use(cors());

//See http request on the console
app.use(morgan('dev'));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(app.get('port'), ()=>{
    console.log(`Server listening on port: ${app.get('port')}`)
})