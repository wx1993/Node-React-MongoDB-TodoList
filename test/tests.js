//let {checkSex, getParameterByName} = require('../tests.js')
let expect = require('chai').expect;
require('should');
var mongoose = require('mongoose');
var helper = require('./../helper');
var articleModel = require('./../model/staff.js');

before(function(done){

helper.connect(function(){done();});       
});

after(function(done) {

helper.close(function(){done();});       
});


describe('add article', function(){


it('article can be finded', function(done){      
    // const article = new articleModel({       
    //       article_name:'1',
		  // author_name:'2',
		  // year:[2000,2019],
		  // field_id:1,
		  // se_method:'TDD',
		  // research_question:'3',
		  // research_result:'4'  
    // });       
    // article.save();

 			articleModel.find({article_name:'RM 60 version'}).exec((err, datas) => {
    //articleModel.find({article_name:'1'}, function(err, datas){      
        	//datas.toArray(function(err,docs) {       
            datas.should.have.lengthOf(1);       
            var u = datas[0];       
            u._id.should.not.be.null;       
             u.article_name.should.equal('RM 60 version');       
             //u.author_name.should.equal('2');       
             //u.se_method.should.equal('TDD');       
            // u.research_question.should.equal('3'); 
            // u.research_result.should.equal('4');      
            done();       
        //});       
    });       
});       
});

