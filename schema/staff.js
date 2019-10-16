var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  // member_name:String,
  // member_id:{
  //   type:Number
  // },
  // department_id:Number,
  // work_num:[String,Number],
  // department_name:String
  article_name:String,
  author_name:String,
  year:[String,Number],
  field_id:Number,
  se_method:String,
  research_question:String,
  research_result:String
});
module.exports =  articleSchema;