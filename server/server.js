'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/map', (req, res) => {
    res.send('MAP DATA')
});

app.get('/api/county/:county', (req, res) => {
    // database stuff
    const county = req.params.county
    res.send('COUNTY TIMELINE')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);