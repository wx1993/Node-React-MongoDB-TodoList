var express = require('express');
var router = express.Router();
var Todo = require('../src/models/todo')

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'SERLER'
	});
});

// 获取全部的todo
router.get('/getAllItems', (req, res, next) => {
	Todo.find({}).sort({'date': -1}).exec((err, todoList) => {
		if (err) {
			console.log(err);
		}else {
			res.json(todoList);
		}
	})
});

// 添加todo
router.post('/addItem', (req, res, next) => {
	let newItem = req.body;
	Todo.create(newItem, (err) => {
		if (err) {
			console.log(err);
		}else {
			Todo.find({}, (err, todoList) => {
				if (err) {
					console.log(err);
				}else {
					res.json(todoList);
				}
			});
		}
	})
})


router.all('/SearchData', (req, res, next) => {

	 let beginYear = req.query.beginYear;
	 let endYear = req.query.endYear;
	 Todo.find({title : {$regex : beginYear}}).sort({'date': -1}).exec((err, todoList) => {
		if (err) {
			console.log(err);
		}else {
			res.json(todoList);
		}
	})	
})


router.get('/addFakeData', (req, res, next) => {

const newItem={

		title : 'Pinning Down Variables, and Taking an Agile Approach.',
		methods : 'ADD',
		source : 'http://eds.b.ebscohost.com.ezproxy.aut.ac.nz/eds/pdfviewer/pdfviewer?vid=12&sid=9b5bb43f-5e08-4432-a1b6-a607f840d694%40sessionmgr103',
		PublicationType : 'Academic Journals',
	    author  : 'Torres, Edwin',
	    addTime : '2019',
	    publishTime : '2019'

		};


	Todo.create(newItem, (err) => {
		if (err) {
			console.log(err);
		}else {
			Todo.find({}, (err, todoList) => {
				if (err) {
					console.log(err);
				}else {
					res.json(todoList);
				}
			});
		}
	})
})



// 删除todo
router.post('/deleteItem', (req, res, next) => {
	console.log(req.body);
	let delete_date = req.body.date
	Todo.remove({date: delete_date}, (err, result) => {
		if (err) {
			console.log(err)
		}else {
			res.json(result);
		}
	});
});

module.exports = router;
