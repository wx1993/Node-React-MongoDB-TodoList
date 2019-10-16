var mongoose = require('mongoose');
var articleSchema = require('./../schema/staff.js');
const articleModel = mongoose.model('Article',articleSchema);
module.exports =  articleModel;