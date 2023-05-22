const express = require('express');
const route = express.Router();
const Joi = require('@hapi/joi');
const path = require('path');

const movies =
[
    {
        "id": 1,
        "name": "Infinity War"
    },
    {
        "id": 2,
        "name": "John Wick 4"
    },
    {
        "id": 3,
        "name": "Guardians of the Galaxy 3"
    },
    {
        "id": 4,
        "name": "End Game"
    },
    {
        "id": 5,
        "name": "Poop Movie"
    }
]

function validation(req, res){
    const schema = Joi.object({
        name : Joi.string().min(2).required()
    });

    const result = schema.validate(req.body);
    console.log(result);

    return result;
}

route.get('/', (req,res) => {
    res.send('Hello Everyone from nodemon');
});

route.get('/person', (req,res) => {
    res.send('This is person route');
});

route.get('/person/:name/:age', (req,res) => {
    console.log(req.params);
    
    res.send(req.query);
});

route.get('/index', (req,res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

route.get('/api/movies', (req, res) =>{
    res.send(movies);
});

route.get('/api/movies/:id', (req,res) => {
    let movie = movies.find(c => c.id == parseInt(req.params.id));
    if(!movie)
        res.send(`No movie found for the ID: ${req.params.id}`);
    else
        res.send(movie);
});

route.post('/api/movies', (req,res) =>{
    const schema = Joi.object({
        name : Joi.string().min(2).required()
    });

    let result = validation(req, res);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return result.error;
    }

    let movie = {
        id : movies.length + 1,
        name: req.body.name
    }

    movies.push(movie);
    res.send(movie);
});

route.put('/api/movies/:id', (req, res) => {
    
    //Find the movie based on ID
    let movie = movies.find(c => c.id == parseInt(req.params.id));
    //If not found throw error
    if(!movie)
        res.send(`No movie found for the ID: $(req.params.id)`);

    let result = validation(req, res);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return result.error;
    }

    //return the movie
    movie.name = req.body.name;
    res.send(movie);
});

route.delete('/api/movies/:id', (req,res) => {
    //Find the movie based on ID
    let movie = movies.find(c => c.id == parseInt(req.params.id));
    //If not found throw error
    if(!movie)
        res.send(`No movie found for the ID: $(req.params.id)`);

    const index = movies.indexOf(movie);

    //If found, remove index of that object in the array
    movies.splice(index, 1);

    res.send(movie);
});

route.use('/api/movies', (req,res, next) => {
    console.log(req.url, req.method);
    next();
});

module.exports = route;