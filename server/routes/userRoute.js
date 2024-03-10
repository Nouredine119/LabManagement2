const express = require('express');
const {updateUser,deleteUser,logout,getUsers} = require('../controllers/UserController.js'); 
const authenticate = require('../middleware/authenticate.js'); 


const router = express.Router();


router.put('/update/:userId', authenticate,updateUser);
router.delete('/delete/:userId', authenticate,deleteUser);
router.post('/logout',logout);
router.get('/getusers',authenticate,getUsers);



module.exports = router;