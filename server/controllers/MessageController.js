const messages = require('../models/Msg')
const messageController = async (req, res, next) => {
    try{
     const name = req.body.name;
     const email = req.body.email;
     const message = req.body.message;
     
  
     const sendMessage = new messages({
           name : name,
           email : email,
           message : message
  
     });
       const created = await sendMessage.save();
       console.log(created);
       res.status(200).send("your message was sent");
  
    }
    catch(err){
     res.status(400).send(err)
    }

}


module.exports = { messageController };