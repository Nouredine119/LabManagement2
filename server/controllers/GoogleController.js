const Users = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Google = async (req, res, next) =>{
  const { name,email,googlePhotoUrl} = req.body;
  try{
    const user = await Users.findOne({ email: email});
    if(user){
      const token = jwt.sign({_id : user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY );
      user.tokens.push({ token });
      await user.save();
      const {password ,...rest} = user._doc;
      res.status(200).cookie('jwt',token,{
        httpOnly: true,
      }).json(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const HashPassword = bcryptjs.hashSync(generatedPassword,10);
      const newUser = new Users({
        Firstname : name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
        email ,
        photoProfile:googlePhotoUrl,
        password: HashPassword,
      })
      
      const token = jwt.sign({_id : newUser._id,isAdmin:newUser.isAdmin},process.env.SECRET_KEY  );
      newUser.tokens.push({ token });
      await newUser.save();
      const {password ,...rest} = newUser._doc;
      res.status(200).cookie('jwt',token,{
        httpOnly: true,
      }).json(rest);
    }

  }catch(err){
    console.log(err);
  }
}

module.exports = { Google };