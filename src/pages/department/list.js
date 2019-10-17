import React,{Component} from 'react';
import {Button,message,Modal} from 'antd';
import SelectLeader from './../../components/g-selectData.js';
import {updateDept,updateStaff} from './../../global/initBaseData.js';
import FilterDept from './../../components/g-filter-dept.js';
import Table from './../../components/g-list.js';
import {connect} from 'react-redux';
 class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            changeDept:false
        };
        this.onChangeTree = this.onChangeTree.bind(this);
        this.onOk = this.onOk.bind(this);
        this.action = this.action.bind(this);
        this.onChange = this.onChange.bind(this);
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
            },
            {
                title:'Operation',
                key:'action',
                width:150,
                render:(record) => {
                    return (
                        <div>
                            <span className='action' onClick={() => this.handle(record)}>Update</span>
                        </div>
                    )
                }
            }
        ]
    }
    onChangeTree(flag){
        this.setState({
            visible:flag
        });
    }
    // 修改部门
    handle(member){
        this.member = member;
        this.setState({
            changeDept:true
        })
    }
    action(){
        this.$http.post('/staff/edit',{
            ...this.member,
            ...this.optDept
        }).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success('修改员工部门成功');
                this.setState({
                    changeDept:false
                });
                updateStaff.bind(this)();
            } else {
                message.error('修改员工部门失败');
            }
        });
    }
    onChange(data){
        this.optDept = JSON.parse(data);
    }
    // 修改部门负责人
    onOk(leader){
        if(this.props.dept_id * 1 && leader.length <= 0) {
            message.warning('请选择部门负责人');
            return false;
        }
        this.$http.post('/dept/edit',{
            department_id:this.props.dept_id,
            leader_member_name:(leader[0]||{}).member_name || '',
            leader_member_id:(leader[0] || {}).member_id||0
        }).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success('修改部门负责人成功');
                updateDept.bind(this)();
            } else {
                message.error('修改部门负责人失败');
            }
        })
    }
    render(){
        return <div className='m-dept-member'>
            {this.props.dept_id * 1?<div className='g-header'>
                <span>部门负责人:</span>
                {this.props.dept_leader.member_name}
                {this.offset}
                <Button className="primary opt-leader" onClick={() => {this.onChangeTree(true)}}>{!this.props.dept_leader?'选择部门负责人':'修改部门负责人'}</Button>
                {this.state.visible?<SelectLeader type='staff' selectedData={this.props.dept_leader.member_id?[this.props.dept_leader]:[]} maxNum={1} visible={this.state.visible} onChangeTree={this.onChangeTree} onOk={this.onOk}/>:null}
            </div>:null}
            <Table cols={this.columns} offset={this.props.offset} data={this.props.tb_data} title={this.props.dept_name}/>
            {this.state.changeDept?
                <Modal onOk={this.action} onCancel={() => {this.setState({changeDept:false})}} width={470} visible={true} title={'修改部门'} closable={true}>
                    <table className='g-from'>
                        <tbody>
                            <tr>
                                <td className='in-h' width="100">姓名</td>
                                <td>{this.member.member_name}</td>
                            </tr>
                            <tr>
                                <td className='in-h'>部门</td>
                                <td>{this.member.department_name}</td>
                            </tr>
                            <tr>
                                <td className='in-h'>新部门</td>
                                <td>
                                    <FilterDept onChange={this.onChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
            :null}
        </div>
    }
}
export default connect((state,props) => {
    return {
        tb_data:((staffs) => {
            const resultStaff = [];
            staffs.forEach(staff => {
                if(!props.dept_id){
                    resultStaff.push(staff);
                } else if(staff.department_id * 1 === props.dept_id * 1){
                    resultStaff.push(staff);
                }
            });
            return resultStaff;
        })(state.baseData.staff),
        offset:props.dept_id * 1?60:0,
        dept_name:(depts => {
            const curDept = depts.find(dept => {
                return dept.department_id * 1 === props.dept_id * 1;
            });
            return (curDept || {}).department_name || 'article review';
        })(state.baseData.dept),
        dept_leader:(depts => {
            const curDept = depts.find(dept => {
                return dept.department_id * 1 === props.dept_id * 1;
            });
            return {
                member_name:(curDept || {}).leader_member_name,
                member_id:(curDept || {}).leader_member_id
            }
        })(state.baseData.dept)
    }
})(List);