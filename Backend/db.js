const mongoose = require('mongoose');
const URI = 'mongodb://localhost/psl';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
};
mongoose
  .connect(URI, options)
  .then((db) => console.log('Database conected', db.connection.name))
  .catch((error) => console.log(error));

module.exports = mongoose;
