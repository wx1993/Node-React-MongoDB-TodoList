//let {checkSex, getParameterByName} = require('../tests.js')
let expect = require('chai').expect;
require('should');
var mongoose = require('mongoose');
var helper = require('./../helper');
var articleModel = require('./../model/article.js');

before(function(done){

helper.connect(function(){done();});       
});

after(function(done) {

helper.close(function(){done();});       
});


describe('about articles', function(){


it('article can be finded', function(done){      
  
 			articleModel.find({article_name:'RM 60 version'}).exec((err, datas) => {
            datas.should.have.lengthOf(1);       
            var u = datas[0];       
            u._id.should.not.be.null;       
             u.article_name.should.equal('RM 60 version');        
            done();       
    });       
});

it('article can be saved', function(done){

			const article = new articleModel({       
		        article_name:'test1',
				author_name:'2',
				year:[2000,2019],
				field_id:1,
				se_method:'TDD',
				research_question:'3',
				research_result:'4'  
			});       
			article.save(function (results) {
	          results.should.equal('')
	        }); 
            done();              
});


it('article can be updated', function(done){

	articleModel.findOneAndUpdate({article_name:'test1'},{
			article_name:'testnew1',
			author_name:'2',
			year:[2000,2019],
			field_id:1,
			se_method:'TDD',
			research_question:'3',
			research_result:'4' 
		},{new:false},function (err, result) {
			 err.should.equal('');
		})
        done();              
});


it('article can be delete', function(done){

	articleModel.remove({
    	article_name:'testnew1',
		},function (err) {
		err.should.equal('');

	});
    done();              
});



});

