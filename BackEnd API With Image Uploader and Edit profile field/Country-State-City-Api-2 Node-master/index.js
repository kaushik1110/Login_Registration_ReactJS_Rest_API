const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// const countryModel = require('./database/country');

mongoose.connect('mongodb://localhost:27017/CountryStateCity', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected');
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.get('/', (req, res) => {
    let resX = []
    let countries = require('./DATA/country.json');
    for (let i = 0; i < countries.length; i++) {
        resX.push(countries[i]);
        // console.log(countries[1])
    }
    res.send(resX);
});

app.post('/:country', (req, res) => {
    let state = require('./DATA/state');
    res.send(state[req.params.country]);
});

app.post('/:country/:state', (req, res)=>{
    let cities = require('./DATA/city.json');
    res.send(cities[req.params.state]);
});




app.listen(8000, () => {
    console.log('server is start');
})