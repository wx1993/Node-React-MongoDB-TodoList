import React ,{Component} from 'react';
import {Button,message,Modal} from 'antd'
import EditMember from './addArticle.js'
import Layout from './../../components/layout.js';
import {updateStaff, search} from './../../global/initBaseData.js';
import './index.css';
import ListMember from './listArticle.js';
export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'list',
            tb_data:[],
            delModel:false,
            from:2018,
            to:2019,
            selectlist:[]
        };
        this.changeState= this.changeState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handle = this.handle.bind(this);
        this.del = this.del.bind(this);
        this.quickSearch = this.quickSearch.bind(this);
        this.columns = [
            {
                title:'Title',
                key:'article_name',
                dataIndex:'article_name',
                width:100
            },
            {
                title:'Author',
                key:'author_name',
                dataIndex:'author_name',
                width:100
            },
            {
                title:'Year',
                key:'year',
                dataIndex:'year',
                width:200
            },
            {
                title:'Se method',
                key:'se_method',
                dataIndex:'se_method',
                width:200
            },
            {
                title:'research question',
                key:'research_question',
                dataIndex:'research_question',
                width:200
            },
            {
                title:'research result',
                key:'research_result',
                dataIndex:'research_result',
                width:200
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
        if(!this.state.from)
        {
            this.setState({
                from:0
            });
        }
        if(!this.state.to)
        {
            this.setState({
                to:0
            });
        }
        var dataset = {
            from: this.state.from,
            to: this.state.to,
            select1: this.refs.select1.value,
            select2: this.refs.select2.value,
            select3: this.refs.select3.value,
            sort : this.refs.selectSort.value
        };
        // alert(dataset.select3);
        search.bind(this)(dataset);
    }

    quickSearch(){
        if(this.refs.selectYears.value * 1 === 0)
        {
            this.setState({
                from:2018,
                to:2019
            });
        }else if(this.refs.selectYears.value * 1 === 1)
        {
            this.setState({
                from:2014,
                to:2019
            });
        }else if(this.refs.selectYears.value * 1 === 3)
        {
            this.setState({
                from:0,
                to:2019
            });
        }else{
            this.setState({
                from:2009,
                to:2019
            });
        }
    }

    del(){
        this.$http.post('/search/del',{
            member_id:this.rowData.member_id
        }).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success('del success');
                this.setState({
                    delModel:false
                });
                this.updateList();
            } else {
                message.error('del error');
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
        if(this.refs.select1.value * 1 === 1){
            this.setState({selectlist:filterColumns1});
            filterColumns = filterColumns1
        }else if(this.refs.select1.value * 1 === 2){
            this.setState({selectlist:filterColumns2});
            filterColumns = filterColumns2
        }
    }
    
    changeVal(filed,val,type='text'){
        if(type === 'num'){
            val = val.replace(/[^\d]/g,'');
        }
        this.setState({
            [filed]:val
        });
    }
    
    render(){
        return (
            <Layout type={1}>
                <div className='m-members' >
                    {this.state.status === 'list'?<div className='m-list'>
                        <div className='g-header'>
                            <font size="3" color="green" className ='dataInput'>From</font>
                            <input className='dataInput' value={this.state.from} onChange={(event) => this.changeVal('from',event.target.value,'num')}/>
                            <font size="3" color="green" className ='dataInput'>To</font>
                            <input className='dataInput' value={this.state.to} onChange={(event) => this.changeVal('to',event.target.value,'num')}/>
                            <font size="3" color="blue" className ='dataInput'>OR</font>
                            <select className ='selectInput' ref = 'selectYears' onChange={this.quickSearch}>    
                                <option value = "0">Last year</option>
                                <option value = "1">Last five years</option>
                                <option value = "2">Last ten years</option>
                                <option value = "3">All years</option>
                            </select>
                            <Button type="primary" onClick={() => this.searchresults() } className ='searchButton' >Search</Button>
                            <Button type="primary" onClick={() => this.handle('add') } className ='searchButton' >ADD</Button>
                        </div>
                        <div className='g-header'>
                            <font size="3" color="blue" className ='dataInput'>Field</font>
                            <select className ='selectInput' ref = 'select1' onChange={this.handleClick}>    
                                <option value = "0">Select a flied</option>
                                <option value = "1">SE Method</option>
                                <option value = "2">SE Methodology</option>
                            </select>
                            <font size="3" color="blue" className ='dataInput'>Operator</font>
                            <select className ='selectInput'  ref = 'select2'>
                                <option value = "0">Contains</option>
                                <option value = "1">Not Contain</option>
                                <option value = "2">Begins with</option>
                                <option value = "3">Ends with</option>
                                <option value = "4">Is equal</option>
                            </select>
                            <font size="3" color="blue" className ='dataInput' >Value</font>
                            <select className={'selectInput'} ref = 'select3'>
                                {filterColumns.map(index => (<option value = {index.name} >{index.name}</option>))}
                            </select>
                        </div>
                        <div className='g-header'>
                            <font size="3" color="Red" className ='dataInput'>Sort by</font>
                            <select className ='selectInput' ref = 'selectSort' onChange={this.handleClick}>    
                                <option value = "Title">Title</option>
                                <option value = "Author">Author</option>
                                <option value = "Year">Year</option>
                                <option value = "SE Method">SE Method</option>
                                <option value = "SE Methodology">SE Methodology</option>
                            </select>
                        </div>
                        <ListMember columns={this.columns}/>
                    </div>:null}
                    {this.state.status ==='edit'?<EditMember meberMsg={this.rowData} changeState={this.changeState}/>:null}
                    {this.state.delModel?<Modal wrapClassName='g-popup-sure' closable={false} title='delete article' onOk={this.del} onCancel={() => this.setState({delModel:false})} visible={true}>
                        <p className="info">delete article？</p>
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
    { name: "Planning poker"},
    { name: "Daily standup meetings"},
    { name: "Story boards"},
];


const filterColumns1 = [
    { name: "TDD"},
    { name: "BDD"},
    { name: "Pair Programming"},
    { name: "Planning poker"},
    { name: "Daily standup meetings"},
    { name: "Story boards"},
];
const filterColumns2 = [
    { name: "Scrum"},
    { name: "Agile"},
    { name: "Waterfall"},
    { name: "XP"},
    { name: "Crystal"},
    { name: "Product Driven Development"},
];
