const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const connectDB = require('./db/mongoose');
const controller = require('./controller/controller');

// connectDB();
// implement above function

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/', controller);



const port = 8081;
app.listen(process.env.PORT || 8081, () => {
  console.log(`Server started on port ${port}`);
});
