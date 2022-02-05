const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// Import Database
require('./db');

const app = express();

app.set('Port', 4000);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));

// Routes
app.use('/user', require('./src/routes/user.route'));
app.use('/note', require('./src/routes/note.route'));

app.listen(app.get('Port'), function () {
  console.log('listening on port: ', app.get('Port'));
});
