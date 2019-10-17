import React ,{Component} from 'react'
import './layout.css'
import fixHeight from './../global/fixHeight.js';
const height = fixHeight();
class Layout extends Component {
    render(){
        if(this.props.type * 1 === 2){
            return <div className="g-layout g-clearfix" style={{height:height+'px'}}>
                <div className="g-left" >
                    {this.props.left ? this.props.left:'To be continue...'}
                </div>
                <div className="g-right">
                    {this.props.right ? this.props.right :'To be continue...'}
                </div>
            </div>
        } else if(this.props.type * 1 === 1){
            let content;
            if(this.props.children){
                content = this.props.children;
            } else if(this.props.body){
                content = this.props.body;
            } else {
                content = 'To be continue...'
            }
            return <div className="g-layout" style={{height:height+'px'}}>
                <div className="g-content">
                    {content}
                </div>
            </div>
        }

    }
}
Layout.defaultProps = {
    type:1
};
export default Layout