
let mongoose = require('mongoose');

// schema
let postSchema = mongoose.Schema({
  title:{type:String, required:[true,'Title is required!']}, // 1
  body:{type:String, required:[true,'Body is required!']},   // 1
  author:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
  createdAt:{type:Date, default:Date.now},
  updateAt:{type:Date},
});

// model & export
let Post = mongoose.model('post', postSchema);
module.exports = Post;
