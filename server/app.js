const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport'); 
const session = require('express-session');
const login = require('./routes/login'); 
const register = require('./routes/register'); 
const authGoogleRoute = require('./routes/authGoogle'); 
const userRoute = require('./routes/userRoute'); 
const articleRoute = require('./routes/ArticleRoute'); 
const cors = require('cors');


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the rejection or log it appropriately
});

const app = express();

app.use(cors());

// app.use(
//   session({
//     secret: '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',
//     resave: true,
//     saveUninitialized: true,
//   })
// );

dotenv.config({path : './env'});
require('./config/connexion');
const port = process.env.PORT;

// methodes for get data and cookies from frontEND
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());





// login user
app.use('/',login);
//registration 
app.use('/',register)


app.use('/',authGoogleRoute);

app.use('/', userRoute);

app.use('/', articleRoute);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});




app.listen(3001,()=>{
  console.log("server is listening");
})


