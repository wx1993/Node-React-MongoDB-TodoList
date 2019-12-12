var mongoose = require('mongoose');

exports.DB = 'mongodb://heroku_bqszzqcw:d1fcgvmgq3astipgea67pquhm3@ds263927.mlab.com:63927/heroku_bqszzqcw';

exports.connect = function(callback) {

mongoose.connect(exports.DB, callback);       
};

exports.close = function(callback) {

mongoose.connection.close(callback);       
};

exports.getConnection = function() {

return mongoose.connection;       
};

exports.initdb = function(callback) {

var conn = mongoose.connection;
// insert users      
conn.collection('users').insert([{       
    email: 'nowind_lee@qq.com',       
    name: 'Freewind',       
    salt: '111',       
    password: '123456'       
}], function(err, docs) {       
    // insert others       
});  
     
};
