import React ,{Component} from 'react';
import {Button,message} from 'antd';
export default class  extends Component {
    constructor(props){
        super(props);
        this.state={
            optDept:false,
            member_id:props.meberMsg.member_id || undefined,
            article_name:props.meberMsg.article_name || '',
            author_name:props.meberMsg.author_name || '',
            year:props.meberMsg.year || '',
            field_id:props.meberMsg.field_id || '',
            se_method:props.meberMsg.se_method || '',
            research_question:props.meberMsg.research_question || '',
            research_result:props.meberMsg.research_result || ''
        };
        this.onChangeTree = this.onChangeTree.bind(this);
        // this.getOptDept = this.getOptDept.bind(this);
        this.submit = this.submit.bind(this);
    }
    changeVal(filed,val,type='text'){
        if(type === 'num'){
            val = val.replace(/[^\d]/g,'');
        }
        this.setState({
            [filed]:val
        });
    }
    onChangeTree(flag){
        this.setState({
            optDept:flag
        });
    }
    // getOptDept(data = []){
    //     this.curDept = data;
    //     this.setState({
    //         department_id:(data[0] || {}).department_id || '',
    //         department_name:(data[0] || {}).department_name || ''
    //     });
    // }
    verifyFrom(param){
        if(!param.article_name){
            message.warning('input article_name');
            return false;
        } else if(!param.author_name || !param.author_name){
            message.warning('input author_name');
            return false;
        } else {
            return true;
        }
    }
    submit(){
        const param = {
            article_name:this.state.article_name.replace(/^\s+|\s+$/g,''),
            author_name:this.state.author_name,
            year:this.state.year ,
            field_id:this.state.field_id ,
            se_method:this.state.se_method,
            review:this.state.review,
            se_methodology:this.state.se_methodology,
            research_question:this.state.research_question ,
            research_result:this.state.research_result
        };
        if(!this.verifyFrom(param)) return false;
        const data = {
            url:'/search/add',
            param:param,
            success:'add success',
            error:',failed'
        };
        this.$http.post(data.url,data.param).then(res => {
            const resData = res.data || {};
            if(resData.code + '' === '0'){
                message.success(data.success);
                this.props.changeState('list',true);
            } else {
                message.error(resData.msg+data.error);
            }
        });
    }
    render(){
        return (
            <div className='m-member-edit'>
                <table className='g-from'>
                    <tbody>
                        <tr>
                            <td className='in-h'>article_name<span className='in-star'>*</span></td>
                            <td>
                                <input className='input' value={this.state.article_name} onChange={(event) => this.changeVal('article_name',event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>author_name<span className='in-star'>*</span></td>
                            <td>
                            <input className='input' value={this.state.author_name} onChange={(event) => this.changeVal('author_name',event.target.value)}/>
                                {/* <Button onClick={() => this.onChangeTree(true)}>dpt</Button>
                                {this.state.department_name?<span className='result-p'>{this.state.department_name}</span>:null}
                                {this.state.optDept?<OptDept maxNum={1} type='dept' visible={this.state.optDept} onOk={this.getOptDept} onChangeTree={this.onChangeTree} selectedData={this.curDept}/>:null} */}
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>year</td>
                            <td>
                                <input className='input' value={this.state.year} onChange={(event) => this.changeVal('year',event.target.value,'num')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>field_id</td>
                            <td>
                                <input className='input' value={this.state.field_id} onChange={(event) => this.changeVal('field_id',event.target.value,'num')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>review<span className='in-star'>*</span></td>
                            <td>
                                <input className='input' value={this.state.review} onChange={(event) => this.changeVal('review',event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>se_method<span className='in-star'>*</span></td>
                            <td>
                                <input className='input' value={this.state.se_method} onChange={(event) => this.changeVal('se_method',event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>se_methodology<span className='in-star'>*</span></td>
                            <td>
                                <input className='input' value={this.state.se_methodology} onChange={(event) => this.changeVal('se_methodology',event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>research_question<span className='in-star'>*</span></td>
                            <td>
                                <input className='input' value={this.state.research_question} onChange={(event) => this.changeVal('research_question',event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'>research_result<span className='in-star'>*</span></td>
                            <td>
                                <input className='input' value={this.state.research_result} onChange={(event) => this.changeVal('research_result',event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='in-h'></td>
                            <td>
                                <button type='button' className='submit' style={{marginRight:'10px'}} onClick={this.submit}>Confirm</button>
                                <button type='button' className='cancel' onClick={() => this.props.changeState('list')}>Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}