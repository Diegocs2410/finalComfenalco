const bcrypt = require('bcrypt');
const { messageGeneral } = require('./Messages');
const auth = {}; //Object Created to not expand the exports

auth.encryptPassword = function (password) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    messageGeneral(res, 500, '', error.message);
  }
};

module.exports = auth;
