const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, '0.0.0.0', () => {
        console.log('listening to port:', PORT)
    })
}

server()


//Give npm i and start on both frontend and backend

//When you are working for first time, many a time it return 500, so to resolve this, under network access, i created 0.0.0.0 server telling from anywhere. So delete it and create it again and run the app.It will come