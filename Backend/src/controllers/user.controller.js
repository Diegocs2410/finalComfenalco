const userCtrl = {};
const userModel = require('../models/user.model');
const auth = require('../helpers/Auth.helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { messageGeneral } = require('../helpers/Messages');

// userCtrl.listAllUsers = async (req, res) => {
//   try {
//     const users = await userModel.find({}, { password: 0 });
//     if (!users) {
//       res.status(404).json({ message: 'Users not found', ok: false });
//     }
//     res.json({ ok: true, users });
//   } catch (error) {
//     res.status(500).json({ message: error.message, ok: false });
//   }
// };
userCtrl.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    //verify if user alerady exists with email delivered
    if (user) {
      return res.status(409).json({ message: 'User already exists', ok: false });
    }
    // if user does not exist, create a new one
    const newUser = new userModel({
      name,
      email,
      password: auth.encryptPassword(password),
    });

    await newUser.save();
    res.status(200).json({
      message: 'User created successfully, Welcome',
      ok: true,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: jwt.sign({ _id: newUser._id, name: newUser.name }, 'shhh', { expiresIn: '30d' }),
    }); // user
  } catch (error) {
    messageGeneral(res, 500, false, '', error.message);
    // res.status(500).json({ message: error.message, ok: false });
  }
};
userCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }); // Check user mail for login
    if (!user) {
      return res.status(400).json({ message: 'email/password incorrect', ok: false });
    }
    const resp = bcrypt.compareSync(password, user.password);
    if (resp) {
      return res.status(200).json({
        message: 'Welcome Sr: ' + user.name,
        ok: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ _id: user._id, name: user.name }, 'shhh', { expiresIn: '30d' }),
      });
    }
    res.status(400).json({
      ok: false,
      message: 'email/password incorrect',
    });
  } catch (error) {
  }
};
module.exports = userCtrl;
