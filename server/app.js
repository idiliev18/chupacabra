require('dotenv').config({path: '../.env'})
const express = require('express');
const app = express();
const api = require('./routes/api.js');

app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Qsha');
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})