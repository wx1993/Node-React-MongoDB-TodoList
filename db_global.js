var helper = require('./helper');

before(function(done){

helper.connect(function(){done();});       
});

after(function(done) {

helper.close(function(){done();});       
});

beforeEach(function(done){

helper.initdb(function(){done();});       
});