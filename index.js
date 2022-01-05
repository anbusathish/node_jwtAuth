// const app = refpp');
const express = require('express');
require('dotenv').config();
const userRoute = require('./routes/user');
require('./config/database').connect;

const app = express();
app.use(express.json());


app.use('/user', userRoute);

const {API_PORT} = process.env;
const port = process.env.PORT || API_PORT;
app.get('/', (req, res)=>{
    res.send(`Server running on Port: ${port}`);
})

//server listening
app.listen(port, ()=>{
    console.log(`Server running on Port: mongodb://localhost:27017/${port}`);
})








