const bcryptjs = require('bcryptjs');
const Users = require('../models/User');


const updateUser = async (req, res, next) => {
  if(req.user._id !==req.params.userId) {
    return res.json({statusCode: 403 , message:'You are not allowed to update this user'}) ;
  }
  if(req.body.password){
    req.body.password = bcryptjs.hashSync(req.body.password,10);
  }

  try {
    const updateUser = await Users.findByIdAndUpdate(req.params.userId, {
      $set: {
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        email: req.body.email,
        password: req.body.password,
        photoProfile: req.body.photoProfile,
        affiliation: req.body.affiliation,
      },
    }, { new: true });
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    throw { statusCode: 401, message: err.message }
  }
}

const deleteUser = async (req, res, next) => {

  try {
    if (!req.user.isAdmin && req.user._id !== req.params.userId) {
     return res.status(200).json('You are not allowed to delete this user')
    }
    await Users.findByIdAndDelete(req.params.userId);
    res.status(200).json('user has been deleted')
  } catch (err) {
    throw { statusCode: 401, message: err.message }
  }
}

const logout = (req, res) => {
  try{
    res.clearCookie('jwt').status(200).json('User has been logged out');
  }catch(err){
   res.json(error);
  }
}

const getUsers = async (req, res) => {
  if(!req.user.isAdmin){
    return res.status(403).json('You are not allowed to see all users');

  }
  try {
    const startIndex =parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc'? 1:-1;
    const users = await Users.find()
    .sort({createdAt:sortDirection})
    .skip(startIndex)
    .limit(limit);

    const usersWithoutPassword = users.map((user)=>{
      const {password, ...rest} = user._doc;
      return rest;
    })

    const totalUsers = await Users.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(), 
      now.getMonth() -1,
      now.getDate()
    );
    const lastMonthUsers = await Users.countDocuments({
      createdAt : {$gte : oneMonthAgo},
    });
    res.status(200).json({
      users : usersWithoutPassword,
      totalUsers ,
      lastMonthUsers,
    });

    

  } catch (error) {
    return res.status(403).json(error);
  }
}



module.exports = { updateUser, deleteUser ,logout , getUsers};