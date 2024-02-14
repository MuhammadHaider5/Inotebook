const mongoose = require('mongoose');
const {Schema} = mongoose;
// const UsersSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// });
const UsersSchema = new Schema({
   name:{
    type: String,
    required: true
   },
   email:{
    type: String,
    required: true,
    unique: true
   },
   password:{
    type: String,
    required: true
   },
   date:{
    type: Date,
    default: Date.now
   },
  });
  const Users=mongoose.model('users', UsersSchema);
  module.exports= Users;