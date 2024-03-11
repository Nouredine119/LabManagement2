const mongoose = require('mongoose');

const msg = new mongoose.Schema({
   
  name: {
      type: String,
      required: true
  },
 
  email: {
      type: String,
      required: true,
      
  },
  message: {
    type: String,
    required: true,
   
}

  })
const Msgs = new mongoose.model("Msg",msg);

module.exports = Msgs;