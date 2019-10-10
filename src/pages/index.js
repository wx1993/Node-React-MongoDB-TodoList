import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import TodoList from './comps/todo-list'

class Todo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			showTooltip: false  // 控制 tooltip 的显示隐藏
		}
	}
	
	componentDidMount () {
		// 获取所有的 todolist
		this._getTodoList();
  	}
	
	// 获取 todolist
	_getTodoList () {
		const that = this;
  		$.ajax({
  			url: '/getAllItems',
  			type: 'get',
  			dataType: 'json',
  			success: data => {
  				console.log(data);
				// const todoList = that.todoSort(data)
				that.setState({ 
					todoList: data
				});
  			},
  			error: err => {
				console.log(err);
			}
  		});
	}
	
	// 添加 todo
	_onNewItem (newItem) {
		const that = this;
		$.ajax({
			url: '/addItem',
			type: 'post',
			dataType: 'json',
			data: newItem,
			success: data => {
				console.log(data);
				const todoList = that.todoSort(data);
				that.setState({ 
					todoList 
				});
			},
			error: err => {
				console.log(err);
			}
		})
	}


	// 删除 todo
	_onDeleteItem (date) {
		const that = this;
		const postData = { 
			date: date 
		};
		$.ajax({
			url: '/deleteItem',
			type: 'post',
			dataType: 'json',
			data: postData,
			success: data => {
				console.log(data);
				this._getTodoList();
			},
			error: err => {
				console.log(err);
			}
		})
	}
	
	// 对 todolist 进行逆向排序（使新录入的项目显示在列表上面） 
	todoSort (todoList) {
		todoList.reverse();
		return todoList;
	}

	// 提交表单操作
	handleSubmit(event){

		event.preventDefault();
		// 表单输入为空验证
		if(this.refs.content.value == "") {
			this.refs.content.focus();
			this.setState({
				showTooltip: true
			});
			return ;
		}

		let month = new Date().getMonth() + 1;
		let date = new Date().getDate();
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let seconds = new Date().getSeconds();

		if (hours < 10) { hours += '0'; }
		if (minutes < 10) { minutes += '0'; }
		if (seconds < 10) { seconds += '0'; }

		// 生成参数
		const newItem={
			content: this.refs.content.value,
			date: month + "/" + date + " " + hours + ":" + minutes + ":" + seconds
		};

		console.log(newItem);
		// 添加 todo
		this._onNewItem(newItem)
		// 重置表单
		this.refs.todoForm.reset();
		// 隐藏提示信息
		this.setState({
			showTooltip: false,
		});
	}

  	render() {
	  	return (
	  		<div className="container">
				<h2 className="header">Todo List</h2>
				<form className="todoForm" ref="todoForm" onSubmit={ this.handleSubmit.bind(this) }>
					<input ref="content" type="text" placeholder="Type content here..." className="todoContent" />
					{ this.state.showTooltip &&
						<span className="tooltip">Content is required !</span>
					}
				</form>
				<TodoList todoList={this.state.todoList} onDeleteItem={this._onDeleteItem.bind(this)} />
	  		</div>
  		)
  	}
}

export default Todo;
