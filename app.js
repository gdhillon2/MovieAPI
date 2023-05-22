const express = require('express');
const app = express();
const movies = require('./movies');

app.use(express.json());

app.use('/abc', movies);

const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Listening to port: ${port}`));