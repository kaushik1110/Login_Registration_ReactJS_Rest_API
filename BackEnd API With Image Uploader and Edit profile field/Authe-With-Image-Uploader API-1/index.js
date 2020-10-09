const express = require('express');

const app = express();

const mongoose = require('mongoose');

const authRoute = require('./routes/auth');

// Get Request
const getReq = require('./routes/test');

mongoose.connect('mongodb://localhost/auth', {useNewUrlParser: true, useUnifiedTopology: true}, ()=> console.log('Database connection Done'));

app.use('/images/sshhttiissddeessaaii6600112233665544', express.static(__dirname+'/public/uploads/'));

// Middleware
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,DELETE,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authentication-token");
    next();
});


app.use('/api', authRoute);
app.use('/test', getReq);

app.listen(3000, ()=> console.log('server running at 3000'));