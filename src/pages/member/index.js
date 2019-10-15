import React ,{Component} from 'react';
import {Button,message,Modal} from 'antd'
import EditMember from './editMenber.js'
import Layout from './../../components/layout.js';
import {updateStaff, search} from './../../global/initBaseData.js';
import './index.css';
import ListMember from './listMember.js';
export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'list',
            tb_data:[],
            delModel:false,
            selectlist:[]
        };
        this.changeState= this.changeState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handle = this.handle.bind(this);
        this.del = this.del.bind(this);
        this.columns = [
            {
                title:'Article',
                key:'member_name',
                dataIndex:'member_name',
                width:200
            },
            {
                title:'Author',
                key:'department_name',
                dataIndex:'department_name',
                width:400
            },
            {
                title:'Year',
                key:'work_num',
                dataIndex:'work_num',
                width:200
            },
            {
                title:'Field',                
                key:'department_name',
                dataIndex:'department_name',
                width:500
                // render:(record) => {
                //     return (
                //         <div>
                //             <span className="action" onClick={() => this.handle('edit',record)}>编辑</span>
                //             <span className="action" style={{marginLeft:'10px'}} onClick={() => this.handle('del',record)}>删除</span>
                //         </div>
                //     )
                // }
            }
        ]
    }
    handle(type,data={}){
        this.rowData = data;
        if(type !== 'del'){
            this.changeState('edit');
        } else {
            this.setState({
                delModel:true
            })
        }
    }
    updateList(){
        updateStaff.bind(this)();
    }

    searchresults(){
        var dataset = {
            from: this.refs.from.value,
            to: this.refs.to.value,
            select1: this.refs.select1.value,
            select2: this.refs.select2.value,
            select3: this.refs.select3.value
        };
        alert(dataset.select1);
        search.bind(this)(dataset);
    }

    del(){
        this.$http.post('/staff/del',{
            member_id:this.rowData.member_id
        }).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success('员工删除成功');
                this.setState({
                    delModel:false
                });
                this.updateList();
            } else {
                message.error('员工删除失败');
            }
        })
    }
    changeState(status,update){
        this.setState({
            status
        });
        update && this.updateList();
    }
    handleClick(){
        if(this.refs.select1.value * 1 === 0){
            this.setState({selectlist:filterColumns1});
            filterColumns = filterColumns1
        }else{
            this.setState({selectlist:filterColumns2});
            filterColumns = filterColumns2
        }
    }
    
    render(){
        return (
            <Layout type={1}>
                <div className='m-members' >
                    {this.state.status === 'list'?<div className='m-list'>
                        <div className='g-header'>
                            <font size="3" color="green" className ='dataInput'>From</font>
                            <input type='text' placeholder='2018 ' ref='from' className ='dataInput'></input>
                            <font size="3" color="green" className ='dataInput'>To</font>
                            <input type='text' placeholder='2019 ' ref='to' className ='dataInput'></input>
                            <Button type="primary" onClick={() => this.searchresults() } className ='searchButton' >Search</Button>
                        </div>
                        <div className='g-header'>
                            <font size="3" color="blue" className ='dataInput'>Field</font>
                            <select className ='selectInput' ref = 'select1' onChange={this.handleClick}>
                                <option value = "0">SE Method</option>
                                <option value = "1">SE Methodology</option>
                            </select>
                            <font size="3" color="blue" className ='dataInput'>Operator</font>
                            <select className ='selectInput'  ref = 'select2'>
                                <option value = "0">Contains</option>
                                <option value = "1">Not Contain</option>
                                <option value = "2">begins with</option>
                                <option value = "3">ends with</option>
                                <option value = "4">is equal</option>
                            </select>
                            <font size="3" color="blue" className ='dataInput' >Value</font>
                                <select className={'selectInput'} ref = 'select3'>
                                    {filterColumns.map(index => (<option value = {index.name} >{index.name}</option>))}
                                </select>
                        </div>
                        <ListMember columns={this.columns}/>
                    </div>:null}
                    {this.state.status ==='edit'?<EditMember meberMsg={this.rowData} changeState={this.changeState}/>:null}
                    {this.state.delModel?<Modal wrapClassName='g-popup-sure' closable={false} title='删除员工' onOk={this.del} onCancel={() => this.setState({delModel:false})} visible={true}>
                        <p className="info">确定删除该员工，删除之后数据将无法恢复？</p>
                    </Modal>:null}
                </div>
            </Layout>
        )
    }


}
var filterColumns = [
    { name: "TDD"},
    { name: "BDD"},
    { name: "Pair Programming"},
    { name: "planning poker,"},
    { name: "daily standup meetings"},
    { name: "story boards"},
];


const filterColumns1 = [
    { name: "TDD"},
    { name: "BDD"},
    { name: "Pair Programming"},
    { name: "Planning poker,"},
    { name: "Daily standup meetings"},
    { name: "story boards"},
];
const filterColumns2 = [
    { name: "Scrum"},
    { name: "Agile"},
    { name: "Waterfall"},
    { name: "XP"},
    { name: "Crystal"},
    { name: "Product Driven Development"},
];
