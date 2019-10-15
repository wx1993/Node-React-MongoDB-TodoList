import React,{Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import './../css/menu.css'
class Menu extends Component {
    render(){
        return <ul className="g-menu">
            {/* <li className="nav"><Link to={`/attendence`} activeClassName='g-navActive' className='link'>Home</Link></li> */}
            {/* <li className="nav"><Link to={`/holiday`} activeClassName='g-navActive' className='link'>UserSetting</Link></li> */}
            {/* <li className="nav"><Link to={`/att`} activeClassName='g-navActive' className='link'>考勤分组</Link></li> */}
            <li className="nav"><Link to={`/member`} activeClassName='g-navActive' className='link'>Search</Link></li>
            <li className="nav"><Link to={`/department`} activeClassName='g-navActive' className='link'>ArticleSetting</Link></li>
        </ul>
    }
}
export default Menu;