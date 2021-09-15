var express = require('express');
var path = require('path');
require('./database/db');
let cors = require('cors');
var usersRouter = require('./routes/users');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use(cors());

app.listen(5000, () => {
  console.log('Connected to port ' + 5000)
})


