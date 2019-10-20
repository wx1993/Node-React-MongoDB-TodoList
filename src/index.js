import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import Router from './router/index.js'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store/index.js';
import {search,updateDept,updateStaff} from './global/initBaseData.js';
if (module.hot) {
  module.hot.accept();
}
React.Component.prototype.$http = axios;
// updateStaff.bind(React.Component.prototype)();
search.bind(React.Component.prototype)({});
updateDept.bind(React.Component.prototype)();
ReactDOM.render(<Provider store={store}>
    <Router />
</Provider>, document.getElementById('root'));
registerServiceWorker();
