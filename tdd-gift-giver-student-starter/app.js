const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const giftExchange = require('./routes/gift-exchange.js');
const { NotFoundError } = require('./utils/errors.js');

const app = express()

app.get('/', (req, res) => {
    res.status(200).send({"ping":"pong"})
})

app.use(bodyParser.json())

app.use(morgan("tiny"))

app.use("/gift-exchange", giftExchange);

app.use((req, res, next) => {
    next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const { status, message } = error;

    const errorObject = {
        status: status || 500,
        message: message || "Something went wrong in the application"
    }

    res.status(status).send({error: 
        errorObject
    })
})

module.exports = app;
