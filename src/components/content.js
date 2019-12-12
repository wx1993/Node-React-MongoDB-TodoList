import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Department from './../pages/department/index.js';
import Search from './../pages/Search/index.js';
export default class  extends Component{
    render(){
        return <div>
            <Switch>
                <Route path='/articlereview' component={Department}/>
                <Route path='/search' component={Search}/>
                <Route component={Search}/>
            </Switch>
        </div>
    }
}