const Users = require('../models/User');

const Register = async (req,res)=>{
  try{
   const firstname = req.body.Firstname;
   const lastname = req.body.Lastname;
   const birthday = req.body.birthday;
   const email = req.body.email;
   const affiliation = req.body.affiliation;
   const typeUser = req.body.typeUser;
   const password = req.body.password;
   

   const validemail = await Users.findOne({email:email});

   if(validemail){
    throw {statusCode : 400 , message :'Email already used'};
   }
   else{

   const createUser = new Users({
         Firstname : firstname,
         Lastname : lastname,
         birthday : birthday,
         email : email,
         affiliation : affiliation,
         typeUser : typeUser,
         password : password

   });
     const created = await createUser.save();
     console.log(created);
     res.status(200).json("success");
    }
  }
  catch(err){
   res.status(400).send(err)
  }
};

module.exports = {Register};