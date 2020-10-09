const express = require('express');

const app = express();

const mongoose = require('mongoose');

const authRoute = require('./routes/auth');

// Get Request
const getReq = require('./routes/test');

mongoose.connect('mongodb://localhost/auth', {useNewUrlParser: true, useUnifiedTopology: true}, ()=> console.log('Database connection Done'));

// Middleware
app.use(express.json());

app.use('/api', authRoute);
app.use('/test', getReq);

app.listen(3000, ()=> console.log('server running at 3000'));