require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const costRouter = require('./routes/cost');
const categoryRouter = require('./routes/categories');
const cors = require('cors');
const verifyToken = require('../backend/middleware/verifytoken').verifyToken;
const port = process.env.PORT || 5000;

//cors
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    })
);

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));
app.use('/users', usersRouter);
app.use('/cost', costRouter);
app.use('/categories', categoryRouter);
app.use(verifyToken);

//mongo
const uri = "mongodb+srv://mor:1515@cost-manager.jkfqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});

//port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});