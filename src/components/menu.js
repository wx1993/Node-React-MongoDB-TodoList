import React,{Component} from 'react'
import {NavLink as Link} from 'react-router-dom'
import './../css/menu.css'
class Menu extends Component {
    render(){
        return <ul className="g-menu">
            <li className="nav"><Link to={`/search`} activeClassName='g-navActive' className='link'>Search</Link></li>
            <li className="nav"><Link to={`/articlereview`} activeClassName='g-navActive' className='link'>article review</Link></li>
        </ul>
    }
}
export default Menu;