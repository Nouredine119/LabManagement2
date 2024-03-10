const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = new mongoose.Schema({
  Firstname: {
    type: String,
    default: null
},
Lastname: {
    type: String,
    default: null
},
birthday: {
    type: Date,
    default: null
},
email: {
    type: String,
    required: true,
    unique: true
},
affiliation: {
    type: String,
    default: null
},
typeUser: {
    type: String,
    enum: ['admin', 'guest', 'chercheur'],
    default: null
},
password: {
    type: String,
    default: null
},
googleId: {
  type: String,
  default: null
},
photoProfile: {
  type: String,
  default: 'https://imgs.search.brave.com/PhW-ohlK_7foJn0MuAm-0_JYYX0DtjcnFXF5VkOCMrk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8x/MC8wNS8yMi8zNy9i/bGFuay1wcm9maWxl/LXBpY3R1cmUtOTcz/NDYwXzEyODAucG5n'
},
isAdmin : {
  type : Boolean,
  default : false,
},
tokens : [
    {
      token : {
        type: String,
        required: true
      }
    }
],

},{ timestamps: true })

//hashing password for security
user.pre('save',async function (next) {
  if(this.isModified('password')){
    this.password = bcryptjs.hashSync(this.password,10);
  }
  next();
})


const Users = new mongoose.model("USER",user);

module.exports = Users;