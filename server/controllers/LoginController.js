const Users = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Login = async (req, res, next) => {
  try {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      throw { statusCode: 400, message: 'Please fill all the fields' };
    }
    const user = await Users.findOne({ email: email });
    if (user) {

      const isMatch = await bcryptjs.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ _id: user._id ,isAdmin:user.isAdmin}, process.env.SECRET_KEY, { expiresIn: '24h' });
        user.tokens.push({ token });
        await user.save();
        res.cookie('jwt', token);

        const { password: pass, ...rest } = user._doc;

        res.json(rest);
      } else {
        throw { statusCode: 400, message: 'Invalide password' };
      }
    } else {
      throw { statusCode: 400, message: 'User not found' };
    }

  }
  catch (err) {
    next(err);
  }
}

module.exports = { Login };