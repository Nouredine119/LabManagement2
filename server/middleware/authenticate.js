const Users = require('../models/User');
const jwt = require('jsonwebtoken')


const authenticate = async (req, res,next) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
    
      throw {statusCode : 401, message :"Unauthorized"};
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          throw {statusCode : 401, message :"Unauthorized"};
        }
        req.user = user;
        next();
      });
    }
  } catch (err) {
    res.status(401).send(err)
    console.log(err);
  }
}

module.exports = authenticate;