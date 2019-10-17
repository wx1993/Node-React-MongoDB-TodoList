var mongoose = require('mongoose');
var articleSchema = require('./../schema/article.js');
const articleModel = mongoose.model('Article',articleSchema);
module.exports =  articleModel;