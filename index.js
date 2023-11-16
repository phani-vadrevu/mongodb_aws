const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static('public'))

const routes = require('./routes/routes');

app.use('/api', routes)


// --NOTE--
app.set("view engine", "ejs")


require('dotenv').config();
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// --NOTE--
app.get('/add', (req, res) => {
    res.render("form")
  })


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})