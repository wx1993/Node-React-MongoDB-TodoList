var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 公司职员Schema
const articleSchema = new Schema({
  member_name:String,
  member_id:{
    type:Number
  },
  department_id:Number,
  work_num:[String,Number],
  department_name:String
  // article_name:String,
  // article_year:{
  //   type:Number
  // },
  // field_id:Number,
  // work_num:[String,Number],
  // author_name:String
});
module.exports =  articleSchema;