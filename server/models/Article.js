const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId:{
    type: String,
    required: true,
  },
   title:{
    type: String,
    required: true,
    unique: true,
   },
   image:{
    type: String,
    default:'https://imgs.search.brave.com/PkyXKPBtr146qwpwKm5thxJEVkvFOAgGx32_k5Cb6lI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YmxvZ3R5cmFudC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDMvZnJlZS1p/bWFnZXMtZm9yLWJs/b2cucG5n'
   },
   content:{
    type:String,
    required:true,
   },
   slug:{
    type:String,
    required:true,
    unique:true,
   }
    
},{timestamps:true});

const Article = mongoose.model('ARTICLE', userSchema);
module.exports = Article;
