import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Department from './../pages/department/index.js';
import Member from './../pages/member/index.js';
export default class  extends Component{
    render(){
        return <div>
            <Switch>
                <Route path='/articlereview' component={Department}/>
                <Route path='/search' component={Member}/>
                <Route component={Member}/>
            </Switch>
        </div>
    }
}