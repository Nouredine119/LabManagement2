const express = require('express');
const {create,getarticles,deletearticle,updatearticle} = require('../controllers/ArticleController'); 
const authenticate = require('../middleware/authenticate'); 


const router = express.Router();

router.post('/create', authenticate,create);
router.get('/getarticles',getarticles);
router.delete('/deletearticle/:articleId/:userId',authenticate,deletearticle);
router.put('/updatearticle/:articleId/:userId',authenticate,updatearticle);



module.exports = router;