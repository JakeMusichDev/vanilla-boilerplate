require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Initialize server
const app = express();

const port = 3000;

// API Security
app.use(helmet());

// Enable cross origin resource sharing
app.use(cors());

// Log HTTP requests
app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static CSS/JS/HTML files
app.use(express.static(__dirname + '/dist'));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/src/index.html")));

app.get('/api', (req, res) => {
  let route = process.env.API_URL + "latest?access_key=" + process.env.API_KEY;

  axios.get(route)
    .then(res => res.json())
    .then(data => res.send({ data }))
    .catch(err => res.redirect('/error'))
});

// Port Attachment
app.listen(port, () => console.log(`App running on port ${port}!`));
