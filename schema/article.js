var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  article_name:String,
  author_name:String,
  year:[String,Number],
  field_id:Number,
  se_method:String,
  se_methodology:String,
  review:String,
  research_question:String,
  research_result:String
});
module.exports =  articleSchema;