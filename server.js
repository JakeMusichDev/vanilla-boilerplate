const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/src/index.html")));

app.get('/api', (req, res) => res.send("You have hit the API!"));


app.use(express.static(__dirname + '/dist'));

app.listen(port, () => console.log(`App running on port ${port}!`));